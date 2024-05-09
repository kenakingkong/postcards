"use client";

import { useBuilder } from "../builderContext";
import { useSteps } from "../stepsContext";
import PageHeader from "@/_components/pageHeader";
import PageSubheader from "@/_components/pageSubheader";
import ImageEditors from "./editor";

export default function Editor() {
  const builder = useBuilder();
  const { setActiveStep } = useSteps();

  const onBack = () => setActiveStep("step-selector");

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <PageHeader>customize your card</PageHeader>
        <PageSubheader>
          or,{" "}
          <button className="underline" onClick={onBack}>
            choose a new template
          </button>
        </PageSubheader>
      </div>
      {builder.hasTemplate() ? (
        <ImageEditors />
      ) : (
        <div>
          <button className="underline" onClick={onBack}>
            choose a template
          </button>{" "}
          to get started
        </div>
      )}
    </div>
  );
}
