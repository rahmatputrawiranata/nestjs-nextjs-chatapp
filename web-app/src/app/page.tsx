import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center p-5 h-full">
      <div>
      <h1 className="text-4xl font-bold">Welcome to Chat App</h1>
      <p className="text-lg">Find your friends and chat with them.</p>
      </div>
      <div>
      <Link
      href='/auth/register' 
      >
        <div
        className="
          bg-gradient-to-r 
          from-[#62CDCB] 
          from-25% 
          to-[#4599DB] 
          to-78% 
          w-full 
          px-4 
          py-2 
          rounded 
          mt-5
          active:shadow-lg
          text-center
          active:shadow-[#62CDCB]">
          Register
        </div>
      </Link>
      <p className="mt-5 text-sm text-center">
        already have an account ?
        <Link href='/auth/login'>
          <span 
            className="
              underline 
              text-[#ffedac]"
          >
            Login here
          </span>
        </Link>
      </p>
      </div>
    </main>
  );
}

// background: linear-gradient(108.32deg, #62CDCB 24.88%, #4599DB 78.49%);
// background: linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%);
