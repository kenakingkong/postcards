"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useBuilder } from "../builderContext";
import { STEP_NAMES, useSteps } from "../stepsContext";
import FormError from "@/_components/formError";
import TemplatePicker from "@/_lib/templatePicker";
import PageHeader from "@/_components/pageHeader";
import PageSubheader from "@/_components/pageSubheader";
import { useIsLoggedIn } from "@/_contexts/sessionContext";
import Link from "next/link";

export default function Selector() {
  const isLoggedIn = useIsLoggedIn();
  const builder = useBuilder();
  const { setActiveStep } = useSteps();

  const picker = new TemplatePicker();
  const availableTemplates = picker.availableTemplates();

  const [hasError, setHasError] = useState<boolean>(false);
  const [hasAuthError, setHasAuthError] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(
    builder.template?.id
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHasError(false);
    setSelectedId(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!selectedId) {
      setHasError(true);
      return;
    }

    if (!isLoggedIn) {
      setHasAuthError(true);
      return;
    }

    builder.setTemplate(selectedId);
    setActiveStep(STEP_NAMES.EDITOR);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <PageHeader>choose a template</PageHeader>
        <PageSubheader>
          or{" "}
          <Link href="/gallery" className="underline">
            browse examples
          </Link>
        </PageSubheader>
      </div>
      <form onSubmit={handleSubmit}>
        <ul className="flex flex-wrap justify-center gap-8">
          {availableTemplates.map((t: any) => (
            <li key={t.id}>
              <label className="group space-y-2 cursor-pointer">
                <div className="flex gap-2">
                  <input
                    name="templateId"
                    type="radio"
                    value={t.id}
                    checked={selectedId == t.id}
                    onChange={handleChange}
                  />
                  <p>{t.name}</p>
                </div>
                <div className="flex gap-2 items-start">
                  <img
                    src={t.frontPreviewImageUrl}
                    alt={`${t.name} - front}`}
                    className="cursor-pointer bd-secondary group-has-[:checked]:bd-primary w-full max-w-64 max-h-64"
                  />
                  <img
                    src={t.backPreviewImageUrl}
                    alt={`${t.name} - back`}
                    className="cursor-pointer bd-secondary group-has-[:checked]:bd-primary w-full max-w-64 max-h-64"
                  />
                </div>
              </label>
            </li>
          ))}
        </ul>
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 space-y-2 flex flex-col items-center">
          {hasError && <FormError>select a template to continue</FormError>}
          {hasAuthError && (
            <FormError>
              please{" "}
              <Link href="/signup" className="link">
                create an account
              </Link>{" "}
              to continue
            </FormError>
          )}
          <button className="btn-primary">next →</button>
        </div>
      </form>
    </div>
  );
}
