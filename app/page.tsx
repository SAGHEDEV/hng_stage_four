"use client";

import DefaultHeader from "./components/defaultHeader";
import MainPage from "./home/main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import SignUpPage from "./create-account/page";

export default function Home() {
  const [user] = useAuthState(auth);

  if (!user) return <SignUpPage />;
  return (
    <main className=" md:p-6 ">
      <DefaultHeader />
      <div className="p-[16px] md:p-0">
        <MainPage />
      </div>
    </main>
  );
}
