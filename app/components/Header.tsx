import React from "react";
import { MdArrowDownward } from "react-icons/md";

const Header = () => {
  const routes = [
    {
      key: "/",
      label: "For Learners",
    },
    {
      key: "/",
      label: "For Parents",
    },
    {
      key: "/",
      label: "For Teacher",
    },
    {
      key: "/",
      label: "Explore",
      children: {},
    },
  ];
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-[#606060] lg:py-5 lg:px-[100]">
      <div className="flex justify-start items-center gap-8">
        <div className="flex justify-start items-center gap-8">
          {routes.map((route) => (
            <div key={route.label} className="relative">
              <span className="text-base font-medium flex justify-center items-center gap-2">
                {route.label} {route.children ? <MdArrowDownward /> : ""}
              </span>
              {route.children ? <div></div> : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <button className="bg-transparent text-black w-[120px] py-2 px-4 text-sm font-medium rounded-md  hover:bg-[#f65835]/10 mr-2">
          Login
        </button>
        <button className="bg-[#FF502A] text-white w-[120px] py-[12px] px-[21px] text-sm font-medium rounded-md  hover:bg-[#f65835] ">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Header;
