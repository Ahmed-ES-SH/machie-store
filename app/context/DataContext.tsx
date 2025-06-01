import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
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
  categories: categoryType[] | null;
  loading: boolean;
  randomProducts: ProductType[];
  setRandomProducts: Dispatch<SetStateAction<ProductType[]>>;
}

const DataContext = createContext<DataContextType | null>(null);

interface ChildrenType {
  children: ReactNode;
}

export default function DataProvider({ children }: ChildrenType) {
  const { categories: selectedCategories } = useVariables();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [phones, setPhones] = useState<ProductType[]>([]);

  const [randomProducts, setRandomProducts] = useState<ProductType[]>([]);

  const [categoryData, setCategoryData] = useState<ProductType[]>([]);
  const { data } = useFetchData("/products");
  const { data: PhonesData } = useFetchData("/products/category/smartphones");
  const { data: categories, loading } = useFetchData<categoryType[]>(
    "/products/categories"
  );

  useEffect(() => {
    if (data) setProducts(data.products);
    if (PhonesData) setPhones(PhonesData.products);
  }, [PhonesData, data]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCategories.length === 0) {
        setCategoryData([]);
        return;
      }

      const uniqueCategories = Array.from(
        new Map(selectedCategories.map((cat) => [cat.slug, cat])).values()
      );

      try {
        const allProductsArrays = await Promise.all(
          uniqueCategories.map((cat) =>
            axios
              .get(`https://dummyjson.com/products/category/${cat.slug}`)
              .then((res) => res.data.products)
          )
        );

        const mergedProducts = allProductsArrays.flat();

        setCategoryData(mergedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedCategories]);

  useEffect(() => {
    const randomSixProducts = phones
      ?.slice()
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    setRandomProducts(randomSixProducts);
  }, [phones]);

  console.log(phones);

  return (
    <DataContext.Provider
      value={{
        products,
        phones,
        categories,
        loading,
        categoryData,
        randomProducts,
        setRandomProducts,
      }}
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
