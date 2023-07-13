import Link from "next/link";

export default function Home() {
  return (
    <div className=" text-center  flex flex-col justify-center items-center min-h-screen ">
      <h1 className="text-center flex justify-center text-4xl text-white font-bold">
        This is next js tutorial project
      </h1>
      <div>
        <span>
          go and visit
          <Link href={"/signup"} className="underline ml-1 text-blue-900">
            the pages
          </Link>
        </span>
      </div>
    </div>
  );
}
