import Sidebar from "../layout/Sidebar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../../../public/597c1a0608d2048cd158271a6827e10d00c1a6f0.png";
import img1 from "../../../public/profile1.png";

interface EditprofileProps {
  fullName: string;
  bio: string;
  website: string;
  profileImage: string;
  coverImage: string;
  email: string; // Added for private info
  phone: string; // Added for private info
}

const Editprofile: React.FC<EditprofileProps> = ({
  fullName,
  bio,
  website,
  profileImage,
  coverImage,
  email,
  phone,
}) => {
  const [selectedCover, setSelectedCover] = useState<string>(coverImage);
  const [selectedProfile, setSelectedProfile] = useState<string>(profileImage);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedCover(url);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedProfile(url);
    }
  };

  return (
    <>
      <div className="hidden md:block dark:dark-color">
        <Sidebar />
      </div>

      <div className="dark:dark-color mt-0 dark:text-white h-full flex flex-col xl:flex-row">
        {/* Left Main Section */}
        <div className="dark:dark-color w-full xl:w-[calc(100%-370px)] h-full flex flex-col max-md:ml-0 md:ml-[70px] lg:ml-[240px]">
          {/* Cover Image */}
          <div className="dark:dark-color w-full h-[350px] text-[#050505] font-bold pb-3">
            <img
              src={selectedCover}
              className="max-md:hidden aspect-[4.52] object-center bg-gradient-to-r from-purple-200 to-purple-400 w-full h-[240px]"
            />
            <img
              src={img1}
              className="xl:hidden aspect-[4.52] object-center bg-gradient-to-r from-purple-200 to-purple-400 w-full h-[200px]"
            />
            <div className="relative -mt-56 w-[700px] h-[250px]">
              <div className="flex flex-col text-white ml-2">
                <Link
                  to="/profile"
                  className="flex items-center text-sm text-white font-medium"
                >
                  <span className="text-xl max-md:text-xs mr-2">&lt;</span> Back to Profile
                </Link>
                <h1 className="mt-1 text-2xl font-bold max-md:text-lg">Edit Profile</h1>
              </div>
              <div className="dark:dark-color h-[34px] w-[148px] rounded-[6px] bg-black/30 max-md:ml-36 ml-[300px] mt-5 border border-transparent">
                <label
                  htmlFor="coverimage"
                  className="text-white  px-2 py-1 text-[14px] cursor-pointer block w-full h-full text-center"
                >
                  Edit Cover Image
                </label>
                <input type="file" id="coverimage" className="hidden" onChange={handleCoverChange} />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="dark:dark-color max-md:bottom-[80px] dark:border-none w-full bg-white z-10 flex flex-col items-center max-md:rounded-t-xl text-center justify-start border-solid border-l-2 border-[#f3f2fa] relative">
            {/* Profile image for mobile */}
            <div className="relative xl:hidden max-md:rounded-xl">
              <img
                src={selectedProfile || img}
                className="w-[150px] h-[150px] rounded-full max-md:mt-4 object-cover border-4 border-white shadow-md mx-auto"
              />
              <label htmlFor="profileimage">
                <div className="absolute bottom-[2rem] right-[calc(50%-60px)] bg-blue-500 border border-gray-300 rounded-full p-1 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    fill="white"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1zm9 3a4 4 0 100 8 4 4 0 000-8z"
                    />
                  </svg>
                </div>
              </label>
              <input type="file" id="profileimage" className="hidden" onChange={handleProfileChange} />
              <div>
                <span>Edit image</span>
              </div>
            </div>

            {/* Inputs */}
            <div className="text-center md:mt-4 mt-6 w-full px-6 border-r border-[#dfdede]">
              <form className="text-left w-[700px] max-md:w-[280px] space-y-4 pb-28">
                {/* Full Name */}
                <div>
                  <label className="dark:text-white block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Michael Roberts"
                    disabled={!isEditing}
                    className="dark:bg-[#181818] focus:outline-none dark:border-white dark:border dark:text-white w-full p-3 border border-[#BED6FF] rounded-xl text-sm"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="dark:text-white block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    placeholder="michael_roberts"
                    disabled={!isEditing}
                    className="dark:bg-[#181818] focus:outline-none dark:border-white dark:border dark:text-white w-full p-3 border border-[#BED6FF] rounded-xl text-sm"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="dark:text-white block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <input
                    type="text"
                    placeholder="Tell us about yourself"
                    disabled={!isEditing}
                    className="dark:bg-[#181818] focus:outline-none dark:border-white dark:border dark:text-white w-full p-3 border border-[#BED6FF] rounded-xl text-sm"
                  />
                </div>

                {/* Private Phone */}
                <div>
                  <label className="dark:text-white block text-sm font-medium text-gray-700 mb-1">Phone Number </label>
                  <input
                    type="text"
                    placeholder="+1 234 567 8900"
                    value={phone}
                    disabled={true}
                    className="dark:bg-[#181818]  focus:outline-none placeholder:text-gray-500 dark:border-white dark:border dark:text-white w-full p-3 border border-[#BED6FF] rounded-xl text-sm cursor-not-allowed"
                  />
                </div>

                {/* Private Email */}
                <div>
                  <label className="dark:text-white block text-sm font-medium text-gray-700 mb-1">Email </label>
                  <input
                    type="email"
                    placeholder="content@gmail.com"
                    value={email}
                    disabled={true}
                    className="dark:bg-[#181818] focus:outline-none placeholder:text-gray-500 dark:border-white dark:border dark:text-white w-full p-3 border border-[#BED6FF] rounded-xl text-sm cursor-not-allowed"
                  />
                </div>

                {/* Links */}
                <div>
                  <label className="dark:text-white block text-sm font-medium text-gray-700 mb-1">Add Links</label>
                  <input
                    type="text"
                    placeholder="https://yourwebsite.com"
                    disabled={!isEditing}
                    className="dark:bg-[#181818] focus:outline-none dark:border-white dark:border dark:text-white w-full p-3 border border-[#BED6FF] rounded-xl text-sm"
                  />
                </div>
              </form>
            </div>

            {/* Save Button (Mobile Only) */}
            <div className="dark:dark-color fixed bottom-0 p-4 bg-white left-0 right-0 flex justify-center px-4 xl:hidden">
              <button className="bg-blue-600 text-white w-full max-w-[500px] py-3 rounded-xl font-medium text-base shadow-md">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Fixed Sidebar */}
        <div className="dark:dark-color hidden xl:flex fixed right-0 top-0 h-screen max-w-[370px] w-full bg-white px-5 py-10 flex-col items-center text-center overflow-y-auto z-30">
          <div className="dark:dark-color relative w-[110px] h-[110px]">
            <img
              src={selectedProfile || img}
              alt="Profile"
              className="w-full h-full rounded-full object-cover shadow-md"
            />
            <input type="file" id="profileimage-upload" className="hidden" onChange={handleProfileChange} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-black">{fullName}</h2>
          <p className="mt-2 text-sm text-gray-600 leading-tight">
            Passionate about funding innovative startups. <br />
            Exploring new business opportunities.
          </p>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-[#1C4BC4] text-sm font-medium hover:underline"
          >
            www.nebulotech.com
          </a>

          <div className="mt-6 flex gap-4">
            {!isEditing ? (
              <button
                className="px-4 py-2 text-sm rounded-[8px] border border-gray-300 hover:bg-gray-100 font-medium"
                onClick={() => setIsEditing(true)}
              >
                Edit Details
              </button>
            ) : (
              <button
                className="px-4 py-2 text-sm rounded-[8px] border border-blue-500 bg-blue-100 font-medium text-blue-700"
                onClick={() => setIsEditing(false)}
              >
                Save Details
              </button>
            )}

            <label htmlFor="profileimage-upload" className="cursor-pointer">
              <div className="border border-gray-400 bg-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-gray-100">
                Edit Profile Image
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editprofile;
