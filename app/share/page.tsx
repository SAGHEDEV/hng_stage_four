"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import Image from "next/image";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firbase";
import Loading from "../components/loading";
import { handleGetRightIconColor, handleVerifyUrl } from "../hooks/handleFrame";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

const Page = () => {
  const [user, loading] = useAuthState(auth);
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<any>();
  const [links, setLinks] = useState<any>();
  const router = useRouter();

  const userId = searchParams.get("id");

  // Ensure this runs on the client side only
  useEffect(() => {
    if (!userId && !user) return;
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

    fetchUserData();
    getLinks();
  }, [userId, user]);

  if (loading) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col justify-center items-center w-full h-full min-h-screen py-16 px-4">
        <div className="absolute w-full h-52 bg-[#633CFF] rounded-b-3xl top-0"></div>

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
                navigator.clipboard.writeText(
                  window.location.href + `?id=${user.uid}`
                );
                message.success("Link copied to clipboard!");
              }}
              className="!w-[91px] !h-[46px] text-[16px] rounded-xl font-semibold !text-white !bg-black hover:!border-none hover:!white hover:!shadow-md hover:!shadow-[#633CFF] !m-0"
            >
              Share
            </Button>
          </div>
        )}
        <div className="py-16 z-10">
          <div className="z-10 !w-90% !min-w-[350px] md:w-[500px] h-fit rounded-3xl shadow-xl p-10 flex flex-col justify-center items-center gap-8 bg-white">
            {userData.photuUrl ? (
              <Image
                src={userData?.photoURL as string}
                alt="Profile picture"
                width={148}
                height={148}
                className="rounded-full shadow-sm"
              />
            ) : (
              <div className="w-32 h-32 p-10 rounded-full bg-gray-500 animate-pulse"></div>
            )}

            <p className="font-semibold text-xl text-center">
              {userData?.displayName}
            </p>

            <div className="w-full flex justify-center items-center gap-3 flex-col max-h-[300px] overflow-auto">
              {links?.length !== 0
                ? links?.map((link: any) => {
                    const { color, icon: Icon } = handleGetRightIconColor(
                      link?.platform
                    );
                    return (
                      <Link
                        key={link?.id}
                        href={link?.url}
                        target="blank"
                        className={`w-full h-[40px] rounded-lg flex justify-between items-center px-5 text-white cursor-pointer`}
                        style={{ backgroundColor: color }}
                      >
                        <span className="flex justify-start items-center">
                          <Icon />{" "}
                          <span className="ml-3 text-sm">{link?.platform}</span>
                        </span>
                        <span>
                          {handleVerifyUrl(link?.url) && <FaArrowRight />}
                        </span>
                      </Link>
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

          <p className="mt-20 text-center text-sm">
            Also want to share your link like this? visit{" "}
            <Link href="/">
              <span className="font-bold text-lg text-[#633CFF]">Devlink</span>
            </Link>
          </p>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
