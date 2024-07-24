import { Button } from "antd";
import SingleLink from "./../components/singleLink";

const LinkContainer = () => {
  return (
    <div className="w-full p-[40px] rounded-xl bg-white">
      <div className="w-full">
        <h2 className="text-[32px] font-bold text-[#333333] mb-2">
          Customize your links
        </h2>
        <p className="text-[16px] font-normal mb-10">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button className="!h-[46px] !w-full text-[16px] !font-semibold !text-[#633CFF] !bg-white border !border-[#633CFF] hover:!bg-[#EFEBFF]  !m-0">
          + Add new link
        </Button>
      </div>
      <div className="my-6">
        <SingleLink/>
      </div>
    </div>
  );
};

export default LinkContainer;
