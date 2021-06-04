import { createContext, ReactNode, useContext, useState } from "react";

type ModalProductFormParams = {
  id: string;
  setId: (id: string) => void;
  isActivated: boolean;
  toggleModal: () => void;
}

type ModalProductFormProps = {
  children: ReactNode;
}

const ModalProductFormContext = createContext({} as ModalProductFormParams);

export function ModalProductFormProvider({children}: ModalProductFormProps) {
  const [id, setId] = useState("");
  const [isActivated, setIsActivated] = useState(false);

  function toggleModal() {
    setIsActivated(!isActivated);
  }

  return (
    <ModalProductFormContext.Provider 
      value={{
        id,
        setId,
        isActivated,
        toggleModal
      }}
    >
      { children }
    </ModalProductFormContext.Provider>
  )
}

export const useModalProductForm = () => {
  return useContext(ModalProductFormContext);
}

