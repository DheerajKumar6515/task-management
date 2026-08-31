"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

function LoginCard() {
  const supabase = createClient();
  const router = useRouter();

  const handleGuestLogin = () => {
    redirect("/dashboard");
    //console.log("Continue as Guest");
  };

  const handleGoogleLogin = async () => {
    // redirect("/dashboard");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <section className="w-76 p-2 md:w-full max-w-[384px] h-50.2 rounded-4xl border border-[#E5E5E5] dark:border-gray-800 bg-white dark:bg-gray-900 md:p-6 shadow-xs shadow-[#0000000D] dark:shadow-black/50 overflow-hidden transition-colors duration-200">
      {/* Heading */}
      <div className="text-center">
        <h1 className="w-full h-5 md:text-xl font-sans font-semibold leading-none text-[#0A0A0A] dark:text-gray-100 gap-1.5">
          Let's get back on track
        </h1>

        <p className="w-full h-5 font-sans font-normal md:leading-5 mt-1 md:text-sm text-xs leading-normal text-[#737373] dark:text-gray-400">
          Enter your email below to login to your account.
        </p>
      </div>

      {/* Login Actions */}
      <div className="w-full md:w-84 h-21 mt-2.5 md:mt-4 space-y-3">
        {/* Guest Login */}
        <div
          onClick={handleGuestLogin}
          className="w-full h-9 flex items-center justify-center rounded-4xl bg-[#171717] dark:bg-white px-3 py-2 gap-1.5 cursor-pointer hover:bg-neutral-800 dark:hover:bg-gray-100 transition-colors"
        >
          <button
            type="button"
            className="w-31 h-5 font-sans text-xs md:text-sm font-medium text-[#FAFAFA] dark:text-[#0A0A0A] leading-5 cursor-pointer"
          >
            Continue as Guest
          </button>
        </div>

        {/* Google Login */}
        <div className="w-full h-9 rounded-4xl border border-[#E5E5E5] dark:border-gray-700 px-3 py-2 gap-1.5 flex items-center justify-center bg-[#FAFAFA] dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-5 w-40 font-sans leading-5 gap-2 text-xs md:text-sm font-medium text-[#0A0A0A] dark:text-gray-200 cursor-pointer items-center justify-center"
          >
            <Image src="/google.png" alt="google-icon" width={20} height={16} />
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default LoginCard;
