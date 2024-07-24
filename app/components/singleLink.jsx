"use client"

import { useState } from "react";
import { LinkType } from "./Input";


const SingleLink = () => {
  const [optionOpen, setOptionOpen] = useState(false)

  const platData = [
    {
      platform: "Github",
      color: "black"
    },
    {
      platform: "Youtube",
      color: "red"
    },
    {
      platform: "Facebook",
      color: "blue"
    },
  ]
  return (
    <div className="p-5 rounded-xl bg-[#FAFAFA] flex flex-col justify-center items-center">
      <span className="w-full flex justify-between items-center text-[16px] text-[#737373]">
        <span className="font-bold">Link #1</span> <span className="cursor-pointer">Remove</span>
      </span>
      <div className ="py-3 w-full">
<LinkType setOpen={setOptionOpen} isOpen={optionOpen} platData={platData}/>
      </div>
    </div>
  );
};

export default SingleLink;
