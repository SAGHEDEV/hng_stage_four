import React, { useEffect, useState } from "react";
import Image from "next/image";
import { handleGetRightIconColor, handleVerifyUrl } from "../hooks/handleFrame";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import { VscVerifiedFilled } from "react-icons/vsc";

const FrameContainer = ({ links }: any) => {
  const [user] = useAuthState(auth);
  return (
    <div className="hidden lg:block bg-white rounded-2xl p-20 sticky top-0">
      <div className="!w-[307px] !h-[631px] relative">
        <Image
          src="/rectangle-main.png"
          alt="frame-1"
          width={307}
          height={631}
          className="absolute top-0 bottom-0 left-0 right-0"
        />
        <Image
          src="/Subtractframe.png"
          alt="frame-1"
          width={285}
          height={611}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          "
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[631px] flex justify-start items-center flex-col gap-16 p-10 pt-16 ">
          <div className="flex flex-col justify-center items-center gap-3">
            {user?.photoURL ? (
              <Image
                src={user?.photoURL}
                alt="User Profile"
                className="!w-28 !h-28 rounded-full border-4 border-gray-500/20"
                width={112}
                height={112}
              />
            ) : (
              <div className="!w-28 !h-28 rounded-full bg-gray-300/60"></div>
            )}
            {user?.displayName ? (
              <p className="text-xl font-semibold mt-2">{user?.displayName}</p>
            ) : (
              <p className="w-32 p-3 bg-gray-300/60 rounded-full"></p>
            )}
            <p className="text-xs">{user?.email}</p>
          </div>
          <div className="flex flex-col justify-start items-center gap-5 w-full ">
            {links?.length !== 0
              ? links?.map((link: any) => {
                  const { color, icon: Icon } = handleGetRightIconColor(
                    link?.platform
                  );
                  return (
                    <div
                      key={link?.id}
                      className={`w-full h-[45px] rounded-lg flex justify-between items-center px-5 text-white`}
                      style={{ backgroundColor: color }}
                    >
                      <span className="flex justify-start items-center">
                        <Icon />{" "}
                        <span className="ml-3 text-sm">{link?.platform}</span>
                      </span>
                      <span>
                        {handleVerifyUrl(link?.url) && <VscVerifiedFilled />}
                      </span>
                    </div>
                  );
                })
              : Array(5).map((index) => {
                  return (
                    <div
                      key={index}
                      className="w-full h-[40px] rounded-lg flex justify-start items-center px-5 bg-gray/60 animation:pulse"
                    ></div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameContainer;
