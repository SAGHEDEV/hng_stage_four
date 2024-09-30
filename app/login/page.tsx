"use client";

import Image from "next/image";
import { InputEmail, InputPassword } from "./../components/Input";
import { CgMail } from "react-icons/cg";
import { BiSolidLock } from "react-icons/bi";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import { Button, notification } from "antd";
import { useRouter } from "next/navigation";
import {
  useReducer,
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
  MouseEventHandler,
} from "react";

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

  // const [createUserWithEmailAndPassword] =
  //   useCreateUserWithEmailAndPassword(auth);

  const handleLoginAccount = async () => {
    setLoading(true);
    if (state.password.length < 8) {
      setPasswordErr("Password Should not be less than 8");
      console.log(passwordErr);
    } else {
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );
        console.log(res);
        notification.success({
          message: `Login Successfull`,
          description: `You can now create and share your link as you wish!`,
        });
        router.push("/");
      } catch (e: any | { error?: { code: number; message: string } }) {
        console.log(e);
        notification.error({
          message: `Error ${e?.error?.code}!`,
          description: `${e?.error?.message}, Kindly recheck details!`,
        });
      }
      setPasswordErr("");
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
            className="w-full font !h-[46px] text-[16px] rounded-xl !font-semibold !text-white !bg-[#04357c] hover:border-none hover:!bg-[#1b84ed] hover:!shadow-md hover:shadow-[#04357c] !m-0"
          >
            Login Account
          </Button>
          <p className="text-[16px] text-[#737373]">
            Dont have an account?
            <Link href="/create-account" className="text-[#04357c]">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
