"use client";

import { BuilderContextProvider } from "./_components/builderContext";
import { StepsContextProvider } from "./_components/stepsContext";
import Steps from "./_components/steps";
import SessionContextProvider from "@/_contexts/sessionContext";

export default function CreatePage() {
  return (
    <BuilderContextProvider>
      <SessionContextProvider>
        <StepsContextProvider>
          <Steps />
        </StepsContextProvider>
      </SessionContextProvider>
    </BuilderContextProvider>
  );
}
