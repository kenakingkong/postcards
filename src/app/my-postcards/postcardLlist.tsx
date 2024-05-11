import IPostcard from "@/_lib/postcard/models/postcard";
import ImageUtils from "@/_utils/imageUtils";
import { createClient } from "@/_utils/supabase/server";
import Link from "next/link";
import PostcardListItem from "./postcardListItem";

export default async function PostcardList({ userId }: { userId: string }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("postcards")
    .select()
    .eq("user_id", userId);

  if (error || !data.length) {
    return (
      <div className="text-center">
        <Link href="/gallery" className="btn-primary-outline">
          browse examples
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-16 items-center">
      {data?.map((postcard: IPostcard, index: number) => (
        <li key={postcard.id}>
          <PostcardListItem postcard={postcard} index={index} />
        </li>
      ))}
    </ul>
  );
}
