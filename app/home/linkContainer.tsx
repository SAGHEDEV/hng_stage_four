"use client";

import { Button } from "antd";
import { useState } from "react";
import SingleLink from "../components/singleLink";
import EmptyLink from "../components/emptyLink";
import { FormEvent } from "react";

export interface Link {
  platform: string;
  url: string;
  error: string;
}

const LinkContainer = () => {
  const [links, setLinks] = useState<Link[]>([]);

  const addNewLink = () => {
    setLinks([...links, { platform: "", url: "", error: "" }]);
  };
  const removeLink = (index: number) => {
    const newLink = [...links];
    newLink.splice(index, 1);
    setLinks(newLink);
  };

  const handleLinkChange = () => {};
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
              />
            ))
          )}
        </div>
        <div className="w-full p-6 border-t flex justify-end align-center">
          <button
            type="submit"
            className="w-[91px] h-[46px] text-[16px] rounded-xl font-semibold text-white bg-[#633CFF] hover:border-none hover:bg-[#BEADFF] hover:shadow-md hover:shadow-[#633CFF] m-0"
            disabled
          >
            Saver
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinkContainer;
