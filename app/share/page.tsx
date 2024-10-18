"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import Image from "next/image";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firbase";
import Loading from "../components/loading";
import { handleGetRightIconColor } from "../hooks/handleFrame";
import { handleVerifyUrl } from "../hooks/handleFrame";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const Page = () => {
  const [user, loading] = useAuthState(auth);
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<any>();
  const [links, setLinks] = useState<any>();
  const router = useRouter();

  const userId = searchParams.get("id");

  const uid = user?.uid || userId;

  const fetchUserData = async () => {
    try {
      const docRef = doc(db, "users", uid as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data()); // Get user data from Firestore
      } else {
        console.log("No such user data!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getLinks = async () => {
    const linkCollectionRef = collection(db, "users", uid as string, "links");
    try {
      const docsSnapshot = await getDocs(linkCollectionRef);
      const documents = docsSnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document data
      }));
      setLinks(documents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    getLinks();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="absolute w-full h-52 bg-[#633CFF] rounded-b-3xl top-0"></div>
      <p className="text-xs font-light absolute top-8 text-white hidden md:block">
        Created with 💜 by SAGHEDEV
      </p>
      {user && (
        <div className="w-full flex justify-between items-center absolute top-8 px-8">
          <Button
            onClick={() => router.back()}
            className="!w-[91px] !h-[46px] text-[16px] rounded-xl font-semibold !text-[#633CFF] !bg-white hover:!border-none hover:!bg-[#1b84ed] hover:!shadow-md hover:!shadow-[#633CFF] !m-0"
          >
            Back
          </Button>

          <Button
            onClick={() => {
              console.log(window.location.href + `?id=${user.uid}`);
            }}
            className="!w-[91px] !h-[46px] text-[16px] rounded-xl font-semibold !text-white !bg-black hover:!border-none hover:!white hover:!shadow-md hover:!shadow-[#633CFF] !m-0"
          >
            Share
          </Button>
        </div>
      )}
      <div className="z-10 !w-90% !min-w-[350px] md:w-[500px] h-fit rounded-3xl shadow-xl p-10 flex flex-col justify-center items-center gap-8 bg-white">
        <Image
          src={userData?.photoURL as string}
          alt="Profile picture"
          width={148}
          height={148}
          className="rounded-full shadow-sm"
        />

        <p className="font-semibold text-xl text-center">
          {userData?.displayName}
        </p>

        <div className="w-full flex justify-center items-center gap-3 flex-col max-h-[300px] overflow-scroll">
          {links?.length !== 0
            ? links?.map((link: any) => {
                const { color, icon: Icon } = handleGetRightIconColor(
                  link?.platform
                );
                return (
                  <div
                    key={link?.id}
                    className={`w-full h-[40px] rounded-lg flex justify-between items-center px-5 text-white`}
                    style={{ backgroundColor: color }}
                  >
                    <span className="flex justify-start items-center">
                      <Icon />{" "}
                      <span className="ml-3 text-sm">{link?.platform}</span>
                    </span>
                    <span>
                      {handleVerifyUrl(link?.url) && <FaArrowRight />}
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

      <p className="mt-20">
        Also want to share your link like this? visit{" "}
        <Link href="/">
          <span className="font-bold text-lg text-[#633CFF]">Devlink</span>
        </Link>
      </p>
    </div>
  );
};

export default Page;
