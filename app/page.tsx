"use client";

import DefaultHeader from "./components/defaultHeader";
import MainPage from "./home/main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import { useRouter } from "next/navigation";

export default function Home() {
  // useAuthState returns [user, loading, error]
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  // Handle loading state: Wait for Firebase to check the user's session
  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or animation
  }

  // Redirect to the signup page if no user is logged in
  if (!user) {
    router.push("/create-account");
    return null; // Prevent further rendering while redirecting
  }

  // If the user is authenticated, display the main content
  return (
    <main className="md:p-6">
      <DefaultHeader />
      <div className="p-[16px] md:p-0">
        <MainPage />
      </div>
    </main>
  );
}
