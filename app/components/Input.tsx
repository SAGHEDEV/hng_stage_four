import { BiSolidLock } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { ChangeEvent } from "react";
import { FaLink } from "react-icons/fa";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

const handleCapitalize = (data: string) => {
  return (
    String(data || "")
      ?.charAt(0)
      ?.toUpperCase() + String(data || "")?.slice(1)
  );
};

interface InputProps {
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon: typeof BiSolidLock;
  placeholder: string;
  error: string;
}

interface LinkProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
interface DropProps {
  index: number;
  setOpen: (value: boolean) => void;
  isOpen: boolean;
  platData: string[];
  currentPlat: string;
  setCurrentPlat: (plat: string) => void;
  onChange: (index: number, value: string) => void;
}

export const InputEmail = (props: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-[4px] text-[#333333] text-[12px] font-normal">
      <span className="text-[#333333]">{props.label}</span>

      <div className="relative text-[16px] bg-white !gap-[12px] px-[12px] py[16px]  rounded-xl !w-full md:!w-[396px] !h-[48px] !border !border-[#D9D9D9] focus-within:!border-[#633CFF] focus-within:!border-2 focus-within:!shadow-xl focus:bg-transparent focus:!shadow-[#633CFF]/25 ">
        {props.error !== "" ? (
          <span className="abolute top-1/2 right-4 w-full text-right">
            {props.error}
          </span>
        ) : (
          ""
        )}
        <span className="absolute top-1/2 -translate-y-1/2">
          <CgMail size={20} className="pointer-event-none" />
        </span>
        <input
          type="email"
          value={props.value}
          onChange={(e) => props.onChange(e)}
          placeholder={props.placeholder}
          className="pl-8 border-none bg-transparent focus:border-none focus:outline-none w-full h-full"
          required
        />
      </div>
    </div>
  );
};
export const InputPassword = (props: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-[4px] text-[#333333] text-[12px] font-normal">
      <span className="text-[#333333]">{props.label}</span>

      <div className="relative text-[16px] bg-white !gap-[12px] px-[12px] py[16px]  rounded-xl !w-full md:!w-[396px] !h-[48px] !border !border-[#D9D9D9] focus-within:!border-[#633CFF] focus-within:!border-2 focus-within:!shadow-xl focus:bg-transparent focus:!shadow-[#633CFF]/25 ">
        <span className="absolute top-1/2 -translate-y-1/2">
          <BiSolidLock size={20} className="pointer-event-none" />
        </span>
        <input
          type="password"
          value={props.value}
          onChange={(e) => props.onChange(e)}
          placeholder={props.placeholder}
          className="pl-8 border-none bg-transparent focus:border-none focus:outline-none w-full h-full"
          required
        />
        {props.error !== "" ? (
          <span className="abolute top-1/2 -translate-y-1/2 left-0 right-3 text-[10px] text-red-600">
            {props.error}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export const InputLink = (props: LinkProps) => {
  return (
    <div className="w-full flex flex-col gap-[4px] text-[#333333] text-[12px] font-normal">
      <span className="text-[#333333]">Link</span>

      <div className="w-full relative text-[16px] bg-white !gap-[12px] px-[16px] py[16px]  rounded-xl  !h-[48px] !border !border-[#D9D9D9] focus-within:!border-[#633CFF] focus-within:!border-2 focus-within:!shadow-xl focus:bg-transparent focus:!shadow-[#633CFF]/25 ">
        <span className="absolute top-1/2 -translate-y-1/2">
          <FaLink size={16} className="pointer-event-none" />
        </span>
        <input
          type="text"
          value={props.value}
          onChange={(e) => props.onChange(e)}
          placeholder="e.g. https://www.platform.com/johnappleseed"
          className="w-full pl-8 border-none bg-transparent focus:border-none focus:outline-none h-full"
          required
        />
      </div>
    </div>
  );
};

export const LinkType = (props: DropProps) => {
  return (
    <div className="w-full flex flex-col gap-[4px] text-[#333333] text-[12px] font-normal">
      <span className="text-[#333333]">Platform</span>

      <div className="relative text-[16px] bg-white px-[16px] cursor-pointer  rounded-xl !w-full !h-[48px] !border !border-[#D9D9D9] focus-within:!border-[#633CFF] focus-within:!border-2 focus-within:!shadow-xl focus:bg-transparent focus:!shadow-[#633CFF]/25 ">
        <span className="absolute top-1/2 -translate-y-1/2">
          {props.platData?.map((plat: string) => {
            if (plat === props.currentPlat) {
              return "P";
            }
          })}
        </span>
        <div className=" w-full h-full flex justify-center items-center ">
          <button
            className="w-full  pl-8 h-full   flex justify-between items-center  text-[16px] font-normal "
            onClick={() => props.setOpen(!props.isOpen)}
          >
            {props.platData?.map((plat: string) => {
              if (plat === props.currentPlat) {
                return handleCapitalize(plat);
              }
            })}
            {!props.isOpen ? (
              <MdOutlineArrowDropDown size={15} />
            ) : (
              <MdOutlineArrowDropUp size={15} />
            )}
          </button>

          {props.isOpen ? (
            <div className="w-full flex justify-center items-center flex-col bg-white mt-56 absolute gap-2 shadow-lg z-10 rounded-lg">
              {props.platData.map((plat) => (
                <span
                  key={plat}
                  className="w-full h-[48px] text-[16px] flex justify-start gap-4 items-center px-3 rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    props.setOpen(false);
                    props.setCurrentPlat(plat);
                    props.onChange(props.index, plat);
                  }}
                >
                  {handleCapitalize(plat)}
                </span>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
