"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/firebase/firbase";
import { getDocs, collection } from "firebase/firestore";
import { auth } from "@/firebase/firbase";
import { handleGetRightIconColor } from "../hooks/handleFrame";

const FrameContainer = () => {
  const linkCollectionRef = collection(
    db,
    "users",
    auth?.currentUser?.uid as string,
    "links"
  );
  const [links, setLinks] = useState<any>([]);

  const handleGetAllLinks = async () => {
    try {
      await getDocs(linkCollectionRef).then((docs) => {
        const documents = docs.docs.map((doc) => ({
          id: doc.id, // Document ID
          ...doc.data(), // Document data
        }));
        setLinks(documents);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(links.length !== 0);
  useEffect(() => {
    handleGetAllLinks();
  }, []);
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
          <div className="!w-28 !h-28 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col justify-start items-center gap-5 w-full ">
            {links.length !== 0
              ? links.map((link: any) => {
                  const { color, icon: Icon } = handleGetRightIconColor(
                    link.platform
                  );
                  return (
                    <div
                      key={link?.id}
                      className={`w-full h-[40px] rounded-lg flex justify-start items-center px-5 text-white`}
                      style={{ backgroundColor: color }}
                    >
                      <Icon />{" "}
                      <span className="ml-3 text-sm">{link.platform}</span>
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
