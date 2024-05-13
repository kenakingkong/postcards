import Link from "next/link";

export default function Home() {
  const Content = (
    <div className="pr-4 md:pr-8 lg:pr-12 py-4 md:py-8 text-sm md:text-lg lg:text-xl space-y-6 lg:space-y-12 md:bd-r-primary">
      <h1 className="text-base md:text-xl lg:text-2xl">
        welcome to <b>postcards</b>
      </h1>
      <p>send love to your friends and family with a custom post card</p>
      <div className="space-y-2">
        <p>ready to get started?</p>
        <p>
          <Link href="/create" className="link">
            create your own card →
          </Link>
        </p>
        <p>
          or,{" "}
          <Link href="/gallery" className="link">
            see what people made →
          </Link>
        </p>
      </div>
      <div className="space-y-2">
        <p>can’t wait to see what you make!</p>
        <p>xoxo, makena</p>
      </div>
    </div>
  );
  return (
    <>
      <div className="hidden md:flex flex justify-center items-center min-h-[90svh]">
        <div className="max-w-5xl mx-auto grid grid-cols-2">
          {Content}
          <div className="p-4 px-8 md:pb-12 lg:pb-16 md:px-12 lg:px-16 flex flex-col justify-between h-full">
            <div className="border-[2.5px] border-[#50586c] border-dashed h-16 w-12 lg:h-20 lg:w-16 rounded ml-auto"></div>
            <div className="space-y-8 lg:space-y-12">
              <div className="h-[2.5px] bg-primary" />
              <div className="h-[2.5px] bg-primary" />
              <div className="h-[2.5px] bg-primary" />
              <div className="h-[2.5px] bg-primary" />
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden">{Content}</div>
    </>
  );
}
