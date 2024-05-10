import IPostcard from "@/_lib/postcard/models/postcard";
import SupabaseUtils from "@/_utils/supabase";
import { createClient } from "@/_utils/supabase/client";
import Link from "next/link";

export default async function Postcards({ userId }: { userId: string }) {
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
      {data?.map((postcard: IPostcard) => (
        <li key={postcard.id} className="space-y-2">
          <div className="flex gap-2">
            <img
              src={SupabaseUtils.getLiveUrl(postcard.front_image_url)}
              alt={`${postcard.template_id} - front`}
              className="bd-secondary max-w-[500px] max-h-[500px]"
            />
            <img
              src={SupabaseUtils.getLiveUrl(postcard.back_image_url)}
              alt={`${postcard.template_id} - front`}
              className="bd-secondary max-w-[500px] max-h-[500px]"
            />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <button className="btn-primary">download images</button>
            <button className="btn-primary">download pdf</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
