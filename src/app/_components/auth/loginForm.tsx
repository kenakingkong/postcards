import {
  EmailInput,
  FormContainer,
  FormSubmitError,
  PasswordInput,
  SubmitButton,
} from "./form";
import { login } from "./actions";
import { Suspense } from "react";

export default async function LoginForm() {
  return (
    <FormContainer action={login}>
      <EmailInput />
      <PasswordInput />
      <SubmitButton>log in</SubmitButton>
      <Suspense>
        <FormSubmitError />
      </Suspense>
    </FormContainer>
  );
}
