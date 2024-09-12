"use client";

import DefaultHeader from "./components/defaultHeader";
import MainPage from "./home/main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import SignUpPage from "./create-account/page";
import { useRouter } from "next/navigation";
import StudentHeader from "./components/studentHeader";

export default function Home() {
  const [user] = useAuthState(auth);

  const router = useRouter();

  if (!user) {
    router.push("/create-account");
  }
  return (
    <main className=" md:p-6 ">
      <DefaultHeader />
      <div className="p-[16px] md:p-0">
        <MainPage />
      </div>
    </main>
  );
}
