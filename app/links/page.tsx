"use client";
import React from "react";
import LinkContainer from "./linkContainer";
import DefaultHeader from "../components/defaultHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import { useRouter } from "next/navigation";
import Loading from "../components/loading";

const Links = () => {
  // useAuthState returns [user, loading, error]
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  // Handle loading state: Wait for Firebase to check the user's session
  if (loading) {
    return <Loading />; // You can replace this with a loading spinner or animation
  }

  // Redirect to the signup page if no user is logged in
  if (!user && !loading) {
    router.push("/");
    return null; // Prevent further rendering while redirecting
  }

  // If the user is authenticated, display the main content
  else {
    return (
      <main className="md:p-6">
        <DefaultHeader />
        <div className="p-[16px] md:p-0">
          <LinkContainer />
        </div>
      </main>
    );
    ``;
  }
};

export default Links;
