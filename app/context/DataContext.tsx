import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFetchData } from "../hooks/useFetchData";
import { ProductType } from "../types/productType";
import { useVariables } from "./VariablesContext";
import axios from "axios";

export type categoryType = {
  name: string;
  url: string;
  slug: string;
};

interface DataContextType {
  products: ProductType[];
  phones: ProductType[];
  categoryData: ProductType[];
  categories: categoryType[];
  loading: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

interface ChildrenType {
  children: ReactNode;
}

export default function DataProvider({ children }: ChildrenType) {
  const { categories: selectedCategories } = useVariables();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [phones, setPhones] = useState<ProductType[]>([]);
  const [currentCategory, setCurrentCategory] = useState<categoryType | null>(
    null
  );
  const [categoryData, setCategoryData] = useState<ProductType[]>([]);
  const { data } = useFetchData("/products");
  const { data: PhonesData } = useFetchData("/products/category/smartphones");
  const { data: categories, loading } = useFetchData("/products/categories");

  useEffect(() => {
    if (data) setProducts(data.products);
    if (PhonesData) setPhones(PhonesData.products);
  }, [PhonesData, data]);

  useEffect(() => {
    setCurrentCategory(selectedCategories[0]);
    const FetchData = async () => {
      try {
        if (!currentCategory) return;
        const res = await axios.get(
          `https://dummyjson.com/products/category/${currentCategory.slug}`
        );
        setCategoryData(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentCategory) FetchData();
    if (selectedCategories.length == 0) setCategoryData([]);
  }, [currentCategory, selectedCategories]);

  console.log(categoryData);

  return (
    <DataContext.Provider
      value={{ products, phones, categories, loading, categoryData }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used within a DataContext provider");
  }

  return context;
};
