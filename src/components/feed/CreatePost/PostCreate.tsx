import React, { useEffect, useRef, useState } from "react";
import { BsFillPersonFill, BsPersonExclamation } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaBold, FaItalic, FaListUl, FaPoll, FaRegFileAlt, FaViadeo } from "react-icons/fa";
import { TbAbc, TbEyeSearch, TbPhotoPlus } from "react-icons/tb";
import { Dialog, Transition } from "@headlessui/react";
import { PaintRollerIcon } from "lucide-react";

function PostCreate() {
  const [step, setStep] = useState("upload");
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const fileInputRef = useRef(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isList, setIsList] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const textRef = useRef(null);
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const docInputRef = useRef(null);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [taggedPeople, setTaggedPeople] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [privacy, setPrivacy] = useState("followers");
  const [selectedPeople, setSelectedPeople] = useState([]);
const [showTagPeopleDialog, setShowTagPeopleDialog] = useState(false);
const [showTagSearch, setShowTagSearch] = useState(false);
const [tagSearch, setTagSearch] = useState("");
const [tagSuggestions, setTagSuggestions] = useState([]);
const [imageTags, setImageTags] = useState([]);
const [currentTagPosition, setCurrentTagPosition] = useState({ x: 0, y: 0 });
const imageRef = useRef(null);
const tagSearchRef = useRef(null);
const [pollOpen, setPollOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
   const [allowMultiple, setAllowMultiple] = useState(false);
const modalRef = useRef();

useEffect(() => {
  function handleClickOutside(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setStep(null); // Or setStep("previousStep") as per your flow
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

   



   const handleAddOption = () => setOptions(prev => [...prev, ""]);
  const handleOptionChange = (i, value) => {
    const copy = [...options];
    copy[i] = value;
    setOptions(copy);
  };


  // const handleCreatePoll = () => {
  //   console.log("Question:", question);
  //   console.log("Options:", options);
  //   console.log("Allow multiple:", allowMultiple);
  //   setPollOpen(false);
  // };

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      tagSearchRef.current &&
      !tagSearchRef.current.contains(event.target)
    ) {
      setShowTagSearch(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

const handleImageClick = (e) => {
  if (!showTagPeopleDialog) return;

  const rect = imageRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  setCurrentTagPosition({ x, y });
  setShowTagSearch(true);
};


const removeTag = (personName) => {
  setImageTags((prev) =>
    prev.filter((tag) => tag.person.name !== personName)
  );
};


  // const people1 = ["john_doe", "jane_smith", "alex99", "emma_watson"];
  const [suggestions] = useState([
    "#React",
    "#JavaScript",
    "#TailwindCSS",
    "#OpenAI",
    "#Frontend",
    "#WebDev",
  ]);

  // const addTag = (person) => {
  //   if (!taggedPeople.includes(person)) {
  //     setTaggedPeople([...taggedPeople, person]);
  //   }
  // };



  
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const words = value.split(" ");
    const lastWord = words[words.length - 1];
    if (lastWord.startsWith("#")) {
      const filteredSuggestions = suggestions.filter((s) =>
        s.toLowerCase().startsWith(lastWord.toLowerCase())
      );
      setFiltered(filteredSuggestions);
    } else {
      setFiltered([]);
    }
  };

  const handleSelect = (tag) => {
    const words = inputValue.split(" ");
    words[words.length - 1] = tag;
    setInputValue(words.join(" ") + " ");
    setFiltered([]);
  };

  const toggleBold = () => setIsBold(!isBold);
  const toggleItalic = () => setIsItalic(!isItalic);
  const toggleList = () => setIsList(!isList);
  const toggleUppercase = () => setIsUppercase(!isUppercase);

  const handleClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setStep("preview");
    }
  };

  const handleShare = () => {
    console.log("Post shared with caption:", caption);
    alert("Post shared!");
    setStep("upload");
    setSelectedImage(null);
    setCaption("");
  };

  const handleDiscard = () => {
    setSelectedImage(null);
    setCaption("");
    setStep("upload");
    setShowDiscardModal(false);
  };

  const renderDiscardModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 text-center shadow-xl">
        <h3 className="text-lg font-semibold mb-2">Discard post?</h3>
        <p className="text-sm text-gray-500 mb-4">
          If you leave, your edits won’t be saved.
        </p>
        <div className="flex justify-around">
          <button onClick={handleDiscard} className="text-red-500 font-medium">
            Discard
          </button>
          <button onClick={() => setShowDiscardModal(false)} className="text-gray-700 font-medium">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

    const  people = [
    { id: 1, name: "imkr", title: "Follows you", img: "/Hide.jpg" },
    { id: 2, name: "organic__ai", title: "Followed by xhingg_singh07", img: "/Hide1.jpg" },
    { id: 3, name: "im_gr", title: "Followed by xhingg_singh07", img: "/Hide2.jpg" },
    { id: 4, name: "abhi52", title: "Follows you", img: "/Hide3.jpg" },
    { id: 5, name: "soktri", title: "Follows you", img: "/Hide.jpg" },
     { id: 1, name: "imkr", title: "Follows you", img: "/Hide.jpg" },
    { id: 2, name: "organic__ai", title: "Followed by xhingg_singh07", img: "/Hide1.jpg" },
    { id: 3, name: "im_gr", title: "Followed by xhingg_singh07", img: "/Hide2.jpg" },
    { id: 4, name: "abhi52", title: "Follows you", img: "/Hide3.jpg" },
    { id: 5, name: "soktri", title: "Follows you", img: "/Hide.jpg" },
  ];
 const handleContinuePrivacy = () => {
    setShowPrivacyDialog(false);
  };

  const togglePerson = (name) => {
    setSelectedPeople((prev) =>
      prev.includes(name)
        ? prev.filter((p) => p !== name)
        : [...prev,name]
    );
  };
  
     const filteredPeople = people.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );




  const handleCreatePoll = () => {
  const pollText = `📊 Poll: ${question}\n` + options.map((opt, i) => `${i + 1}. ${opt}`).join('\n');
  setInputValue((prev) => prev + (prev ? '\n\n' : '') + pollText);
  setPollOpen(false);
};

const onBack = () => {
  setStep("preview");
};


  return (
    <>
    {step === "upload" && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div ref={modalRef} className="bg-white rounded-xl shadow-lg p-6 w-96 h-[300px] text-center">
      <h2 className="text-lg font-semibold mb-4">Create new post</h2>
      <div className="flex flex-col items-center justify-center gap-4 py-6 border-dashed border-2 border-gray-300 rounded-xl">
        <img src="/postcreation.png" alt="Upload" className="w-16 h-16 opacity-60" />
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Select from computer
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  </div>
)}


      {step === "preview" && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[400px] text-center overflow-hidden">
            <div className="flex items-center justify-between border-b px-4 py-2">
              <button onClick={() => setShowDiscardModal(true)} className="text-xl">&larr;</button>
              <h2 className="text-md font-semibold">Crop</h2>
              <button onClick={() => setStep("caption")} className="text-blue-500 text-sm font-medium">Next</button>
            </div>
            <div className="flex items-center justify-center h-[400px] w-full">
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="h-[400px] object-cover w-full" />
            </div>
          </div>
        </div>
      )}

      {step === "caption" && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div>
            <div className="border-b flex items-center bg-white justify-between rounded-t-xl px-4 py-2">
              <button onClick={onBack} className="text-xl">&larr;</button>
              <h2 className="text-md font-semibold">Create new post</h2>
              <button onClick={handleShare} className="text-blue-500 font-medium text-sm">Post</button>
            </div>
            <div className="bg-white rounded-b-xl shadow-lg w-[750px] flex overflow-hidden">
              {/* <div className="h-[400px] w-1/2">
                <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="object-cover h-full w-full" />
              </div> */}
              <div className="relative h-[400px] w-1/2" onClick={handleImageClick}>
  <img
    ref={imageRef}
    src={URL.createObjectURL(selectedImage)}
    alt="Preview"
    className="object-cover h-full w-full"
  />

  {/* Render tags on image */}
{imageTags.map((tag, idx) => (
  <div
    key={idx}
    className="absolute bg-black text-white text-xs rounded px-2 py-1 mt-20 ml-20"
    style={{ top: tag.y, left: tag.x }}
  >
    @{tag.person.name}
    <button
      onClick={() =>  removeTag(tag.person.name)}
      className="ml-2 text-red-400 hover:text-red-600"
    >
      ✕
    </button>
  </div>
))}

</div>
              <div className="w-1/2 flex flex-col justify-between">
                <div className="flex flex-col px-4 py-2 flex-grow overflow-y-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <p className="font-semibold text-sm">_back2154</p>
                  </div>
                  <div className="flex text-black gap-4 items-center text-gray-700 border border-gray-200 rounded-t-xl px-3 mt-4 py-1">
                    <button onClick={toggleBold} className={isBold ? "text-blue-500" : ""}><FaBold /></button>
                    <button onClick={toggleItalic} className={isItalic ? "text-blue-500" : ""}><FaItalic /></button>
                    <button onClick={toggleList} className={isList ? "text-blue-500" : ""}><FaListUl /></button>
                    <button onClick={toggleUppercase} className={isUppercase ? "text-blue-500" : ""}><TbAbc /></button>
                  </div>
                  <textarea
                    ref={textRef}
                    maxLength={2200}
                    value={inputValue}
                    onChange={handleChange}
                    className={`border border-gray-300 rounded-b-xl p-4 min-h-[100px]  focus:outline-none ${isBold ? "font-bold" : ""} ${isItalic ? "italic" : ""} ${isUppercase ? "uppercase" : ""}`}
                  />
                  {filtered.length > 0 && (
                    <div className="absolute bg-white border border-gray-200 rounded shadow-md w-full mt-1 z-10">
                      {filtered.map((tag, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelect(tag)}
                          className="px-3 py-1 text-xs cursor-pointer hover:bg-gray-100"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between mt-4">
                    {["Photo", "Video", "Doc", "Poll"].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          if (type === "Photo") photoInputRef.current?.click();
                          else if (type === "Video") videoInputRef.current?.click();
                          else if (type === "Doc") docInputRef.current?.click();
                          else if (type === "Poll")setPollOpen(true);
                        }}
                        className="border border-gray-200 text-xs w-[80px] py-1 flex items-center justify-center gap-1 text-gray-700 hover:text-blue-600"
                      >
                    {type}   {type === "Photo" && <TbPhotoPlus className="text-base"/>}
                       {type === "Video" && <FaViadeo className="text-base"/>}
                       {type === "Doc" && <FaRegFileAlt className="text-base"/>}
                       {type === "Poll" && <FaPoll className="text-base"/>}

                      </button>
                    ))}
                  </div>
                  <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                  <input ref={docInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                  <div className="mt-10 space-y-4 text-sm text-gray-600">
                    {/* <div className="flex items-center justify-between cursor-pointer">
                      <span>Add location</span>
                      <span><CiLocationOn /></span>
                    </div> */}
                <button
  onClick={() =>setShowTagSearch(true)}
  className="flex items-center justify-between w-full text-sm text-gray-800 cursor-pointer"
>
  <span>Tag People</span>
  <BsPersonExclamation />
</button>
  <button
    onClick={() => setShowPrivacyDialog(true)}
    className="flex items-center justify-between w-full text-sm text-gray-800 cursor-pointer"
  >
    <span>Post Privacy</span>
    <TbEyeSearch />
  </button>
                    <div className="mt-20   flex items-center justify-between cursor-pointer">
                      <span className="text-blue-500">Boost Visibility</span>
                      <span className="text-blue-500"><BsFillPersonFill /></span>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {showDiscardModal && renderDiscardModal()}
      {/* Post Privacy Dialog */}
  {showPrivacyDialog && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[400px] p-6 shadow-xl">
      <h2 className="text-lg text-center font-semibold mb-4">Post Privacy</h2>

      {/* Privacy Options */}
      <div className="space-y-3 mb-4">
        {["public", "followers"].map((option) => (
          <label key={option} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="privacy"
              value={option}
              checked={privacy === option}
              onChange={(e) => setPrivacy(e.target.value)}
            />
            {option === "public" ? "Public" : "Only Followers"}
          </label>
        ))}
      </div>

      {/* Conditional Search + People List */}
      {privacy === "followers" && (
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
                className="flex items-center text-black justify-between cursor-pointer px-2"
              >
                <div className="flex items-center gap-2">
                  <img src={person.img} alt="avatar" className="h-8 w-8 rounded-full" />
                  <h1 className="text-sm">{person.name}</h1>
                </div>
                <input
                  type="checkbox"
                  checked={selectedPeople.includes(person.name)}
                  onChange={() => togglePerson(person.name)}
                />
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
  </div>
)}

{/* tag peoples */}
{showTagSearch && (

    <div className="absolute bg-white border rounded-xl shadow w-64 z-50  bg-black/40  bottom-4 ml-[500px]"
     ref={tagSearchRef}>
    <h1 className="text-center my-4 font-semibold">Tag Peoples</h1>
    <input
      autoFocus
      type="text"
      placeholder="Search user"
      className=" pl-3 w-60 rounded-xl py-2 border-b focus:outline-none border border-gray-400 mx-2"
      value={tagSearch}
      onChange={(e) => {
        setTagSearch(e.target.value);
        setTagSuggestions(
          people.filter((p) =>
            p.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      }}
    />
    <div className="max-h-40 overflow-y-auto scrollbar-hide">
      {tagSuggestions.map((person) => (
        <div
          key={person.name}
          onClick={() => {
            setImageTags([
              ...imageTags,
              { ...currentTagPosition, person },
            ]);
            setShowTagSearch(false);
            setTagSearch("");
          }}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
        >
          <img src={person.img} alt="avatar" className="w-6 h-6 rounded-full" />
          <span className="text-sm">{person.name}</span>
        </div>
      ))}
    </div>
  </div>
)}



{/* For poll */}
{pollOpen && (
  <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
    <div className="bg-white dark:glass-bg-dark dark:text-white rounded-xl p-6 w-full max-w-md relative">
      <h2 className="text-lg font-bold mb-4">Create a Poll</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question..."
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            placeholder={`Option ${idx + 1}`}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        ))}
        <button
          onClick={handleAddOption}
          className="text-blue-600 text-sm hover:underline self-start"
        >
          + Add Option
        </button>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={allowMultiple}
            onChange={(e) => setAllowMultiple(e.target.checked)}
          />
          Allow multiple answers
        </label>
        <button
          onClick={handleCreatePoll}
          className="bg-blue-600 text-white rounded px-4 py-2 w-full mt-2"
        >
          Create Poll
        </button>when i click this button this poll show me on inputarea
      </div>

      {/* Close button (optional) */}
      <button
        onClick={() => setPollOpen(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
      >
        ✕
      </button>
    </div>
  </div>
)}




    </>
  );
}

export default PostCreate;
