import classNames from "classnames";
import Image, { ImageProps } from "next/image";

interface ICardImageProps extends ImageProps {
  isLandscape: boolean;
}

const CardImage: React.FC<ICardImageProps> = ({ isLandscape, ...props }) => (
  <Image
    className={classNames(
      "bd-secondary w-full h-auto max-w-[90svw] md:max-w-[374px]",
      isLandscape ? "w-[374px] h-[249px] max-h-[90svw] md:max-h-[374px]" : ""
    )}
    loading="lazy"
    width={isLandscape ? 374.4 : 249.6}
    height={isLandscape ? 249.6 : 374.4}
    {...props}
  />
);

export default CardImage;
