import { createContext } from "react";

interface IPaintersContextProps {}

const PaintersContext = createContext<IPaintersContextProps>({});

export const PaintersContextProvider: React.FC = () => {
  return (
    <PaintersContext.Provider value={{}}>
      <></>
    </PaintersContext.Provider>
  );
};
