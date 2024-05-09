import PageHeader from "@/_components/pageHeader";
import PageSubheader from "@/_components/pageSubheader";
import { createClient } from "@/_utils/supabase/server";
import Link from "next/link";
import Preview from "./preview";

export default async function PostcardPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const supabase = createClient();

  const { data, error } = await supabase
    .from("postcards")
    .select()
    .eq("id", id)
    .limit(1);

  const hasPostcard = !!data?.length;
  const postcard = data?.[0];

  return (
    <>
      <div className="space-y-2">
        <PageHeader>your postcard</PageHeader>
        {hasPostcard && (
          <PageSubheader>
            save & print or{" "}
            <Link href="/create" className="underline">
              create a new one
            </Link>
          </PageSubheader>
        )}
      </div>
      {hasPostcard ? (
        <Preview postcard={postcard} />
      ) : (
        <div className="text-center space-y-4">
          <p>couldn't find your postcard :(</p>
          <Link href="/create" className="block w-max mx-auto btn-primary">
            + create a new one
          </Link>
        </div>
      )}
    </>
  );
}
