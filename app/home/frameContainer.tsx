import React from "react";
import Image from "next/image";

const FrameContainer = () => {
  return (
    <div className="hidden lg:block bg-white rounded-lg p-20">
      <div className="!w-[307px] !h-[631px] relative">
        <Image
          src="/rectangle-main.png"
          alt="frame-1"
          width={307}
          height={631}
          className="absolute top-0 bottom-0 left-0 right-0"
        />
        <Image
          src="/Subtractframe.png"
          alt="frame-1"
          width={285}
          height={611}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          "
        />
      </div>
    </div>
  );
};

export default FrameContainer;
