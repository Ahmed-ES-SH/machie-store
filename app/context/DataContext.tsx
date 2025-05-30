import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFetchData } from "../hooks/useFetchData";
import { ProductType } from "../types/productType";

interface DataContextType {
  products: ProductType[];
  phones: ProductType[];
}

const DataContext = createContext<DataContextType | null>(null);

interface ChildrenType {
  children: ReactNode;
}

export default function DataProvider({ children }: ChildrenType) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [phones, setPhones] = useState<ProductType[]>([]);
  const { data } = useFetchData("/products");
  const { data: PhonesData } = useFetchData("/products/category/smartphones");

  useEffect(() => {
    if (data) setProducts(data.products);
    if (PhonesData) setPhones(PhonesData.products);
  }, [PhonesData, data]);

  return (
    <DataContext.Provider value={{ products, phones }}>
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
