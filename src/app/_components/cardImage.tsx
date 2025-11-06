import classNames from "classnames";
import Image, { ImageProps } from "next/image";

interface ICardImageProps extends ImageProps {
  isLandscape: boolean;
}

const CardImage: React.FC<ICardImageProps> = ({ isLandscape, ...props }) => (
  <Image
    className={classNames(
      "bd-secondary w-auto h-auto max-w-[90svw] md:max-w-[374px] max-h-[90svw] md:max-h-[374px]",
      isLandscape ? "w-[374px] h-[249px]" : "w-[249px] h-[374px]"
    )}
    loading="lazy"
    width={isLandscape ? 374.4 : 249.6}
    height={isLandscape ? 249.6 : 374.4}
    unoptimized
    {...props}
  />
);

export default CardImage;
