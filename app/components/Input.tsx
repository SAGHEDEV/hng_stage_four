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
}

interface LinkProps {}
interface DropProps {
  setOpen: (value: boolean) => void;
  isOpen: boolean;
  platData: [{ platform: string; color: string }];
}

export const InputEmail = (props: InputProps) => {
  return (
    <div className="flex flex-col gap-[4px] text-[#333333] text-[12px] font-normal">
      <span className="text-[#333333]">{props.label}</span>

      <div className="relative text-[16px] bg-white !gap-[12px] px-[12px] py[16px]  rounded-xl !w-full md:!w-[396px] !h-[48px] !border !border-[#D9D9D9] focus-within:!border-[#633CFF] focus-within:!border-2 focus-within:!shadow-xl focus:bg-transparent focus:!shadow-[#633CFF]/25 ">
        <span className="absolute top-1/2 -translate-y-1/2">
          <CgMail size={20} className="pointer-event-none" />
        </span>
        <input
          type="email"
          value={props.value}
          onChange={(e) => props.onChange(e)}
          placeholder={props.placeholder}
          className="pl-8 border-none bg-transparent focus:border-none focus:outline-none w-full h-full"
        />
      </div>
    </div>
  );
};
export const InputPassword = (props: InputProps) => {
  return (
    <div className="flex flex-col gap-[4px] text-[#333333] text-[12px] font-normal">
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
        />
      </div>
    </div>
  );
};
// export const InputLink = (props: LinkProps) => {
//   return (
//     <div className="flex flex-col gap-[4px] text-[#333333] text-[12px] font-normal">
//       <span className="text-[#333333]">Link</span>

//       <div className="relative text-[16px] bg-white !gap-[12px] px-[12px] py[16px]  rounded-xl !w-full md:!w-[396px] !h-[48px] !border !border-[#D9D9D9] focus-within:!border-[#633CFF] focus-within:!border-2 focus-within:!shadow-xl focus:bg-transparent focus:!shadow-[#633CFF]/25 ">
//         <span className="absolute top-1/2 -translate-y-1/2">
//           <FaLink size={20} className="pointer-event-none" />
//         </span>
//         <input
//           type="password"
//           value={props.value}
//           onChange={(e) => props.onChange(e)}
//           placeholder="Enter Email Address"
//           className="pl-8 border-none bg-transparent focus:border-none focus:outline-none w-full h-full"
//         />
//       </div>
//     </div>
//   );
// };

export const LinkType = (props: DropProps) => {
  return (
    <div className="w-full flex flex-col gap-[4px] text-[#333333] text-[12px] font-normal">
      <span className="text-[#333333]">Paltform</span>

      <div className="relative text-[16px] bg-white px-[12px] cursor-pointer  rounded-xl !w-full !h-[48px] !border !border-[#D9D9D9] focus-within:!border-[#633CFF] focus-within:!border-2 focus-within:!shadow-xl focus:bg-transparent focus:!shadow-[#633CFF]/25 ">
        <span className="absolute top-1/2 -translate-y-1/2">
          <FaLink size={20} className="pointer-event-none" />
        </span>
        <div className="w-full h-full flex justify-center items-center">
          <button
            className="w-full  pl-8 h-full pt-1  flex justify-between items-center  text-[16px] font-normal "
            onClick={() => props.setOpen(!props.isOpen)}
          >
            {props.platData?.map((plat: { platform: string }) => {
              if (plat.platform === "Github") {
                return handleCapitalize(plat.platform);
              }
            })}
            {!props.isOpen ? (
              <MdOutlineArrowDropUp />
            ) : (
              <MdOutlineArrowDropDown />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
