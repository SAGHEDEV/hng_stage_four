"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import { useRouter } from "next/navigation";
import Loading from "./components/loading";

export default function Home() {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  if (user && !loading) {
    router.push("/links");
    return null;
  } else {
    return <main className="md:p-6">Welcome to Home Page</main>;
  }
}
