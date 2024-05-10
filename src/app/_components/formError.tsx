import classNames from "classnames";
import { HtmlHTMLAttributes } from "react";

const FormError: React.FC<HtmlHTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    role="alert"
    className={classNames("form-error bg-white/90", className)}
    {...props}
  />
);

export default FormError;
