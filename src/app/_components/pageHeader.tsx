import classNames from "classnames";
import { HtmlHTMLAttributes } from "react";

const PageHeader: React.FC<HtmlHTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => <h1 className={classNames(className, "text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl")} {...props} />;

export default PageHeader