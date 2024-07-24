"use client";

import React from "react";
import Image from "next/image";
import { RiLinksFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Button } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";

const DefaultHeader = () => {
  const routes = [
    {
      key: "/",
      label: "Links",
      icon: RiLinksFill,
    },
    {
      key: "/profile",
      label: "Profile Details",
      icon: CgProfile,
    },
  ];
  return (
    <div>
      <div className="hidden md:flex w-full bg-white p-4 rounded-xl justify-between items-center">
        <Image src="/devlink-logo.png" width={146} height={32} alt="App Logo" />

        <div className="flex justify-center items-center gap-[16px]">
          {routes.map((route) => (
            <Link href={route.key} key={route.key}>
              <div className="flex justify-center items-center gap-2 py-[11px] px-[27px] rounded-lg bg-[#EFEBFF] text-[#737373] cursor-pointer">
                <route.icon size={20} />
                <span className=" text-[16px] font-semibold">
                  {route.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Button className="!h-[46px] !w-[114px] text-[16px] !font-semibold !text-[#633CFF] !bg-white border !border-[#633CFF] hover:!bg-[#EFEBFF]  !m-0">
          Preview
        </Button>
      </div>

      <div className="flex md:hidden w-full bg-white p-4 rounded-xl justify-between items-center">
        <Image
          src="/devlink-icon.png"
          alt="devlink icon"
          width={32}
          height={32}
        />

        <div className="flex justify-center items-center gap-[16px]">
          {routes.map((route) => (
            <Link href={route.key} key={route.key}>
              <div className="flex justify-center items-center gap-2 py-[11px] px-[27px] rounded-lg bg-[#EFEBFF] text-[#737373] cursor-pointer">
                <route.icon size={20} />
              </div>
            </Link>
          ))}
        </div>

        <Button className="!h-[46px] !w-[52px] text-[16px] !font-semibold !text-[#633CFF] !bg-white border !border-[#633CFF] hover:!bg-[#EFEBFF]  !m-0">
          <MdOutlineRemoveRedEye size={20} />
        </Button>
      </div>
    </div>
  );
};

export default DefaultHeader;
