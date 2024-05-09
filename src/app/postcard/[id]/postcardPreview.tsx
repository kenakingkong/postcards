export default function PostcardPreview({
  frontImageSrc,
  backImageSrc,
}: {
  frontImageSrc: string;
  backImageSrc: string;
}) {
  return (
    <div className="py-4 md:py-6 lg:py-10 space-y-4 lg:space-y-6">
      <div className="flex gap-2 flex-wrap items-start justify-center">
        <div className="bd-secondary">
          <img
            src={frontImageSrc}
            alt="front of postcard"
            className="w-full h-full max-w-[500px] max-h-[500px]"
          />
        </div>
        <div className="bd-secondary">
          <img
            src={backImageSrc}
            alt="back of postcard"
            className="w-full h-full max-w-[500px] max-h-[500px]"
          />
        </div>
      </div>
      <div className="text-center">
        <p>share your creation (just the front!)</p>
        <p>linkedin facebook</p>
      </div>
    </div>
  );
}
