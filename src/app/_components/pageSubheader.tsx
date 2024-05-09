import classNames from "classnames";
import { HtmlHTMLAttributes } from "react";

const PageSubheader: React.FC<HtmlHTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => <p className={classNames(className, "text-center text-xs md:text-sm lg:text-base xl:text-lg")} {...props} />;

export default PageSubheader