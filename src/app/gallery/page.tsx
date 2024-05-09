import PageHeader from "@/_components/pageHeader";
import Gallery from "./_components/gallery";
import Link from "next/link";

export default function GalleryPage() {
  return (
    <div className="p-4 lg:p-6 pb-12 min-h-[90vh]">
      <PageHeader>gallery</PageHeader>
      <Gallery />
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 space-y-2">
        <Link href="create" className="btn-primary">
          + create your own
        </Link>
      </div>
    </div>
  );
}
