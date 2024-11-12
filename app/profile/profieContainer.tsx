"use client";

import React, { useState } from "react";
import { Upload, Image, notification, Button } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firbase";
import { InputText, InputEmail, InputPassword } from "../components/Input";
import { FaCircleUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { BiSolidLock } from "react-icons/bi";
import { useRouter } from "next/navigation";
import {
  updatePassword,
  User,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";

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
  const [newPassword, setNewPassword] = useState({
    oldPassword: "",
    password: "",
    error: "",
    loading: false,
  });
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();
  const [imagePreview, setImagePreview] = useState<string | null | undefined>(
    user?.photoURL || ""
  );

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        router.push("/");
        notification.success({
          message: "Log out successful!",
          description: "Kindly Login to proceed!",
        });
      })
      .catch(() => {
        notification.error({
          message: "An error occurred, try again!",
        });
      });
  };

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

  const handleUpdatePassword = async (
    password: string,
    currentPassword: string
  ) => {
    // Check password length before re-authenticating
    if (password.length < 8) {
      setNewPassword({
        ...newPassword,
        error: "Password must not be less than 8 characters",
      });
      return; // Exit early if the password is too short
    }

    // Set loading state to true
    setNewPassword({
      ...newPassword,
      loading: true,
    });

    try {
      // Get the credential with the user's current password
      const credential = EmailAuthProvider.credential(
        user?.email as string,
        currentPassword
      );

      // Re-authenticate the user
      const response = await reauthenticateWithCredential(
        user as User,
        credential
      );
      console.log(response);

      // Now that the user is re-authenticated, update the password
      await updatePassword(user as User, password);
      api.success({
        message: "Password updated successfully!",
      });
      setNewPassword({
        ...newPassword,
        oldPassword: "",
        password: "",
      });
    } catch (error: any) {
      if (error.code === "auth/wrong-password") {
        api.error({
          message: "Incorrect current password!",
          description: "Please check your current password and try again.",
        });
      } else {
        api.error({
          message: "An error occurred while updating your password!",
          description: "Please try again later.",
        });
      }
    } finally {
      // Reset loading state
      setNewPassword({
        ...newPassword,
        loading: false,
      });
    }
  };

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
      <div className="p-8 bg-[#FAFAFA] w-full flex flex-col justify-center items-center gap-4 mt-6">
        <h2 className="text-[32px] text-left w-full font-bold text-[#333333] mb-2">
          Update Password
        </h2>

        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#333333] w-full">Old Password: *</p>
          <InputPassword
            icon={BiSolidLock}
            placeholder="Enter Old password"
            value={newPassword.oldPassword}
            onChange={(e) =>
              setNewPassword({ ...newPassword, oldPassword: e.target.value })
            }
          />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#333333] w-full">New Password: *</p>
          <InputPassword
            error={newPassword.error}
            icon={BiSolidLock}
            placeholder="Enter new password"
            value={newPassword.password}
            onChange={(e) =>
              setNewPassword({ ...newPassword, password: e.target.value })
            }
          />
        </div>
        <div className="w-full p-6 border-t flex justify-end align-center mt-10">
          <Button
            loading={newPassword.loading}
            className="w-fit !h-[46px] text-[16px] rounded-xl font-semibold !text-white !bg-[#633CFF] hover:!border-none hover:!bg-[#1b84ed] hover:!shadow-md hover:!shadow-[#633CFF] !m-0"
            onClick={() =>
              handleUpdatePassword(
                newPassword.password,
                newPassword.oldPassword
              )
            }
          >
            Update Password
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center p-8 border broder-[#633CFF] rounded-xl mt-10 gap-7">
        <Button className="w-full !h-[46px] text-[16px] rounded-xl font-bold !text-white !bg-red-700 hover:!border-none hover:!bg-red-700 hover:!shadow-md hover:!red-500 !m-0">
          Delete Account
        </Button>
        <Button
          onClick={handleSignOut}
          className="w-full !h-[46px] text-[16px] rounded-xl font-bold border !border-[#633CFF] !bg-white !text-[#633CFF] hover:!border-none hover:!bg-[#1b84ed] hover:!shadow-md hover:!shadow-[#633CFF] !m-0 hover:!text-white"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileContainer;
