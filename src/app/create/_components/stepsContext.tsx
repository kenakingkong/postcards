import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IMyContextProps {
  activeStep: string;
  setActiveStep: Dispatch<SetStateAction<string>>;
}

const StepsContext = createContext<IMyContextProps>({
  activeStep: "step-editor",
  setActiveStep: () => {},
});

export const useSteps = () => {
  return useContext(StepsContext);
};

export const StepsContextProvider: React.FC<{ children?: any }> = ({
  children,
}) => {
  const [activeStep, setActiveStep] = useState<string>("step-editor");

  return (
    <StepsContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </StepsContext.Provider>
  );
};
