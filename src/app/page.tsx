import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-5xl text-center flex flex-col  items-center justify-center text-amber-600 bg-slate-600 w-full min-h-screen"> 
       <SignedOut>
              
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              Home Page 
              <UserButton />
              <SignOutButton/>
            </SignedIn> 
    </div>
  );
}
