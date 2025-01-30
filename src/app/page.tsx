import { LoginForm } from "@/components/forms/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          {/* <img src="/logo.png" width={200} height={200} /> */}
          <p className=" text-2xl font-semibold">
            <img src="/logo.png" alt="" width={100} className=" ~w-28/32" />
          </p>
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
