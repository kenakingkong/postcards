"use client";

import IPostcard from "@/_lib/postcard/models/postcard";
import downloadItem from "@/_utils/downloadSource";
import ImageUtils from "@/_utils/imageUtils";
import PostcardDisplayUtils from "@/_utils/postcardDisplayUtils";
import PostcardPreviewImage from "./postcardPreviewImage";
import Section from "./section";

export default function PostcardPreview({ postcard }: { postcard: IPostcard }) {
  const frontImageSrc = ImageUtils.Supabase.getUrl(postcard?.front_image_url);
  const backImageSrc = ImageUtils.Supabase.getUrl(postcard?.back_image_url);

  const isFrontLandscape = PostcardDisplayUtils.isLandscape(
    postcard.front_image_orientation
  );

  const isBackLandscape = PostcardDisplayUtils.isLandscape(
    postcard.back_image_orientation
  );

  const handleWebpDownload = () => {
    downloadItem(frontImageSrc, "postcard_front.webp");
    downloadItem(backImageSrc, "postcard_back.webp");
  };

  const handleJpegDownload = () => {
    const frontParams = {
      w: isFrontLandscape ? 1152 : 762,
      h: isFrontLandscape ? 762 : 1152,
      quality: 1,
      format: "jpeg",
      url: frontImageSrc,
    };

    const backparams = {
      w: isBackLandscape ? 1152 : 762,
      h: isBackLandscape ? 762 : 1152,
      quality: 1,
      format: "jpeg",
      url: backImageSrc,
    };

    const frontJpegUrl = ImageUtils.Netlify.getUrl(frontParams);
    const backJpegUrl = ImageUtils.Netlify.getUrl(backparams);

    downloadItem(frontJpegUrl, "postcard_front.jpeg");
    downloadItem(backJpegUrl, "postcard_back.jpeg");
  };

  return (
    <Section>
      <Section.Aside>
        <Section.AsideContent>
          <Section.SuperTitle>OPTION 1</Section.SuperTitle>
          <Section.Title>print images</Section.Title>
          <Section.Subtitle>
            print front-to-back on matte white 4x6 postcard paper
          </Section.Subtitle>
        </Section.AsideContent>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary max-w-60" onClick={handleWebpDownload}>
            download webp
          </button>
          <button
            className="btn-primary-outline max-w-60"
            onClick={handleJpegDownload}
          >
            download jpeg
          </button>
        </div>
      </Section.Aside>
      <Section.Content>
        <PostcardPreviewImage
          src={frontImageSrc}
          alt="front of postcard"
          isLandscape={isFrontLandscape}
        />
        <PostcardPreviewImage
          src={backImageSrc}
          alt="back of postcard"
          isLandscape={isBackLandscape}
        />
      </Section.Content>
    </Section>
  );
}
