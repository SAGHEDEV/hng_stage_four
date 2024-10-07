"use client";

import { useEffect, useState } from "react";
import { LinkType, InputLink } from "./Input";
import { ChangeEvent } from "react";
import { Link } from "../home/linkContainer";
import { handleConfirm } from "../hooks/handleFrame";

interface SingleLinkProp {
  link: Link;
  index: number;
  handleRemoveLink: (id: string) => void;
  handleUpadteUrl: (inded: number, value: string) => void;
  handleUpdatePlatform: (index: number, value: string) => void;
  handleSaveSingleLink: (id: string, index: number) => void;
}

const SingleLink = (props: SingleLinkProp) => {
  const [optionOpen, setOptionOpen] = useState(false);
  const [currentPlat, setCurrentPlat] = useState(props.link.platform);
  const [linkd, setLinkd] = useState(props.link?.url);

  useEffect(() => {
    props.handleUpadteUrl(props.index, linkd);
  }, [linkd]);

  // console.log(props.link);

  const platData = ["Facebook", "Github", "Youtube", "LinkedIn", "Twitter"];

  return (
    <div className="p-5 rounded-xl bg-[#FAFAFA] flex flex-col justify-center items-center">
      <span className="w-full flex justify-between items-center text-[16px] text-[#737373]">
        <span className="font-bold">Link #{props.index + 1}</span>
        <span
          className="cursor-pointer"
          onClick={() =>
            handleConfirm({
              data: props.link.id,
              action: props.handleRemoveLink,
              title: "ADelete this Link?",
              buttonText: "Delete Link",
              description:
                "Are you sure to delete this Link from your link collection?",
            })
          }
        >
          Remove
        </span>
      </span>

      <div className="py-3 w-full flex flex-col gap-3">
        <LinkType
          index={props.index}
          setOpen={setOptionOpen}
          isOpen={optionOpen}
          platData={platData}
          currentPlat={currentPlat}
          setCurrentPlat={setCurrentPlat}
          onChange={props.handleUpdatePlatform}
        />
        <InputLink
          value={linkd}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            // e.preventDefault();
            setLinkd(e.target.value);
          }}
        />
        {/* <div className="w-full p-2 border-t flex justify-end align-center">
          <button
            onClick={() =>
              props.handleSaveSingleLink(props.link.id, props.index)
            }
            className="w-full h-[46px] text-[16px] rounded-xl cursor-pointer font-semibold text-white bg-[#633CFF] hover:border-none hover:bg-[#1b84ed] hover:shadow-md hover:shadow-[#633CFF] m-0"
          >
            Save
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SingleLink;
