"use client";

import Image from "next/image";
import { InputEmail, InputPassword } from "./../components/Input";
import { CgMail } from "react-icons/cg";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firbase";
import { Button, notification, Divider } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/loading";

const Page = () => {
  const [email, setEmail] = useState("");
  const [verifyLoad, setVerifyLoad] = useState(false);

  const router = useRouter();

  const handleSendEmail = async () => {
    setVerifyLoad(true);
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        notification.success({
          message: `Action sucessful!`,
          description: `A password reset email has been sent to your email!`,
        });
      })
      .catch(() => {
        notification.error({
          message: `An error occured`,
          description: `Kindly try again!!`,
        });
      });
    setVerifyLoad(false);
  };

  const [user, loading] = useAuthState(auth);

  // Handle loading state: Wait for Firebase to check the user's session
  if (loading) {
    return <Loading />; // You can replace this with a loading spinner or animation
  }

  // Redirect to home if user is logged in
  if (user) {
    router.push("/links");
    // return null; // Prevent further rendering while redirecting
  }

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
            Reset Password
          </h2>
          <p className="text-base text-[#737373]">
            A verification mail will be sent to your mail to reset your
            password, provide your email below
          </p>
        </div>

        <form
          className="w-full !flex justify-center items-center flex-col gap-6"
          onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <InputEmail
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            label="Email Address"
            icon={CgMail}
            value={email}
            placeholder="Enter Email Address"
            error=""
          />

          <Button
            htmlType="submit"
            loading={verifyLoad}
            onClick={handleSendEmail}
            className="w-full font !h-[46px] text-[16px] rounded-xl !font-semibold !text-white !bg-[#633CFF] hover:border-none hover:!bg-[#1b84ed] hover:!shadow-md hover:shadow-[#633CFF] !m-0"
          >
            Send Verification Email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
