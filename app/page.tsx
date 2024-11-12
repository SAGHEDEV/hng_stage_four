"use client";
import Image from "next/image";
import { Button } from "antd";
import { FaCircleArrowRight } from "react-icons/fa6";
import WelcomeHeader from "./components/welcomeHeader";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="p-6 md:px-16 scroll-smooth">
      <WelcomeHeader />
      <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-y-8 gap-x-16 py-4">
        <motion.div
          initial={{ top: -900 }}
          animate={{ top: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 flex flex-col gap-8 relative" // Added relative here
        >
          <motion.h2 className="text-5xl md:text-6xl font-bold">
            Share Your{" "}
            <span className="font-extrabold text-[#633CFF]">Universe</span> with{" "}
            <span className="font-extrabold text-[#633CFF]">One Link</span>
          </motion.h2>
          <p>
            Take control of your online identity with one powerful link! Whether
            you&apos;re a creator, entrepreneur, or tech enthusiast, our
            platform lets you gather all your important links in one place.
            Share your content, profiles, and projects effortlessly. Stay
            connected, stay relevant, and make an impact with just one click
          </p>
          <div>
            <Link href="/create-account">
              <Button className="w-[240px] relative group transition ease-in-out duration-1000 !h-[52px] text-[16px] !rounded-full !font-semibold !text-white !bg-[#633CFF] hover:border-none hover:!bg-[#633CFF] hover:!shadow-md hover:shadow-[#633CFF] !m-0 active:scale-95">
                Get Started
                <span className="p-3 rounded-full  absolute -right-12 bg-[#633CFF] transition ease-in-out duration-1000 flex justify-center items-center group-hover:right-0">
                  <FaCircleArrowRight size={20} />
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ right: -900 }}
          animate={{ right: 0 }}
          transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
          className="relative flex justify-center items-center w-full lg:w-1/2"
        >
          <Image
            src="/home_png_image.svg"
            alt="Share your links"
            width={800}
            height={700}
            className="top-1/2 left-1/2 transform"
          />
        </motion.div>
      </div>

      <div className="w-full flex flex-col-reverse lg:flex-row justify-between items-center mt-10 gap-y-8 gap-x-14">
        <div className="w-full lg:w-1/2">
          <Image
            src="/imac-screen.png"
            alt="Link Page"
            width={700}
            height={650}
          />
        </div>
        <div className="flex justify-center items-center flex-wrap w-full lg:w-1/2 gap-6">
          <div className="flex justify-center flex-row items-center flex-wrap w-full lg:!w-1/2 gap-4">
            <div className="w-[280px] p-5 rounded-md bg-black text-white text-center text-sm">
              Organize your links in one place.
            </div>
            <div className="w-[280px] p-5 rounded-md bg-[#1877f2] text-white text-center text-sm">
              Share all Link with oen Click
            </div>
            <div className="w-[280px] p-5 rounded-md bg-[#0a66c2] text-white text-center text-sm">
              Customizable for a personalized user experience.
            </div>
            <div className="w-[280px] p-5 rounded-md bg-[#5865f2] text-white text-center text-sm">
              Mobile-responsiveness for seamless access anywhere.
            </div>
            <div className="w-[280px] p-5 rounded-md bg-[#1877f2] text-white text-center text-sm">
              Increases traffic to key websites and platforms
            </div>
            <div className="w-[280px] p-5 rounded-md bg-[#25d366] text-white text-center text-sm ">
              Perfect piece for creators, influencers, and entrepreneurs.
            </div>

            <Link href="/create-account">
              <div className="w-[300px] p-5 rounded-md bg-[#633CFF] text-white text-center mt-5 animate-bounce hover:animate-none">
                Get Started Now!
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-32 text-center text-sm text-gray-700">
        Created with love by <strong>SAGHEDEV</strong>. CopyRight 2024.
      </div>
    </main>
  );
}
