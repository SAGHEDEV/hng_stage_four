"use client";

import React, { useEffect, useState } from "react";
import DefaultHeader from "../components/defaultHeader";
import FrameContainer from "../components/frameContainer";
import ProfileContainer from "./profieContainer";
import { notification } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "@/firebase/firbase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  connectStorageEmulator,
} from "firebase/storage";
import { updateProfile, User } from "firebase/auth";
import Loading from "../components/loading";
import { db } from "@/firebase/firbase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

export const handleSaveUserCopy = async (user: any) => {
  const userDocRef = doc(db, "users", user.uid);
  await setDoc(userDocRef, {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    // Add more fields as needed
  });
};
const Page = () => {
  const [user, loading] = useAuthState(auth);
  const [api, contextHolder] = notification.useNotification();
  const [updateLoading, setupdateLoading] = useState(false);
  const [links, setLinks] = useState<any>([]);


  console.log(user?.photoURL);

  const handleUpdateProfile = async (file: File, name: string) => {
    setupdateLoading(true);
    if (name == "") {
      api.error({
        message: "Name cannot be empty!",
      });
    } else if (!file) {
      api.error({
        message: "A profile picture must be provided!",
      });
    } else {
      console.log(user?.uid);
      const fileRef = ref(storage, user?.uid + ".png");

      if (typeof file !== "string") {
        await uploadBytes(fileRef, file)
          .then(async () => {
            const photoLink = await getDownloadURL(fileRef);
            await updateProfile(user as User, {
              displayName: name,
              photoURL: photoLink,
            });
            api.success({
              message: "Profile Updated Successfully",
            });
          })
          .catch((e) => {
            api.error({
              message: "An error occured while uploading profile, try again!",
            });
          });
      } else {
        await updateProfile(user as User, {
          displayName: name,
        });
        api.success({
          message: "Profile Updated Successfully",
        });
      }
    }
    handleSaveUserCopy(user);
    setupdateLoading(false);
  };

  const getLinks = async () => {
    const linkCollectionRef = collection(
      db,
      "users",
      user?.uid as string,
      "links"
    );
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
    if (auth.currentUser?.uid) {
      getLinks();
    }
  }, [auth.currentUser?.uid]);

  if (!auth.currentUser?.displayName) {
    api.warning({
      message:
        "Kindly upload your name and profile so people can identify you!",
    });
  }

  if (loading) return <Loading />;

  return (
    <main className="md:p-6">
      {contextHolder}
      <DefaultHeader />
      <div className="p-[16px] md:p-0 my-[24px] flex justify-between items-start gap-6">
        <FrameContainer links={links} />
        <ProfileContainer
          handleUpdateProfile={handleUpdateProfile}
          loading={updateLoading}
        />
      </div>
    </main>
  );
};

export default Page;
