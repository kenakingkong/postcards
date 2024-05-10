import {
  EmailInput,
  FormContainer,
  FormSubmitError,
  PasswordInput,
  SubmitButton,
} from "./form";
import { login } from "./actions";

export default async function LoginForm() {
  return (
    <FormContainer action={login}>
      <EmailInput />
      <PasswordInput />
      <SubmitButton>log in</SubmitButton>
      <FormSubmitError />
    </FormContainer>
  );
}
