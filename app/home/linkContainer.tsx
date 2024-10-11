"use client";

import { Button } from "antd";
import { useState, useEffect } from "react";
import SingleLink from "../components/singleLink";
import EmptyLink from "../components/emptyLink";
import { FormEvent } from "react";
import { db } from "@/firebase/firbase";
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  writeBatch,
  deleteDoc,
} from "firebase/firestore";
import { useLocalStorage } from "../hooks/localStorage";
import { auth } from "@/firebase/firbase";

export interface Link {
  platform: string;
  url: string;
  id: string;
}

const LinkContainer = () => {
  const [links, setLinks] = useState<any>([]);
  const { setItem } = useLocalStorage();
  const [saveLoading, setSaveLoading] = useState(false);
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
  const handleCreateNewLink = async (newLink: any) => {
    try {
      await addDoc(linkCollectionRef, {
        platform: newLink?.platform,
        url: newLink?.url,
      }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addNewLink = () => {
    setLinks([...links, { platform: "Github", url: "", id: "" }]);
    handleCreateNewLink({ platform: "Github", url: "", id: "" });
    getLinks();
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

  const handleSaveSingleLink = async (id: string, index: number) => {
    const url_value = links[index].url;
    if (url_value === "" || !url_value) {
      console.log("url is empty");
    } else {
      const docRef = doc(
        db,
        "users",
        auth?.currentUser?.uid as string,
        "links",
        id
      );
      await updateDoc(docRef, {
        ...links[index],
      });
      console.log("updated");
    }
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
    let isValid = true; // Flag to check if all links are valid

    const duplicates = findDuplicatePlatforms(links);

    console.log(duplicates);

    // Iterate through each link and validate before adding to the batch
    links.forEach((link: any, index: number) => {
      const id = link.id; // Assuming each link has a unique ID
      const url_value = link.url;

      // Check if the URL is empty or invalid
      if (url_value === "" || !url_value) {
        console.log(
          `Link at index ${index} has an empty URL. Aborting batch update.`
        );
        isValid = false; // Mark as invalid
      } else {
        const docRef = doc(
          db,
          "users",
          auth?.currentUser?.uid as string,
          "links",
          id
        );

        // Add the update operation to the batch
        batch.update(docRef, {
          ...link,
        });
      }
    });

    // If all links are valid, commit the batch
    if (isValid) {
      try {
        await batch.commit();
        console.log("Batch update completed successfully.");
      } catch (error) {
        console.error("Error during batch update: ", error);
      }
    } else {
      console.log("Batch update aborted due to invalid data.");
    }
    setSaveLoading(false);
  };

  useEffect(() => {
    setItem("links", links);
  }, [links]);

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className="w-full p-[40px] rounded-xl bg-white">
      <div className="w-full">
        <h2 className="text-[32px] font-bold text-[#333333] mb-2">
          Customize your links
        </h2>
        <p className="text-[16px] font-normal mb-10">
          Add/edit/remove links below and then share all your profiles with the
          world!
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
                handleSaveSingleLink={handleSaveSingleLink}
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
  );
};

export default LinkContainer;
