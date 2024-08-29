import Image from "next/image";
import schoolLogo from "../../public/AbS-removebg-preview.png";
export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center py-10">
      <h1 className="text-3xl">{`Accra Business School`}</h1>
      <div className="w-full flex flex-col justify-center items-center">
        <Image src={schoolLogo} alt="logo" />
      </div>
    </main>
  );
}
