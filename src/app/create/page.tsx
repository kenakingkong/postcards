"use client";

import { BuilderContextProvider } from "./_components/builderContext";
import { StepsContextProvider } from "./_components/stepsContext";
import Steps from "./_components/steps";

export default function CreatePage() {
  return (
    <BuilderContextProvider>
      <StepsContextProvider>
        <div className="p-4 lg:p-6 lg:pb-12 min-h-[100vh] bg-blue-50/20">
          <Steps />
        </div>
      </StepsContextProvider>
    </BuilderContextProvider>
  );
}
