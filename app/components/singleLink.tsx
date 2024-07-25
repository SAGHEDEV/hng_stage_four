"use client";

import { useState } from "react";
import { LinkType, InputLink } from "./Input";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaYoutube, FaFacebook } from "react-icons/fa";
import { ChangeEvent } from "react";
import { Link } from "../home/linkContainer";

interface SingleLinkProp {
  link: Link;
  index: number;
  removeLink: (index: number) => void;
}

const SingleLink = (props: SingleLinkProp) => {
  const [optionOpen, setOptionOpen] = useState(false);
  const [currentPlat, setCurrentPlat] = useState({
    platform: "Github",
    color: "black",
    icon: TbBrandGithubFilled,
  });
  const [linkd, setLinkd] = useState(props.link?.url);

  const platData = [
    {
      platform: "Github",
      color: "black",
      icon: TbBrandGithubFilled,
    },
    {
      platform: "Youtube",
      color: "red",
      icon: FaYoutube,
    },
    {
      platform: "Facebook",
      color: "blue",
      icon: FaFacebook,
    },
  ];
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
          setOpen={setOptionOpen}
          isOpen={optionOpen}
          platData={platData}
          currentPlat={currentPlat}
          setCurrentPlat={setCurrentPlat}
        />
        <InputLink
          value={linkd}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLinkd(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default SingleLink;
