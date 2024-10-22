"use client";

import { Button, notification } from "antd";
import { useState, useEffect } from "react";
import SingleLink from "../components/singleLink";
import EmptyLink from "../components/emptyLink";
import { FormEvent } from "react";
import { db } from "@/firebase/firbase";
import FrameContainer from "../components/frameContainer";
import {
  getDocs,
  collection,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  writeBatch,
  deleteDoc,
} from "firebase/firestore";
import { useLocalStorage } from "../hooks/localStorage";
import { auth } from "@/firebase/firbase";
import { handleVerifyUrl } from "../hooks/handleFrame";

export interface Link {
  platform: string;
  url: string;
  id: string;
}

const LinkContainer = () => {
  const [links, setLinks] = useState<any>([]);
  const { setItem } = useLocalStorage();
  const [saveLoading, setSaveLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  // const userReference = doc(db, "user", auth?.currentUser?.uid as string);
  const linkCollectionRef = collection(
    db,
    "users",
    auth?.currentUser?.uid as string,
    "links"
  );

  const getLinks = async () => {
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

  const addNewLink = () => {
    setLinks([...links, { platform: "Github", url: "" }]);
  };
  const handleRemoveLink = async (id: string) => {
    const docRef = doc(
      db,
      "users",
      auth?.currentUser?.uid as string,
      "links",
      id
    );
    try {
      await deleteDoc(docRef);
      getLinks();
    } catch (e: any) {
      console.log(e);
    }
    api.success({
      message: "Link has been removed successfully!!",
    });
  };

  const handleUpadteUrl = (index: number, value: string) => {
    const newLinks = [...links];
    // newLinks[index].url = value;
    newLinks[index] = {
      ...newLinks[index], // Keep the other fields unchanged
      url: value, // Update the specific field dynamically
    };
    setLinks(newLinks);
  };

  const handleUpdatePlatform = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index].platform = value;
    setLinks(newLinks);
  };

  const findDuplicatePlatforms = (links: Link[]): string[] => {
    const platformSet = new Set<string>(); // To track unique platforms
    const duplicates: string[] = []; // To store duplicated platforms

    for (const link of links) {
      if (platformSet.has(link.platform)) {
        // If platform already exists, add to duplicates array if it's not already there
        if (!duplicates.includes(link.platform)) {
          duplicates.push(link.platform);
        }
      } else {
        platformSet.add(link.platform); // Add the platform if it's unique
      }
    }

    return duplicates; // Return array of duplicates (empty if no duplicates found)
  };

  const handleBatchUpdateLinks = async () => {
    setSaveLoading(true);
    const batch = writeBatch(db); // Create a new write batch

    const duplicates = findDuplicatePlatforms(links);

    try {
      for (let index = 0; index < links.length; index++) {
        const link = links[index];
        const id = link.id || `${link.platform}${index}`; // Assuming each link has a unique ID
        const url_value = link.url;

        // Check if user is authenticated and user ID is available
        if (!auth?.currentUser?.uid) {
          api.error({
            message: "User is not authenticated. Aborting batch update.",
          });
          return;
        }

        // Check if the URL is empty or invalid
        if (url_value === "" || !url_value) {
          api.error({
            message: `Link ${index + 1} has an empty URL. Kindly confirm.`,
          });
          return; // Abort on error
        }

        if (duplicates.length !== 0) {
          api.error({
            message: "A duplicate platform has been detected, kindly confirm!",
          });
          return; // Abort on error
        }

        if (!handleVerifyUrl(url_value)) {
          api.error({
            message: `Kindly confirm the link attached to ${link?.platform}`,
          });
          return; // Abort on error
        }

        // Check if id is valid before creating document reference
        if (!id || typeof id !== "string") {
          api.error({
            message: `Invalid document ID for link at index ${index}. Kindly try again`,
          });
          return; // Abort on error
        }

        // Create the Firestore document reference
        const docRef = doc(
          db,
          "users",
          auth?.currentUser?.uid as string,
          "links",
          id
        );

        // Use set with merge: true to avoid updating non-existing documents
        batch.set(docRef, { ...link }, { merge: true });
      }

      // Commit the batch after processing all links
      await batch.commit();
      api.success({
        message: "Successfully saved all links!",
      });
    } catch (error) {
      api.error({
        message: "An error occurred while saving the links.",
      });
      console.error("Batch error:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    setItem("links", links);
  }, [links]);

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <main className="my-[24px] flex justify-between items-start gap-6">
      {contextHolder}
      <FrameContainer links={links} />
      <div className="w-full p-[40px] rounded-xl bg-white">
        <div className="w-full">
          <h2 className="text-[32px] font-bold text-[#333333] mb-2">
            Customize your links
          </h2>
          <p className="text-[16px] font-normal mb-10">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <Button
            onClick={() => addNewLink()}
            className="!h-[46px] !w-full text-[16px] !font-semibold !text-[#633CFF] !bg-white border !border-[#633CFF] hover:!bg-[#EFEBFF]  !m-0"
          >
            + Add new link
          </Button>
        </div>
        <form
          className="w-full"
          onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <div className="my-6 w-full flex flex-col gap-6">
            {links.length === 0 ? (
              <EmptyLink />
            ) : (
              links.map((link: Link, index: number) => (
                <SingleLink
                  key={index}
                  link={link}
                  index={index}
                  handleRemoveLink={handleRemoveLink}
                  handleUpadteUrl={handleUpadteUrl}
                  handleUpdatePlatform={handleUpdatePlatform}
                />
              ))
            )}
          </div>
          <div className="w-full p-6 border-t flex justify-end align-center">
            <Button
              loading={saveLoading}
              className="!w-[91px] !h-[46px] text-[16px] rounded-xl font-semibold !text-white !bg-[#633CFF] hover:!border-none hover:!bg-[#1b84ed] hover:!shadow-md hover:!shadow-[#633CFF] !m-0"
              onClick={handleBatchUpdateLinks}
              disabled={links.length === 0}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LinkContainer;
