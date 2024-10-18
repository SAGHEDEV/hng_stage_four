import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaDiscord } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa";
import { IconType } from "react-icons";
import { GrStatusUnknown } from "react-icons/gr";
import { Modal } from "antd";

interface HandleConfirmProps {
  data?: any;
  title?: string;
  action?: (data?: any) => void;
  buttonText: string;
  description?: string;
}

export const PlatformOutline: {
  [key: string]: { icon: IconType; color: string };
} = {
  facebook: {
    icon: FaFacebook,
    color: "#1877f2",
  },
  instagram: {
    icon: RiInstagramFill,
    color: "#c32aa3",
  },
  twitter: {
    icon: BsTwitterX,
    color: "#1da1f2",
  },
  youtube: {
    icon: FaYoutube,
    color: "#ff0000",
  },
  linkedin: {
    icon: FaLinkedin,
    color: "#0a66c2",
  },
  github: {
    icon: FaGithub,
    color: "#000000",
  },
  discord: {
    icon: FaDiscord,
    color: "#5865f2",
  },
  whatsapp: {
    icon: FaWhatsappSquare,
    color: "#25d366",
  },
  reddit: {
    icon: FaReddit,
    color: "#1877f2",
  },
  snapchat: {
    icon: FaSnapchat,
    color: "#fffc00",
  },
};

export const handleGetRightIconColor = (platform: string) => {
  const normalizedPlatform = platform.toLowerCase();

  if (PlatformOutline[normalizedPlatform]) {
    return PlatformOutline[normalizedPlatform];
  } else {
    return {
      icon: GrStatusUnknown,
      color: "#000000",
    };
  }
};
export const handleVerifyUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

// export const handleConfirm = ({
//   data,
//   title,
//   action,
//   buttonText,
//   description,
// }: HandleConfirmProps) => {
//   const onClose = Modal.destroyAll();

//   const handleAction = () => {
//     action?.(data);
//     Modal.destroyAll();
//   };

//   Modal.confirm({
//     icon: null,
//     closeIcon: false,
//     maskClosable: true,
//     title: title || "Delete from Table!",
//     className:
//       "md:!w-[500px] !rounded-lg !min-h-[350px] !relative !px-10 !py-4 !flex !flex-col !justify-center !items-center text-center",
//     content: description || "Are you sure to delete this item?",
//     onOk: handleAction,
//     onCancel: onClose,
//     okText: buttonText || "Delete from table",
//   });
// };
