"use client";

import { useEffect, useState } from "react";
import { LinkType, InputLink } from "./Input";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaYoutube, FaFacebook } from "react-icons/fa";
import { ChangeEvent } from "react";
import { Link } from "../home/linkContainer";

interface SingleLinkProp {
  link: Link;
  index: number;
  removeLink: (index: number) => void;
  handleUpadteUrl: (inded: number, value: string) => void;
  handleUpdatePlatform: (index: number, value: string) => void;
}

const SingleLink = (props: SingleLinkProp) => {
  const [optionOpen, setOptionOpen] = useState(false);
  const [currentPlat, setCurrentPlat] = useState(props.link.platform);
  const [linkd, setLinkd] = useState(props.link?.url);

  useEffect(() => {
    props.handleUpadteUrl(props.index, linkd);
  }, [setLinkd, linkd]);

  const platData = ["Facebook", "Github", "Youtube", "LinkedIn", "Twitter"];

  return (
    <div className="p-5 rounded-xl bg-[#FAFAFA] flex flex-col justify-center items-center">
      <span className="w-full flex justify-between items-center text-[16px] text-[#737373]">
        <span className="font-bold">Link #{props.index + 1}</span>
        <span
          className="cursor-pointer"
          onClick={() => props.removeLink(props.index)}
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
            e.preventDefault();
            setLinkd(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default SingleLink;
