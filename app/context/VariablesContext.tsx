import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface VariablesType {
  width: number;
  mobailMenu: boolean;
  setMobailMenu: Dispatch<SetStateAction<boolean>>;
}

interface propsType {
  children: ReactNode;
}

const VariablesContext = createContext<VariablesType | null>(null);

export default function VariablesProvider({ children }: propsType) {
  const [width, setWidth] = useState(0);
  const [mobailMenu, setMobailMenu] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  return (
    <VariablesContext.Provider value={{ width, mobailMenu, setMobailMenu }}>
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
