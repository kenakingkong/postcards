export const EmailInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = (props) => (
  <input
    {...props}
    id="email"
    name="email"
    type="email"
    placeholder="enter email"
    required
    maxLength={255}
    className="input-line"
  />
);
