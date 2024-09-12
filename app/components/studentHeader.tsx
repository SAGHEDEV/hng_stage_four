import React from "react";
import { CiSettings } from "react-icons/ci";
import { RiNotification4Line } from "react-icons/ri";

const StudentHeader = () => {
  const registered = false;

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-[#606060] lg:py-5 lg:px-[100]">
      <div>Logo</div>
      <div>
        <div className="flex justify-center items-center gap-6 bg-[#FFF7F5] rounded-full p-2">
          <span className=" bg-[#FF502A] text-white font-medium cursor-pointer rounded-full px-3 py-[10px]">
            Students
          </span>
          <span className=" bg-transparent text-black font-medium cursor-pointer hover:underline rounded-full px-3 py-[10px]">
            Teachers
          </span>
          <span className=" bg-transparent text-black font-medium cursor-pointer hover:underline rounded-full px-3 py-[10px]">
            Parents
          </span>
        </div>
      </div>
      <div>
        {!registered ? (
          <div className="flex justify-center items-center gap-4">
            <span className="flex justify-center items-center p-[10px] rounded-md text-[#FF502A] bg-[#FFEEEA] cursor-pointer">
              <CiSettings size={20} />
            </span>
            <span className="cursor-pointer">
              <RiNotification4Line size={20} />
            </span>
            <span className="flex justify-center items-center text-md rounded-full bg-gray-100 text-black w-10 h-10 font-bold cursor-pointer">
              AB
            </span>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default StudentHeader;
