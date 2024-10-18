"use client";

import React, { useState } from "react";
import { Upload, Image, notification, Button } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import { InputText, InputEmail } from "../components/Input";
import { FaCircleUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";

const ProfileContainer = ({
  handleUpdateProfile,
  loading,
}: {
  handleUpdateProfile: (file: File, name: string) => void;
  loading: boolean;
}) => {
  const [user] = useAuthState(auth);
  const [profilePic, setProfilePic] = useState<any>(user?.photoURL);
  const [userName, setUserName] = useState(user?.displayName);
  const [api, contextHolder] = notification.useNotification();
  const [imagePreview, setImagePreview] = useState<string | null | undefined>(
    user?.photoURL || ""
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const isLt2M = Number(file?.size) / 1024 / 1024 < 2;
    const isJpgOrPng =
      file?.type === "image/jpeg" || file?.type === "image/png";

    if (file && isLt2M && isJpgOrPng) {
      ``;
      setProfilePic(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      api.error({
        message: "Image size is not a in format 1024 by 1024",
      });
    }
  };

  // const handleClick = () => {
  //   handleUpdateProfile(profilePic, userName);
  // };

  return (
    <div className="w-full p-[40px] rounded-xl bg-white h-full">
      {contextHolder}
      <div className="w-full">
        <h2 className="text-[32px] font-bold text-[#333333] mb-2">
          Profile Details
        </h2>
        <p className="text-[16px] font-normal mb-10">
          Add your details to create a personal touch to your profile.
        </p>
      </div>
      <div className="p-8 bg-[#FAFAFA] flex justify-between gap-10 items-center flex-col md:flex-row rounded-lg">
        <p>Profile Picture:</p>

        <div className="flex justify-center items-center h-fit">
          <label
            htmlFor="image-upload"
            className="w-36 h-36 border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center cursor-pointer bg-[#EFEBFF]"
          >
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                className="object-cover w-full h-full rounded-lg"
                preview={false}
                width={146}
                height={146}
              />
            ) : (
              <span className="text-[#633CFF] text-sm font-bold flex flex-col justify-center items-center gap-2">
                <FaCloudUploadAlt size={20} /> Upload Profile
              </span>
            )}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <p className="text-xs">
          You can only upload a JPG or PNG image. <br /> Click the image upload
          icon to upload! <br /> Image must be in 1024 by 1024 size!
        </p>
      </div>

      <div className="p-8 bg-[#FAFAFA] w-full flex flex-col justify-center items-center gap-4 mt-6">
        <div className="flex flex-col justify-start items-start gap-4 w-full">
          <div className="w-full flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#333333] w-full">First Name: *</p>
            <InputText
              icon={FaCircleUser}
              placeholder="Enter Full Name"
              value={userName as string}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#333333] w-full">Email: *</p>
            <InputEmail
              error=""
              icon={MdEmail}
              placeholder="Enter Full Name"
              value={user?.email as string}
              onChange={(e) => console.log}
            />
          </div>
        </div>
      </div>

      <div className="w-full p-6 border-t flex justify-end align-center mt-10">
        <Button
          loading={loading}
          className="!w-[91px] !h-[46px] text-[16px] rounded-xl font-semibold !text-white !bg-[#633CFF] hover:!border-none hover:!bg-[#1b84ed] hover:!shadow-md hover:!shadow-[#633CFF] !m-0"
          onClick={() => handleUpdateProfile(profilePic, userName as string)}
          // disabled={links.length === 0}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ProfileContainer;
