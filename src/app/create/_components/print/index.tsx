import PageHeader from "@/_components/pageHeader";
import { useSteps } from "../stepsContext";
import { useBuilder } from "../builderContext";
import PageSubheader from "@/_components/pageSubheader";
import Previews from "./previews";

export default function Print() {
  const builder = useBuilder();
  const { setActiveStep } = useSteps();

  const showPreviews = builder.hasTemplate() && builder.hasFrontAndBack();

  const onRestart = () => {
    builder.reset();
    setActiveStep("step-selector");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <PageHeader>your postcard</PageHeader>
        <PageSubheader>
          save & print or{" "}
          <button className="underline" onClick={onRestart}>
            create a new one
          </button>
        </PageSubheader>
      </div>
      {showPreviews ? (
        <Previews />
      ) : (
        <div className="text-center">
          <button className="underline" onClick={onRestart}>
            choose a template
          </button>{" "}
          to get started
        </div>
      )}
    </div>
  );
}
