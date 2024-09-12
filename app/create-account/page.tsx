"use client";

import Image from "next/image";
import { InputEmail, InputPassword } from "./../components/Input";
import { CgMail } from "react-icons/cg";
import { BiSolidLock } from "react-icons/bi";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import { notification } from "antd";
import {
  useReducer,
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
  MouseEventHandler,
} from "react";
import { useRouter } from "next/navigation";

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

const SignUpPage = () => {
  const [state, dispatch] = useReducer(reducer, initialUserState);
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");

  const router = useRouter();

  // const [createUserWithEmailAndPassword] =
  //   useCreateUserWithEmailAndPassword(auth);

  const handleCreateAccount = async () => {
    if (
      state.password !== state.confirm_password &&
      state.confirm_password !== ""
    ) {
      setConfirmErr("Password is different, Please check again! ");
      setPasswordErr("");
      console.log(confirmErr);
    } else if (
      state.password.length < 8 &&
      state.password === state.confirm_password
    ) {
      setPasswordErr("Password Should not be less than 8");
      setConfirmErr("");
      console.log(passwordErr);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );
        notification.success({
          message: `Account Created Successfully`,
          description: `Navigating to Login page to log into your account`,
        });
        router.push("/login");
      } catch (e: any | { error?: { code: number; message: string } }) {
        console.log(e);
        notification.error({
          message: `Error ${e?.error?.code}!`,
          description: `${e?.error?.message}, Kindly try again`,
        });
      }
      setPasswordErr("");
      setConfirmErr("");
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

      <div className="w-full md:bg-white md:w-[476px] rounded-xl py-[64px] md:p-10 flex justify-center items-center flex-col gap-7">
        <div className="w-full">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#333333] mb-4">
            Create Account
          </h2>
          <p className="text-base text-[#737373]">
            Let’s get you started sharing your links!
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
            label="Create Password"
            icon={BiSolidLock}
            value={state.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "setPassword", payload: e.target.value })
            }
            placeholder="Create Password"
            error={passwordErr}
          />
          <InputPassword
            label="Confirm Password"
            icon={BiSolidLock}
            value={state.confirm_password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "confirmPassword", payload: e.target.value })
            }
            placeholder="Confirm Password"
            error={confirmErr}
          />
          <button
            onClick={handleCreateAccount}
            className="w-full font !h-[46px] text-[16px] rounded-xl !font-semibold !text-white !bg-[#633CFF] hover:border-none hover:!bg-[#BEADFF] hover:!shadow-md hover:shadow-[#633CFF] !m-0"
          >
            Create New Account
          </button>
          <p className="text-sm text-[#737373]">
            Already have an account?
            <Link href="/login" className="text-[#633CFF]">
              Login account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
