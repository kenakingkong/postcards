export const PasswordInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = (props) => (
  <input
    {...props}
    id="password"
    name="password"
    type="password"
    placeholder="enter password"
    required
    minLength={6}
    maxLength={255}
    className="input-line"
  />
);
