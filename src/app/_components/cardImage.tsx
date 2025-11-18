import classNames from "classnames";
import Image, { ImageProps } from "next/image";

export default function CardImage({ className, ...props }: ImageProps) {
  return (
    <Image
      className={classNames(
        "bd-secondary max-w-full md:max-w-[374px]",
        className
      )}
      loading="lazy"
      {...props}
    />
  );
}
