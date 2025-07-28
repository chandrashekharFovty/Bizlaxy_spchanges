import React, { useRef, useEffect, useState } from "react";
import { CiVideoOff, CiVideoOn } from "react-icons/ci";
import { IoIosMore, IoIosSend } from "react-icons/io";
import { IoMicOffOutline } from "react-icons/io5";
import { LuMessageCircleMore, LuMic } from "react-icons/lu";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useLocation, Link, useNavigate } from "react-router-dom";

import LinkIcon from "../../../public/link.png";

function VideoCall() {
  const location = useLocation();
  const user = location.state?.user;
  const localVideoRef = useRef(null);
  const [localStreamActive, setLocalStreamActive] = useState(false);

  const [messages, setMessages] = useState([
    {
      text: "Hello guys, we have discussed about post-corona vacation plan and our decision is to go to Bali. We will have a very big party after this corona ends! These are some images about our destination",
      from: "other",
      type: "text",
    },
    {
      type: "media",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      ],
    },
    {
      text: "That’s very nice place! You guys made a very good decision. Can’t wait to go on vacation!",
      from: "me",
      type: "text",
    },
  ]);
  const [message, setMessage] = useState("");

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const toggleMic = () => setIsMicOn((prev) => !prev);
  const toggleVideo = () => setIsVideoOn((prev) => !prev);

  const endCall = () => {
    console.log("Call ended");
    navigate("/message");
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { text: message.trim(), from: "me", type: "text" }]);
      setMessage("");
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          setLocalStreamActive(true);
        }
      })
      .catch((err) => {
        console.error("Error accessing media devices.", err);
        setLocalStreamActive(false);
      });
  }, []);

  const participants = [
    { id: 1, img: "https://i.pravatar.cc/400?img=1" },
    { id: 2, img: "https://i.pravatar.cc/400?img=2" },
    { id: 3, img: "https://i.pravatar.cc/400?img=3" },
    { id: 4, img: "https://i.pravatar.cc/400?img=4" },
    { id: 5, img: "https://i.pravatar.cc/400?img=5" },
    { id: 6, img: "https://i.pravatar.cc/400?img=6" },
    { id: 7, img: "https://i.pravatar.cc/400?img=7" },
    { id: 8, img: "https://i.pravatar.cc/400?img=8" },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-white">
      {/* Left: Video Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-[#65656580] m-2 sm:m-6 rounded-lg sm:rounded-xl">
          <Link to="/message" className="text-xl sm:text-2xl">&lt;</Link>
          <div className="text-center">
            <h2 className="text-base sm:text-lg font-semibold">Build_with_nine</h2>
            <p className="text-xs sm:text-sm">Ongoing Call – 9:32</p>
          </div>
          <div className="flex gap-3 sm:gap-4 text-lg sm:text-xl">
            <span>🔊</span>
            <span>⚙️</span>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-6 flex-1">
          {participants.map((p, index) => (
            <div key={index} className="rounded-lg sm:rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center aspect-video">
              {index === 0 && localStreamActive ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={p.img} alt="User" className="w-full h-full object-cover" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-center py-4 sm:py-6">
          <div className="flex gap-2 sm:gap-4 bg-black/40 px-4 sm:px-8 py-3 sm:py-4 rounded-full">
            <button className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full bg-[#65656580] hover:bg-gray-600">
              <LuMessageCircleMore className="text-lg sm:text-2xl" />
            </button>
            <button
              onClick={toggleVideo}
              className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full bg-[#65656580] hover:bg-gray-600"
            >
              {isVideoOn ? <CiVideoOn className="text-lg sm:text-2xl" /> : <CiVideoOff className="text-lg sm:text-2xl" />}
            </button>
            <button
              onClick={endCall}
              className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700"
            >
              📞
            </button>
            <button
              onClick={toggleMic}
              className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full bg-[#65656580] hover:bg-gray-600"
            >
              {isMicOn ? <LuMic className="text-lg sm:text-2xl" /> : <IoMicOffOutline className="text-lg sm:text-2xl" />}
            </button>
            <button className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full bg-[#65656580] hover:bg-gray-600">
              <IoIosMore />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Chat Section */}
      <div className="w-full lg:w-[320px] bg-[#2A2A2A] flex flex-col rounded-t-xl lg:rounded-xl overflow-hidden max-h-[40vh] lg:max-h-full">
        {/* User Info */}
        <div className="bg-[#4D4D4D] p-3 sm:p-4 flex items-center gap-3">
          <img
            src={user?.avatar || "https://i.pravatar.cc/40?img=10"}
            alt="User"
            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm sm:text-base">{user?.name || "Akash Retail"}</p>
            <p className="text-xs text-white">Active now</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 flex flex-col gap-3">
          {messages.map((msg, idx) => {
            if (msg.type === "media") {
              return (
                <div key={idx} className="flex gap-2">
                  {msg.images.map((img, i) => (
                    <img key={i} src={img} alt="media" className="w-16 sm:w-20 h-16 sm:h-20 rounded-lg object-cover" />
                  ))}
                </div>
              );
            }
            return (
              <div
                key={idx}
                className={`p-2 sm:p-3 rounded-xl text-xs sm:text-sm max-w-[80%] ${
                  msg.from === "me" ? "self-end bg-blue-600" : "bg-white text-black"
                }`}
              >
                {msg.text}
              </div>
            );
          })}
        </div>

        {/* Chat Input */}
        <div className="p-2 sm:p-3 bg-[#4D4D4D] flex items-center gap-2">
          {/* Emoji */}
          <div className="relative">
            <button onClick={() => setShowEmojis(!showEmojis)}>
              <MdOutlineEmojiEmotions className="text-lg sm:text-xl" />
            </button>
            {showEmojis && (
              <div className="absolute bottom-12 left-0 bg-[#DBDBDB] border rounded shadow p-2 flex gap-2">
                {["😀", "😁", "😂", "😍", "👍"].map((emoji) => (
                  <button
                    key={emoji}
                    className="text-xl sm:text-2xl"
                    onClick={() => {
                      setMessage((prev) => prev + emoji);
                      setShowEmojis(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 px-3 sm:px-4 py-2 rounded bg-[#4D4D4D] text-white text-xs sm:text-sm outline-none"
          />

          {/* Attachment */}
          <div className="relative">
            <button onClick={() => setShowPopup(!showPopup)}>
              <img src={LinkIcon} alt="attach" className="h-5 sm:h-6" />
            </button>
            {showPopup && (
              <div className="absolute bottom-12 right-0 bg-[#4D4D4D] border rounded shadow p-3 sm:p-4 w-40 sm:w-48 flex flex-col gap-2 sm:gap-3 z-50">
                <button className="hover:bg-[#4D4D4D] p-2 rounded text-xs sm:text-sm">📄 Document</button>
                <button className="hover:bg-[#4D4D4D] p-2 rounded text-xs sm:text-sm">👤 Contact</button>
                <button className="hover:bg-[#4D4D4D] p-2 rounded text-xs sm:text-sm">🖼️ Media File</button>
                <button className="hover:bg-[#4D4D4D] p-2 rounded text-xs sm:text-sm">📑 PDF</button>
              </div>
            )}
          </div>

          {/* Send */}
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white w-8 sm:w-9 h-8 sm:h-9 rounded-full flex items-center justify-center"
          >
            <IoIosSend className="w-3 sm:w-4 h-3 sm:h-4 -rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoCall;
