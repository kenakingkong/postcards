import classNames from "classnames";
import { HtmlHTMLAttributes } from "react";

const FormError: React.FC<HtmlHTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    role="alert"
    className={classNames("form-error", className)}
    {...props}
  />
);

export default FormError;
