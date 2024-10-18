import Link from "next/link";
import { Button } from "antd";
import { FaCircleArrowRight } from "react-icons/fa6";
import FrameContainer from "../components/frameContainer";

const WelcomeScreen = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] max-h-screen flex-col gap-7 overflow-hidden  ">
      <FrameContainer />
      <div>
        <h1 className="text-center text-[60px] font-bold text-black">
          Welcome to{" "}
          <span className="block text-[70px] !font-black text-yellow-400 ">
            Dev-Link
          </span>
        </h1>
        <p className="text-center max-w-[700px] mt-2 text-white text-sm">
          Discover, share, and explore valuable links effortlessly with our
          easy-to-use platform. Whether it&apos;s resources, articles, or media,
          our app lets you connect, collaborate, and stay updated with your
          favorite content in one place.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Link href="/create-account">
          <Button className="group w-[400px] ease-out duration-1000 !h-[52px] text-[18px] rounded-xl !font-semibold !text-white !bg-[#633CFF] hover:border-none hover:!bg-[#1b84ed] hover:!shadow-md hover:shadow-[#633CFF] !m-0 hover:gap-2">
            Get Started{" "}
            <FaCircleArrowRight
              size={22}
              className="group-hover:ml-3 ease-out duration-700"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeScreen;
