import PageHeader from "@/_components/pageHeader";
import { requireAuth } from "@/_utils/supabase/auth";
import PostcardList from "./_components/postcardList";

export default async function MyCardsPage() {
  const user = await requireAuth();

  return (
    <div className="px-4 space-y-4 md:space-y-8">
      <PageHeader>Postcards</PageHeader>
      <div className="max-w-4xl mx-auto">
        <PostcardList userId={user.id} />
      </div>
    </div>
  );
}
