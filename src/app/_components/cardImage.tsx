import Image, { ImageProps } from "next/image";

interface ICardImageProps extends ImageProps {
  isLandscape: boolean;
}

const CardImage: React.FC<ICardImageProps> = ({ isLandscape, ...props }) => (
  <Image
    className="bd-secondary w-auto h-auto max-w-[90svw] md:max-w-[374px] max-h-[90svw] md:max-h-[374px]"
    loading="lazy"
    width={isLandscape ? 374.4 : 249.6}
    height={isLandscape ? 249.6 : 374.4}
    {...props}
  />
);

export default CardImage;
