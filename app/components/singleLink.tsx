import { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { LinkType, InputLink } from "./Input";
import { Link } from "../links/linkContainer";

interface SingleLinkProp {
  link: Link;
  index: number;
  handleRemoveLink: (id: string) => void;
  handleUpadteUrl: (index: number, value: string) => void;
  handleUpdatePlatform: (index: number, value: string) => void;
}

// Debounce function to limit state updates
function useDebouncedEffect(effect: () => void, deps: any[], delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, [...deps, delay]);
}

const SingleLink = (props: SingleLinkProp) => {
  const [optionOpen, setOptionOpen] = useState(false);
  const [currentPlat, setCurrentPlat] = useState(props.link.platform);
  const [linkd, setLinkd] = useState(props.link?.url);

  // Sync internal state when the props.link changes but only if values are different
  useEffect(() => {
    if (props.link.url !== linkd) {
      setLinkd(props.link.url);
    }
    if (props.link.platform !== currentPlat) {
      setCurrentPlat(props.link.platform);
    }
  }, [props.link]);

  // Debounce updating the parent state to avoid multiple updates
  useDebouncedEffect(
    () => {
      props.handleUpadteUrl(props.index, linkd);
    },
    [linkd],
    300
  ); // Debounce with a delay of 300ms

  return (
    <div className="p-5 rounded-xl bg-[#FAFAFA] flex flex-col justify-center items-center">
      <span className="w-full flex justify-between items-center text-[16px] text-[#737373]">
        <span className="font-bold">Link #{props.index + 1}</span>
        <span
          onClick={() => {
            props.handleRemoveLink(props.link.id);
            console.log(props.link.id);
          }}
          className="cursor-pointer"
        >
          Remove
        </span>
      </span>

      <div className="py-3 w-full flex flex-col gap-3">
        <LinkType
          index={props.index}
          setOpen={setOptionOpen}
          isOpen={optionOpen}
          currentPlat={currentPlat}
          setCurrentPlat={setCurrentPlat}
          onChange={props.handleUpdatePlatform}
        />
        <InputLink
          value={linkd}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLinkd(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default SingleLink;
