import { redirect } from "next/navigation";
import PageHeader from "@/_components/pageHeader";
import { createClient } from "@/_utils/supabase/server";
import PostcardList from "./_components/postcardList";
import PageSubheader from "@/_components/pageSubheader";
import Link from "next/link";

export default async function MyCardsPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <div className="space-y-2">
        <PageHeader>my postcards</PageHeader>
        <PageSubheader>
          <Link href="/create" className="link">
            create a new one
          </Link>
        </PageSubheader>
      </div>
      <PostcardList userId={data.user.id} />
    </>
  );
}
