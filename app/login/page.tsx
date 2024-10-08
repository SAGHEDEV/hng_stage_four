"use client";

import Image from "next/image";
import { InputEmail, InputPassword } from "./../components/Input";
import { CgMail } from "react-icons/cg";
import { BiSolidLock } from "react-icons/bi";
import Link from "next/link";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import { Button, notification } from "antd";
import { useRouter } from "next/navigation";
import { useReducer, ChangeEvent, FormEvent, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firbase";
import { SuiteContext } from "node:test";

const initialUserState = {
  email: "",
  password: "",
};

function reducer(
  state: { email: string; password: string },
  action: { type: string; payload: string }
) {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };

    default:
      return state;
  }
}

const Page = () => {
  const [state, dispatch] = useReducer(reducer, initialUserState);
  const [passwordErr, setPasswordErr] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLoginAccount = async () => {
    setLoading(true);

    if (state.password.length < 8) {
      setPasswordErr("Password should not be less than 8 characters.");
      setLoading(false);
      return;
    } else {
      setPasswordErr("");
    }

    try {
      // Set persistence for session login
      await setPersistence(auth, browserSessionPersistence);

      // Attempt to sign in with email and password
      const res = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );

      const uid = res.user.uid;
      const userRef = doc(db, "users", uid);

      // Prepare user data
      const userData = {
        email: res.user.email,
        name: res.user.displayName || "Anonymous", // Fallback if displayName is null
      };

      // Add or update the user's document in Firestore
      await setDoc(userRef, userData);

      console.log("User document successfully created/updated!");

      // Notification for successful login
      notification.success({
        message: `Login Successful`,
        description: `You can now create and share your links as you wish!`,
      });

      // Redirect to the home page or dashboard
      router.push("/");
    } catch (error: any) {
      // Handle any Firebase or Firestore-related errors
      console.error("Error during login or Firestore operation: ", error);

      // Display error notification with proper messaging
      notification.error({
        message: `Error ${error.code || "Unknown Error"}!`,
        description: `${
          error.message || "An error occurred, please try again."
        }`,
      });
    }

    setLoading(false);
  };

  return (
    <div className="w-full md:flex md:h-screen justify-center items-center flex-col gap-[45px] p-[32px] py-6">
      <div className="flex justify-start md:justify-center items-start md:items-center">
        <Image
          src="/devlink-logo.png"
          alt="Devlink Logo"
          width={182.5}
          height={40}
        />
      </div>

      <div className="w-full md:bg-white md:w-[476px] rounded-xl py-[64px] md:p-10 flex justify-center items-center flex-col gap-10">
        <div className="w-full">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#333333] mb-8">
            LogIn
          </h2>
          <p className="text-base text-[#737373]">
            Add your details below to get back into the app
          </p>
        </div>

        <form
          className="w-full !flex justify-center items-center flex-col gap-6"
          onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <InputEmail
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "setEmail", payload: e.target.value })
            }
            label="Email Address"
            icon={CgMail}
            value={state.email}
            placeholder="Enter Email Address"
            error=""
          />
          <InputPassword
            label="Enter Correct Password"
            icon={BiSolidLock}
            value={state.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "setPassword", payload: e.target.value })
            }
            placeholder="Enter Correct Password"
            error={passwordErr}
          />
          <Button
            loading={loading}
            onClick={handleLoginAccount}
            className="w-full font !h-[46px] text-[16px] rounded-xl !font-semibold !text-white !bg-[#633CFF] hover:border-none hover:!bg-[#1b84ed] hover:!shadow-md hover:shadow-[#633CFF] !m-0"
          >
            Login Account
          </Button>
          <p className="text-[16px] text-[#737373]">
            Dont have an account?
            <Link href="/create-account" className="text-[#633CFF]">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
