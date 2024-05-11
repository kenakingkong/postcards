import PageHeader from "@/_components/pageHeader";
import PageSubheader from "@/_components/pageSubheader";
import { createClient } from "@/_utils/supabase/server";
import PostcardPreview from "./postcardPreview";
import PdfPreview from "./pdfPreview";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PostcardPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("postcards")
    .select()
    .eq("id", id)
    .limit(1);

  const hasPostcard = !!data?.length;
  const postcard = data?.[0];

  if (
    error ||
    userError ||
    !userData.user ||
    !hasPostcard ||
    userData.user.id != postcard.user_id
  ) {
    redirect("/gallery");
  }

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
        <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
          <PostcardPreview postcard={postcard} />
          <PdfPreview postcard={postcard} />
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p>couldnt find your postcard :-(</p>
          <Link href="/create" className="block w-max mx-auto btn-primary">
            + create a new one
          </Link>
        </div>
      )}
    </>
  );
}
