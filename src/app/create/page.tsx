"use client";

import { BuilderContextProvider } from "./_components/builderContext";
import { StepsContextProvider } from "./_components/stepsContext";
import Steps from "./_components/steps";

export default function CreatePage() {
  return (
    <BuilderContextProvider>
      <StepsContextProvider>
        <Steps />
      </StepsContextProvider>
    </BuilderContextProvider>
  );
}
