import Selector from "./selector";
import Editor from "./editor";
import Print from "./print";
import { useSteps } from "./stepsContext";

export default function Steps() {
  const { activeStep } = useSteps();

  if (activeStep == "step-print") return <Print />;
  if (activeStep == "step-editor") return <Editor />;
  return <Selector />;
}
