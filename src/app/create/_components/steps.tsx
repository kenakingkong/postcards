import Selector from "./selector";
import Editor from "./editor";
import { STEP_NAMES, useSteps } from "./stepsContext";

export default function Steps() {
  const { activeStep } = useSteps();

  if (activeStep == STEP_NAMES.EDITOR) return <Editor />;
  return <Selector />;
}
