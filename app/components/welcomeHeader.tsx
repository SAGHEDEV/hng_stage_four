import React from "react";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";

const WelcomeHeader = () => {
  return (
    <div className="z-50 w-90% m-auto bg-white/40 backdrop-blur-3xl h-fit rounded-3xl p-10 py-6 flex justify-center lg:justify-between items-center sticky top-5 ">
      <Image src="/devlink-logo.png" alt="Devlink" width={150} height={50} />
      <Link href="/create-account">
        <Button className="w-[150px] !hidden lg:!block group transition ease-in-out duration-1000 !h-[52px] text-[16px] !rounded-xl !font-semibold !text-white !bg-[#633CFF] hover:border-none hover:!bg-[#633CFF] hover:!shadow-md hover:shadow-[#633CFF] !m-0">
          Join Devlinks
        </Button>
      </Link>
    </div>
  );
};

export default WelcomeHeader;
