export const FormContainer: React.FC<
  React.FormHTMLAttributes<HTMLFormElement>
> = (props) => (
  <form {...props} className="w-full max-w-md mx-auto flex flex-col gap-6" />
);
