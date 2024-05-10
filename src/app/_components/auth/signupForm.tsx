import {
  EmailInput,
  FormContainer,
  FormSubmitError,
  PasswordInput,
  SubmitButton,
} from "./form";
import { signup } from "./actions";

export default async function SignupForm() {
  return (
    <FormContainer action={signup}>
      <EmailInput />
      <PasswordInput />
      <SubmitButton>sign up</SubmitButton>
      <FormSubmitError />
    </FormContainer>
  );
}
