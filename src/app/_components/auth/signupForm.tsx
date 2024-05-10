import {
  EmailInput,
  FormContainer,
  FormSubmitError,
  PasswordInput,
  SubmitButton,
} from "./form";
import { signup } from "./actions";
import { Suspense } from "react";

export default async function SignupForm() {
  return (
    <FormContainer action={signup}>
      <EmailInput />
      <PasswordInput />
      <SubmitButton>sign up</SubmitButton>
      <Suspense>
        <FormSubmitError />
      </Suspense>
    </FormContainer>
  );
}
