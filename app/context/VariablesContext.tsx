import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { categoryType } from "./DataContext";

interface VariablesType {
  width: number;
  mobailMenu: boolean;
  setMobailMenu: Dispatch<SetStateAction<boolean>>;
  phonesSectionHeight: number;
  oddBannerHeight: number;
  setPhonesSectionHeight: Dispatch<SetStateAction<number>>;
  setOddBannerHeight: Dispatch<SetStateAction<number>>;
  openDropdown: string;
  setOpenDropdown: Dispatch<SetStateAction<string>>;
  categories: categoryType[];
  setCategories: Dispatch<SetStateAction<categoryType[]>>;
}

interface propsType {
  children: ReactNode;
}

const VariablesContext = createContext<VariablesType | null>(null);

export default function VariablesProvider({ children }: propsType) {
  const [width, setWidth] = useState(0);
  const [phonesSectionHeight, setPhonesSectionHeight] = useState(0);
  const [oddBannerHeight, setOddBannerHeight] = useState(0);
  const [mobailMenu, setMobailMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [categories, setCategories] = useState<categoryType[]>([]);

  useEffect(() => {
    setWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  return (
    <VariablesContext.Provider
      value={{
        width,
        mobailMenu,
        setMobailMenu,
        phonesSectionHeight,
        setPhonesSectionHeight,
        oddBannerHeight,
        setOddBannerHeight,
        openDropdown,
        setOpenDropdown,
        categories,
        setCategories,
      }}
    >
      {children}
    </VariablesContext.Provider>
  );
}

export const useVariables = () => {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("useVariables must be used within a VariablesProvider");
  }
  return context;
};
