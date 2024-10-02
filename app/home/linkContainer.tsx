"use client";

import { Button } from "antd";
import { useState, useEffect } from "react";
import SingleLink from "../components/singleLink";
import EmptyLink from "../components/emptyLink";
import { FormEvent } from "react";
import { db } from "@/firebase/firbase";
import { getDocs, collection } from "firebase/firestore";

export const linkCollectionRef = collection(db, "links");

export interface Link {
  platform: string;
  url: string;
  error: string;
}

const LinkContainer = () => {
  const [links, setLinks] = useState<Link[]>([]);

  const getLinks = async () => {
    try {
      const data = await getDocs(linkCollectionRef);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewLink = () => {
    setLinks([...links, { platform: "Github", url: "", error: "" }]);
  };
  const removeLink = (index: number) => {
    const newLink = [...links];
    newLink.splice(index, 1);
    setLinks(newLink);
  };

  const handleUpadteUrl = (index: number, value: string) => {
    const newLinks = [...links];
    // newLinks[index].url = value;
    newLinks[index] = {
      ...newLinks[index], // Keep the other fields unchanged
      url: value, // Update the specific field dynamically
    };
    setLinks(newLinks);
    console.log(links);
  };

  const handleUpdatePlatform = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index].platform = value;
    setLinks(newLinks);
    console.log(links);
  };

  useEffect(() => {
    getLinks();
  }, []);
  // console.log(links);
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
                key={link.url}
                link={link}
                index={index}
                removeLink={removeLink}
                handleUpadteUrl={handleUpadteUrl}
                handleUpdatePlatform={handleUpdatePlatform}
              />
            ))
          )}
        </div>
        <div className="w-full p-6 border-t flex justify-end align-center">
          <button
            type="submit"
            className="w-[91px] h-[46px] text-[16px] rounded-xl font-semibold text-white bg-[#633CFF] hover:border-none hover:bg-[#1b84ed] hover:shadow-md hover:shadow-[#633CFF] m-0"
            disabled
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinkContainer;
