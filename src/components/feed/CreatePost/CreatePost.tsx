import React, { useRef, useState } from "react";
import {
  FaBold, FaItalic, FaListUl, FaViadeo, FaRegFileAlt, FaPoll,
  FaRegComment,
} from "react-icons/fa";
import { TbAbc, TbPhotoPlus, TbEyeSearch } from "react-icons/tb";
import { BsFillPersonFill, BsPersonExclamation } from "react-icons/bs";
import { SlArrowLeft } from "react-icons/sl";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import SavePostBadge from "@/components/ui/SavePostBadge";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [step, setStep] = useState("upload");
  const [inputValue, setInputValue] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isList, setIsList] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showTagSearch, setShowTagSearch] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [privacy, setPrivacy] = useState("public");
  const [selectedPeople, setSelectedPeople] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
  const textRef = useRef(null);
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const docInputRef = useRef(null);
  const [mediaPreview, setMediaPreview] = useState(null);


  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    setMediaPreview(url);
  }
};


  const handleDiscard = () => {
    setShowDiscardModal(false);
    setStep(""); // or navigate away/reset
  };

  const handleShare = () => {
    alert("Post shared!");
  };

  const togglePerson = (name) => {
    setSelectedPeople((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };



  const toggleBold = () => setIsBold(!isBold);
  const toggleItalic = () => setIsItalic(!isItalic);
  const toggleList = () => setIsList(!isList);
  const toggleUppercase = () => setIsUppercase(!isUppercase);

  const filteredPeople  = [
    { id: 1, name: "imkr", title: "Follows you", img: "/Hide.jpg" },
    {
      id: 2,
      name: "organic__ai",
      title: "Followed by xhingg_singh07",
      img: "/Hide1.jpg",
    },
    {
      id: 3,
      name: "im_gr",
      title: "Followed by xhingg_singh07",
      img: "/Hide2.jpg",
    },
    { id: 4, name: "abhi52", title: "Follows you", img: "/Hide3.jpg" },
    { id: 5, name: "soktri", title: "Follows you", img: "/Hide.jpg" },
    { id: 1, name: "imkr", title: "Follows you", img: "/Hide.jpg" },
    {
      id: 2,
      name: "organic__ai",
      title: "Followed by xhingg_singh07",
      img: "/Hide1.jpg",
    },
    {
      id: 3,
      name: "im_gr",
      title: "Followed by xhingg_singh07",
      img: "/Hide2.jpg",
    },
    { id: 4, name: "abhi52", title: "Follows you", img: "/Hide3.jpg" },
    { id: 5, name: "soktri", title: "Follows you", img: "/Hide.jpg" },
  ];

    const handleContinuePrivacy = () => {
    setShowPrivacyDialog(false);
  
  };

const navigate=useNavigate()
  return (
    <>
      {/* Upload Step */}
      {step === "upload" && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 max-md:static max-md:bg-transparent">
          <div className="w-[400px] flex flex-col bg-white rounded-xl  justify-between">
            <div className="border-b flex items-center justify-between px-4 py-2">
              <button
                onClick={() => setShowDiscardModal(true)}
                className="text-xl"
              >
                &larr;
              </button>
              <button onClick={handleShare} className="text-blue-500 text-sm">
                Post
              </button>
            </div>

            <div className="flex flex-col px-4 py-2 flex-grow overflow-y-auto">
              {/* Avatar + Username */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <p className="font-semibold text-sm">_back2154</p>
              </div>

              {/* Toolbar */}
              <div className="flex text-black gap-4 items-center text-gray-700 border border-gray-200 rounded-t-xl px-3 mt-4 py-1">
                <button onClick={toggleBold} className={isBold ? "text-blue-500" : ""}><FaBold /></button>
                <button onClick={toggleItalic} className={isItalic ? "text-blue-500" : ""}><FaItalic /></button>
                <button onClick={toggleList} className={isList ? "text-blue-500" : ""}><FaListUl /></button>
                <button onClick={toggleUppercase} className={isUppercase ? "text-blue-500" : ""}><TbAbc /></button>
              </div>

              {/* Textarea */}
              <textarea
                ref={textRef}
                maxLength={2200}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`border border-gray-300 rounded-b-xl p-4 min-h-[100px] focus:outline-none ${isBold ? "font-bold" : ""} ${isItalic ? "italic" : ""} ${isUppercase ? "uppercase" : ""}`}
              />

              {/* Media Buttons */}
              <div className="flex justify-between mt-4">
                {["Photo", "Video", "Doc", "Poll"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      if (type === "Photo") photoInputRef.current?.click();
                      else if (type === "Video") videoInputRef.current?.click();
                      else if (type === "Doc") docInputRef.current?.click();
                      else alert("Open poll modal");
                    }}
                    className="border border-gray-200 text-xs w-[80px] py-1 flex items-center justify-center gap-1 text-gray-700 hover:text-blue-600"
                  >
                    {type}
                    {type === "Photo" && <TbPhotoPlus />}
                    {type === "Video" && <FaViadeo />}
                    {type === "Doc" && <FaRegFileAlt />}
                    {type === "Poll" && <FaPoll />}
                  </button>
                ))}
              </div>

              {/* Hidden Inputs */}
              <input type="file" ref={photoInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={handleFileChange} />
              <input type="file" ref={docInputRef} className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />

              {/* Options */}
              <div className="mt-10 space-y-4 text-sm text-gray-600">
                <button onClick={() => setShowTagSearch(true)} className="flex items-center justify-between w-full cursor-pointer">
                  <span>Tag People</span><BsPersonExclamation />
                </button>
                <button onClick={() => setShowPrivacyDialog(true)} className="flex items-center justify-between w-full cursor-pointer">
                  <span>Post Privacy</span><TbEyeSearch />
                </button>
                <div className="mt-20 flex items-center justify-between cursor-pointer">
                  <span className="text-blue-500">Boost Visibility</span><BsFillPersonFill className="text-blue-500" />
                </div>
                <div className="flex justify-end gap-2">
                <button
  onClick={() => setStep("preview")}
  className="px-4 py-2 border border-gray-500 bg-white rounded-xl text-black"
>
  Preview
</button>

                  <button 
                  onClick={()=>navigate("/feed")}
                  className="px-4 py-2 border  border-blue-700 bg-blue-700 rounded-xl text-white">Continue</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}




      {/* privew */}
{step === "preview" && (
  <div className="fixed inset-0 bg-white z-50 flex items-center justify-center  max-md:static">
    <div className="w-[400px]  bg-white rounded-xl p-2 flex flex-col gap-4  overflow-y-auto">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b pb-2">
        <button onClick={() => setStep("upload")} className="text-gray-700">
          <SlArrowLeft />
        </button>
        <h2 className="text-sm font-semibold">Live Preview</h2>
        <span className="w-5" />
      </div>

 <div className="shadow-[0_0_10px_1px_rgba(0,0,0,0.3)] rounded-xl p-4 h-[550px]">
       {/* User Info */}
      <div className="flex items-center gap-2 mt-2 ">
        <img src="/Hide1.jpg" alt="profile" className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-semibold text-sm">_back2154</p>
          <p className="text-xs text-gray-500">Just now</p>
        </div>
      </div>

      {/* Caption */}
      <div className="text-sm text-gray-800 whitespace-pre-wrap mt-2">
        {inputValue || "No caption added."}
      </div>

      {/* Media Preview */}
      <div className="w-full  rounded-xl overflow-hidden bg-gray-100 mt-2 flex items-center justify-center">
        {/* {mediaPreview ? (
          <img
       
            src={mediaPreview}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-sm">No media uploaded</span>
        )} */}<img    src="/privewpost.png" className="w-full h-full object-cover"/>
      </div>

      {/* Action Icons */}
     <div className="flex justify-between items-center text-gray-600 text-lg border-t pt-4 mt-4">
  {/* Left Icons: Like, Comment, Send */}
  <div className="flex gap-3">
    <span className="shadow-md shadow-gray-400 rounded-full h-10 w-10 flex items-center justify-center text-xl">
      <IoMdHeartEmpty className="text-black" />
    </span>
    <span className="border border-gray-400 rounded-full h-10 w-10 flex items-center justify-center text-xl">
      <FaRegComment className="text-black" />
    </span>
    <span className="border border-gray-400 rounded-full h-10 w-10 flex items-center justify-center text-xl">
      <LuSend className="text-black" />
    </span>
  </div>

  {/* Save Icon (Right Side) */}
  <span className="border border-gray-400 rounded-full h-10 w-10 flex items-center justify-center text-xl">
    <SavePostBadge />
  </span>
</div>

 </div>
    </div>
  </div>
)}


      {/* Discard Modal */}
      {showDiscardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[300px] text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Exit</h2>
            <p className="text-sm text-gray-600 mb-6">
            You have unsaved changes. Would you like to save before exiting?
            </p>
            <div className="flex gap-2">
              <button
                 onClick={() => setShowDiscardModal(false)}
                className="w-full bg-red-100 text-red-600 border border-red-600 px-4 py-2 rounded-xl"
              >
                Discard
              </button>
                <button
                onClick={() => navigate("/feed")}
                className="bg-white w-full text-black border border-gray-500 px-4 py-2 rounded-xl "
              >
              Save & Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tag People Modal */}
      {showTagSearch && (
        <div className="fixed inset-0 bg-white z-50 p-6">
          <h2 className="text-lg font-semibold mb-4">Tag People</h2>
          <div className="space-y-2">
            {filteredPeople.map((person) => (
              <label key={person.name} className="flex items-center justify-between cursor-pointer px-2">
                <div className="flex items-center gap-2">
                  <img src={person.img} alt="avatar" className="h-8 w-8 rounded-full" />
                  <h1 className="text-sm">{person.name}</h1>
                </div>
                <input
                  type="checkbox"
                  checked={selectedPeople.includes(person.name)}
                  onChange={() => togglePerson(person.name)}
                  className="h-4 w-4 appearance-none border border-gray-300 rounded-sm checked:bg-gradient-to-r checked:from-purple-500 checked:to-blue-500 checked:border-none"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Modal */}
    {showPrivacyDialog && (
  <div className="fixed inset-0 bg-white z-50">
    {/* Header */}
    <div className="p-1 flex justify-between items-center w-full border-b border-gray-400">
      <button
  onClick={() => setShowPrivacyDialog(false)}
  className="flex items-center gap-2 text-sm text-gray-700"
><SlArrowLeft className="text-xl mt-1" /></button>
      <h2 className="text-lg font-semibold">Privacy</h2>
      <span className="w-6" />
    </div>

    {/* Radio Options */}
    <div className="space-y-3 mb-4 p-4">
      {["public", "Only followers", "Close Connections"].map((option) => (
        <label key={option} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="privacy"
            value={option}
            checked={privacy === option}
            onChange={(e) => setPrivacy(e.target.value)}
            className="hidden peer"
          />
          <span className="w-4 h-4 rounded-full border border-gray-400 peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-blue-500 peer-checked:border-none relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-white peer-checked:visible invisible" />
          </span>
          <span className="text-sm">
            {option === "public" ? "Public" : option}
          </span>
        </label>
      ))}
    </div>

    {/* Conditional Button for Public */}
    {privacy === "public" && (
      <button
        onClick={handleContinuePrivacy}
        className=" bg-blue-600 text-white w-full py-2 rounded-xl mt-5"
      >
        Continue
      </button>
    )}

    {/* Shared Component for Follower-based Options */}
    {(privacy === "Only followers" || privacy === "Close Connections") && (
      <>
        <input
          type="text"
          placeholder="Search for People"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-xl mb-4"
        />

        <div className="max-h-40 overflow-y-auto scrollbar-hide space-y-2">
          {filteredPeople.map((person) => (
            <label
              key={person.name}
              className="flex items-center text-black justify-between cursor-pointer px-2 py-1"
            >
              {/* Left: Avatar + Name */}
              <div className="flex items-center gap-2">
                <img
                  src={person.img}
                  alt="avatar"
                  className="h-8 w-8 rounded-full"
                />
                <h1 className="text-sm">{person.name}</h1>
              </div>

              {/* Right: Gradient Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPeople.includes(person.name)}
                  onChange={() => togglePerson(person.name)}
                  className="hidden peer"
                  id={`checkbox-${person.name}`}
                />
                <label
                  htmlFor={`checkbox-${person.name}`}
                  className="w-5 h-5 rounded border border-gray-400 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600 peer-checked:border-none flex items-center justify-center"
                >
                  {selectedPeople.includes(person.name) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </label>
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={handleContinuePrivacy}
          className="bg-blue-600 text-white w-full py-2 rounded-xl mt-5"
        >
          Continue
        </button>
      </>
    )}
  </div>
)}

    </>
  );
};

export default CreatePost;
