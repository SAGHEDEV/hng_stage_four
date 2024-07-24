"use client";

import Image from "next/image";
import { InputEmail, InputPassword } from "./../components/Input";
import { CgMail } from "react-icons/cg";
import { BiSolidLock } from "react-icons/bi";
import Link from "next/link";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import { useReducer, ChangeEvent, FormEvent, useState } from "react";

const initialUserState = {
  email: "",
  password: "",
  confirm_password: "",
};

function reducer(
  state: { email: string; password: string; confirm_password: string },
  action: { type: string; payload: string }
) {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "confirmPassword":
      return { ...state, confirm_password: action.payload };
    default:
      return state;
  }
}

const Page = () => {
  console.log("Auth is", auth.config);
  // const [createUserWithEmailAndPassword] =
  //   useCreateUserWithEmailAndPassword(auth);

  const [state, dispatch] = useReducer(reducer, initialUserState);
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");

  const handleCreateAccount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state.email, state.password, state.confirm_password);
    if (state.password === state.confirm_password) {
      setConfirmErr("Please check again! ");
    }
    if (state.password.length < 8) {
      setConfirmErr("Should not be less than 8");
    }
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
            Create Account
          </h2>
          <p className="text-base text-[#737373]">
            Let’s get you started sharing your links!
          </p>
        </div>

        <form
          className="w-full !flex justify-center items-center flex-col gap-6"
          onSubmit={(e: FormEvent<HTMLFormElement>) => handleCreateAccount(e)}
        >
          <InputEmail
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "setEmail", payload: e.target.value })
            }
            label="Email Address"
            icon={CgMail}
            value={state.email}
            placeholder="Enter Email Address"
          />
          <InputPassword
            label="Create Password"
            icon={BiSolidLock}
            value={state.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "setPassword", payload: e.target.value })
            }
            placeholder="Create Password"
          />
          <InputPassword
            label="Confirm Password"
            icon={BiSolidLock}
            value={state.confirm_password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "confirmPassword", payload: e.target.value })
            }
            placeholder="Confirm Password"
          />
          <button
            type="submit"
            className="w-full font !h-[46px] text-[16px] rounded-xl !font-semibold !text-white !bg-[#633CFF] hover:border-none hover:!bg-[#BEADFF] hover:!shadow-md hover:shadow-[#633CFF] !m-0"
          >
            Create New Account
          </button>
          <p className="text-[16px] text-[#737373]">
            Already have an account?
            <Link href="/create-account" className="text-[#633CFF]">
              Login account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
