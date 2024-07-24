"use client";

import { Button, Form } from "antd";
import Image from "next/image";
import { InputComponent, InputPassword } from "./../components/Input";
import { CgMail } from "react-icons/cg";
import { BiSolidLock } from "react-icons/bi";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="w-full md:flex md:h-screen justify-center items-center flex-col gap-[51px] p-[32px]">
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
            Login
          </h2>
          <p className="text-base text-[#737373]">
            Add your details below to get back into the app
          </p>
        </div>

        <Form className="w-full flex justify-center items-center flex-col gap-6">
          <Form.Item name="email" className="w-full !m-0">
            <InputComponent
              onChange={()=> console.log("bola")} label="Email Address" type="email" icon={CgMail} value=""
            />
          </Form.Item>
     
            <InputPassword
             label="Confirm Password"
             type="password"
             icon={BiSolidLock}
             value=""
             onChange={()=> console.log("working")}
            />
          
          <Button
            size="large"
            className="w-full font !h-[46px] text-[16px] !font-semibold !text-white !bg-[#633CFF] hover:border-none hover:!bg-[#BEADFF] hover:!shadow-md hover:shadow-[#633CFF] !m-0"
          >
            Login
          </Button>
          <p className="text-[16px] text-[#737373]">
            Don’t have an account?
            <Link href="/create-account" className="text-[#633CFF]">
              Create account
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
