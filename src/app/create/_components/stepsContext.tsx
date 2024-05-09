"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export const STEP_NAMES = {
  SELECTOR: "step-selector",
  EDITOR: "step-editor",
};

interface IMyContextProps {
  activeStep: string;
  setActiveStep: Dispatch<SetStateAction<string>>;
}

const StepsContext = createContext<IMyContextProps>({
  activeStep: STEP_NAMES.SELECTOR,
  setActiveStep: () => {},
});

export const useSteps = () => {
  return useContext(StepsContext);
};

export const useTheseSteps = () => {
  return useContext(StepsContext);
};

export const StepsContextProvider: React.FC<{ children?: any }> = ({
  children,
}) => {
  const [activeStep, setActiveStep] = useState<string>(STEP_NAMES.SELECTOR);

  return (
    <StepsContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </StepsContext.Provider>
  );
};
