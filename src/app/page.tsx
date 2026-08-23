import LoginCard from "@/components/auth/LoginCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen items-center justify-center bg-white md:px-4 overflow-hidden">
      <div className="flex h-full max-w-md flex-col items-center justify-center">
        {/* Logo */}
        <div className=" mb-3.5 md:mb-5  md:w-300 h-6 flex items-center justify-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black">
            <Image src="/prisma.png" alt="prisma-icon" width={16} height={16}/>
          </div>

          <span className="text-sm font-sans font-semibold text-[#0A0A0A]">
            Pyramid
          </span>
        </div>

        <LoginCard />

         <div className="w-[384px] h-12 mt-3 md:mt-4 flex items-center justify-center">

          <p className="w-50 h-12 font-sans text-xs leading-4 text-center text-[#737373]">By clicking continue, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span></p>

         </div>
       

      </div>
    </main>
  );
}

