import { Input, Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import {
  FaThumbsUp,
  FaComment,
  FaShare,
  FaExpand,
  FaRegComment,
  FaRegThumbsUp,
  FaWhatsapp,
} from "react-icons/fa";
import { Ellipsis, ExpandIcon, PauseCircle, PlayCircle } from "lucide-react";
import { Item } from "@radix-ui/react-accordion";
import { FiSend } from "react-icons/fi";
import { FollowButton, FollowButtonCard } from "../ui/FollowButton";
import { IoMdMore } from "react-icons/io";
import { PiCheckCircleFill, PiFastForwardCircleBold } from "react-icons/pi";
import { MdOutlineInsertLink } from "react-icons/md";
import { RiFacebookCircleLine } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { HiMiniArrowTurnUpRight } from "react-icons/hi2";
import { AiFillMuted } from "react-icons/ai";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import { SiYoutubemusic } from "react-icons/si";
import { BiVolumeMute } from "react-icons/bi";
import { VscUnmute } from "react-icons/vsc";
import { MdOutlinePlayCircleOutline } from "react-icons/md";


type Reply = {
  replyId: number;
  replyText: string;
  replylikes: number;
  replies: Reply[];
};

type Comment = {
  id: number;
  text: string;
  commentlikes: number;
  replies: Reply[];
};

type MediaItem = {
  id: number;
  type: "video" | "image" | "youtube";
  src: string;
  profile: string;
  description: string;
  likes: number;
  comments: Comment[];

  shares: number;
  user: {
    name: string;
    isVerified: boolean;
  };
};

const pitchMedia: MediaItem[] = [
  {
    id: 1,
    type: "video",
    src: "/insta_reel.mp4",
    profile: "/pitch.png",
    description:
      "⚡ We’re not waiting for the future—we’re creating it. Neoseland is building sustainable solutions that tackle tomorrow’s problems, starting right now.We’re not waiting for the future—we’re creating it. [Your Startup] is building sustainable solutions that tackle tomorrow’s problems, starting right now.",
    likes: 3000,
    comments: [
      {
        id: 1,
        text: "First comment!",
        commentlikes: 5,
        replies: [
          { replyId: 11, replyText: "Nice!", replylikes: 2, replies: [] },
        ],
      },
    ],
    shares: 50,
    user: { name: "Brian Turner", isVerified: true },
  },
  {
    id: 2,
    type: "image",
    src: "/pitch.png",
    profile: "/pitch.png",
    description:
      "🚀 Complex problems demand simple solutions. Our AI-driven framework abstracts away the noise, letting you focus on innovation—not integration.",
    likes: 2100,
    comments: [
      {
        id: 1,
        text: "First comment!",
        commentlikes: 5,
        replies: [
          { replyId: 11, replyText: "Nice!", replylikes: 2, replies: [] },
        ],
      },
    ],
    shares: 20,
    user: { name: "Brian Turner", isVerified: false },
  },
  {
    id: 3,
    type: "video",
    src: "/post_video.mp4",
    profile: "/pitch.png",
    description:
      "⚡ Our platform transforms visionary concepts into real-world impact. With cutting-edge tech and market-first features, we empower startups to leap high—and fast.",
    likes: 5000,
    comments: [
      {
        id: 1,
        text: "First comment!",
        commentlikes: 5,
        replies: [
          { replyId: 11, replyText: "Nice!", replylikes: 2, replies: [] },
        ],
      },
    ],
    shares: 60,
    user: { name: "Brian Turner", isVerified: true },
  },
  {
    id: 4,
    type: "image",
    src: "/pitch.png",
    profile: "/pitch.png",
    description:
      "🌿 We’re not waiting for the future—we’re creating it. [Your Startup] is building sustainable solutions that tackle tomorrow’s problems, starting right now.",
    likes: 1500,
    comments: [
      {
        id: 1,
        text: "First comment!",
        commentlikes: 5,
        replies: [
          { replyId: 11, replyText: "Nice!", replylikes: 2, replies: [] },
        ],
      },
    ],
    shares: 25,
    user: { name: "Brian Turner", isVerified: false },
  },
];

export default function MainContent() {
  const [mediaList, setMediaList] = useState<MediaItem[]>(pitchMedia);
  const [openIndex, setOpenIndex] = useState(null);
  const [openReplyIndex, setOpenReplyIndex] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [commentReplyInput, setCommentReplyInput] = useState("");
  // const [likedIds, setLikedIds] = useState([]);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [commentlikedIds, setCoemmentLikedIds] = useState<number[]>([]);
  const [replylikedIds, setReplyLikedIds] = useState<number[]>([]);
  const [animatingLikeIdx, setAnimatingLikeIdx] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [showMoreOptions, setShowMoreOptions] = useState(null);
  const [report, setReport] = useState(false);
  const [block, setBlock] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  

  // social media share links
  const shareUrl = "https://yourwebsite.com/eduvid"; // actual share link
  const shareText = "Check out this Eduvid!";

  const socialPlatforms = [
    {
      icon: <MdOutlineInsertLink />,
      label: "Copy Link",
      onClick: () => {
        navigator.clipboard.writeText(shareUrl);
        alert("Link copied! You can paste it anywhere.");
      },
    },
    {
      icon: <RiFacebookCircleLine />,
      label: "Facebook",
      onClick: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
      },
    },
    {
      icon: <BsChatDots />,
      label: "Messenger",
      onClick: () => {
        window.open(
          `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
      },
    },
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      onClick: () => {
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(
            shareText + " " + shareUrl
          )}`,
          "_blank"
        );
      },
    },
    {
      icon: <FaThreads />,
      label: "Threads",
      onClick: () => {
        window.open(
          `https://threads.net/intent/post?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
      },
    },
    {
      icon: <FaXTwitter />,
      label: "Twitter",
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
      },
    },
    {
      icon: <HiMiniArrowTurnUpRight />,
      label: "More",
      onClick: () => {
        if (navigator.share) {
          navigator
            .share({
              title: "Eduvid",
              text: shareText,
              url: shareUrl,
            })
            .catch((err) => console.log("Share failed:", err));
        } else {
          alert("Sharing not supported on this device.");
        }
      },
    },
  ];

  // Update arrow visibility
  const updateArrows = () => {
    const el = scrollRef.current;
    if (el) {
      setShowLeftArrow(el.scrollLeft > 0);
      setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows);
    return () => el.removeEventListener("scroll", updateArrows);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const users = [
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
    { id: 6, name: "imkr", title: "Follows you", img: "/Hide.jpg" },
    {
      id: 7,
      name: "organic__ai",
      title: "Followed by xhingg_singh07",
      img: "/Hide1.jpg",
    },
    {
      id: 8,
      name: "im_gr",
      title: "Followed by xhingg_singh07",
      img: "/Hide2.jpg",
    },
    { id: 9, name: "abhi52", title: "Follows you", img: "/Hide3.jpg" },
    { id: 10, name: "soktri", title: "Follows you", img: "/Hide.jpg" },
  ];

  const toggleLike = (id) => {
    setMediaList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              likes: likedIds.includes(id) ? item.likes - 1 : item.likes + 1,
            }
          : item
      )
    );
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const commenttoggleLike = (mediaId: number, commentId: number) => {
    setMediaList((prev) =>
      prev.map((item) =>
        item.id === mediaId
          ? {
              ...item,
              comments: item.comments.map((c) =>
                c.id === commentId
                  ? {
                      ...c,
                      commentlikes:
                        c.commentlikes +
                        (commentlikedIds.includes(commentId) ? -1 : +1),
                    }
                  : c
              ),
            }
          : item
      )
    );
    setCoemmentLikedIds((prev) =>
      prev.includes(commentId)
        ? prev.filter((x) => x !== commentId)
        : [...prev, commentId]
    );
  };
  const replytoggleLike = (
    mediaId: number,
    commentId: number,
    replyId: number
  ) => {
    setMediaList((prev) =>
      prev.map((item) =>
        item.id === mediaId
          ? {
              ...item,
              comments: item.comments.map((c) =>
                c.id === commentId
                  ? {
                      ...c,
                      replies: c.replies.map((r) =>
                        r.replyId === replyId
                          ? {
                              ...r,
                              replylikes:
                                r.replylikes +
                                (replylikedIds.includes(replyId) ? -1 : +1),
                            }
                          : r
                      ),
                    }
                  : c
              ),
            }
          : item
      )
    );
    setReplyLikedIds((prev) =>
      prev.includes(replyId)
        ? prev.filter((x) => x !== replyId)
        : [...prev, replyId]
    );
  };
  const handleDoubleClick = (id: number, idx: number) => {
    if (!likedIds.includes(id)) toggleLike(id);
    setAnimatingLikeIdx(idx);
    setTimeout(() => setAnimatingLikeIdx(null), 800);
  };
  const addComment = (mediaId) => {
    if (!commentInput.trim()) return;
    setMediaList((prev) =>
      prev.map((item) =>
        item.id === mediaId
          ? {
              ...item,
              comments: [
                ...item.comments,
                {
                  id: Date.now(),
                  text: commentInput,
                  commentlikes: 5,
                  replies: [],
                },
              ],
            }
          : item
      )
    );
    setCommentInput("");
  };
  const addCommentReply = (mediaId: number, commentIdx: number) => {
    if (!commentReplyInput.trim()) return;
    setMediaList((prev) =>
      prev.map((item) =>
        item.id === mediaId
          ? {
              ...item,
              comments: item.comments.map((c, i) =>
                i === commentIdx
                  ? {
                      ...c,
                      replies: [
                        ...c.replies,
                        {
                          replyId: Date.now(),
                          replyText: commentReplyInput,
                          replylikes: 5,
                          replies: [],
                        },
                      ],
                    }
                  : c
              ),
            }
          : item
      )
    );
    setCommentReplyInput("");
    setOpenReplyIndex(null);
  };

  function formatNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  }

  
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState<{ [key: number]: boolean }>({});
  const [muted, setMuted] = useState<{ [key: number]: boolean }>({});
  const [progress, setProgress] = useState<{ [key: number]: number }>({});
  const [showcontrils, setShowControls] = useState(false);
  
  const handleVideoToggle = (idx) => {
  const video = videoRefs.current[idx];
  if (!video) return;
  if (video.paused) {
    video.play();
    setPlaying(p => ({ ...p, [idx]: true }));
    setActiveVideo(idx);
  } else {
    video.pause();
    setPlaying(p => ({ ...p, [idx]: false }));
    setActiveVideo(null);
  }
  setShowControls(true);
};


 function togglePlay(idx) {
  const vid = videoRefs.current[idx];
  if (!vid) return;
  if (vid.paused) {
    vid.play();
    setPlaying(p => ({ ...p, [idx]: true }));
  } else {
    vid.pause();
    setPlaying(p => ({ ...p, [idx]: false }));
  }
  setShowControls(true);
}


  function seek(idx, amount) {
    const vid = videoRefs.current[idx];
    if (vid) vid.currentTime += amount;
  }

 function toggleMute(idx) {
  const vid = videoRefs.current[idx];
  if (vid) {
    vid.muted = !vid.muted;
    setMuted(m => ({ ...m, [idx]: vid.muted }));
  }
  setShowControls(true);
}
useEffect(() => {
  const initialMuted = {};
  pitchMedia.forEach((_, idx) => {
    const vid = videoRefs.current[idx];
    if (vid) {
      initialMuted[idx] = vid.muted;
    } else {
      initialMuted[idx] = false;
    }
  });
  setMuted(initialMuted);
}, []);


  function toggleFullscreen(idx) {
    const vid = videoRefs.current[idx];
    if (!vid) return;
    document.fullscreenElement
      ? document.exitFullscreen()
      : vid.requestFullscreen?.();
  }

  // function onTimeUpdate(idx: number) {
  //   const vid = videoRefs.current[idx];
  //   if (vid) {
  //     const pct = (vid.currentTime / vid.duration) * 100;
  //     setProgress((prev) => ({
  //       ...prev,
  //       [idx]: pct,
  //     }));
  //   }
  // }

  //   useEffect(() => {
  //   mediaList.forEach((_, idx) => {
  //     const vid = videoRefs.current[idx];
  //     if (!vid) return;
  //     const update = () => {
  //       setProgress(p => ({
  //         ...p,
  //         [idx]: (vid.currentTime / vid.duration) * 100
  //       }));
  //     };
  //     vid.addEventListener("timeupdate", update);
  //     return () => vid.removeEventListener("timeupdate", update);
  //   });
  // }, []);

  useEffect(() => {
    pitchMedia.forEach((media, idx) => {
      if (media.type !== 'video') return;
      const vid = videoRefs.current[idx];
      if (!vid) return;
      const onPlay = () => setPlaying((p) => ({ ...p, [idx]: true }));
      const onPause = () => setPlaying((p) => ({ ...p, [idx]: false }));
      const onTimeUpdate = () =>
        setProgress((p) => ({
          ...p,
          [idx]: (vid.currentTime / vid.duration) * 100,
        }));
      const update = () => {
        setProgress((p) => ({
          ...p,
          [idx]: (vid.currentTime / vid.duration) * 100,
        }));
      };
      vid.addEventListener("timeupdate", update);
      vid.addEventListener("play", onPlay);
      vid.addEventListener("pause", onPause);
      vid.addEventListener("timeupdate", onTimeUpdate);
      return () => {
        vid.removeEventListener("play", onPlay);
        vid.removeEventListener("pause", onPause);
        vid.removeEventListener("timeupdate", onTimeUpdate);
        vid.removeEventListener("timeupdate", update);
      };
    });
  }, []);

  return (
    <div className="dark:dark-color snap-y snap-mandatory max-md:w-screen max-lg:w-[35vw] h-[95vh] max-md:my-0 rounded-xl max-md:rounded-none min-w-[30vw] max-w-[550px] overflow-y-scroll scrollbar-hide">
      {mediaList.map((media, idx) => {
        const liked = likedIds.includes(media.id);
        const isAnimating = animatingLikeIdx === idx;
        return (
          <div
            key={media.id}
            onDoubleClick={() => handleDoubleClick(media.id, idx)}
            className="snap-start max-md:4 dark:bg-black max-md:w-screen max-lg:w-[35vw] h-[95vh] flex items-center justify-center relative text-white rounded-xl max-md:rounded-none"
          >
            {media.type === "image" ? (
              <img
                src={media.src}
                alt={media.user.name}
                className="absolute inset-0 w-full h-full object-cover rounded-xl max-md:rounded-none"
              />
            ) : (
              <video
                id={`video-${idx}`}
                src={media.src}
                autoPlay
                loop
                onClick={() => {
                  handleVideoToggle(idx), togglePlay(idx);
                }}
                ref={(el) => (videoRefs.current[idx] = el)}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer rounded-xl max-md:rounded-none"
              />
            )}
            {/*Controllers */}
            <div className={`absolute w-full top-1/2 opacity-0 hover:opacity-100 px-3 ${showcontrils ? "opacity-0" : "opacity-100"} transition-opacity`}>
              <div className="group flex justify-center gap-4 items-center">
                {/* <button
                  className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                  onClick={() => seek(idx, -10)}
                  type="button"
                  tabIndex={-1}
                >
                  <PiFastForwardCircleBold className="rotate-180" />
                </button> */}
                <button
                  className="bg-gray-800 cursor-pointer bg-opacity-50 text-white p-3 rounded-full"
                  onClick={() => togglePlay(idx)}
                  type="button"
                  tabIndex={-1}
                >
                   {playing[idx] ? <PauseCircle className="w-6 h-6"/> : <MdOutlinePlayCircleOutline className="w-6 h-6"/>
}
                </button>
                {/* <button
                  className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                  onClick={() => seek(idx, 10)}
                  type="button"
                  tabIndex={-1}
                >
                  <PiFastForwardCircleBold />
                </button> */}
                <button
                  className="bg-gray-800 bg-opacity-50 cursor-pointer text-white p-3 rounded-full"
                  onClick={() => toggleMute(idx)}
                  type="button"
                  tabIndex={-1}
                >
                 {muted[idx] ? <VscUnmute className="w-6 h-6"/>: <BiVolumeMute className="w-6 h-6"/>}
                </button>
                {/* <button
                  className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                  onClick={() => toggleFullscreen(idx)}
                  type="button"
                  tabIndex={-1}
                >
                  ⛶
                </button> */}
              </div>
              
            </div>
            <div className="absolute w-full bottom-0 max-md:bottom-14 max-md:px-0 px-3 opacity-100 transition-opacity">
              
              <div
                className="h-1 w-full bg-gray-800 rounded cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  if (videoRefs.current[idx]) {
                    videoRefs.current[idx].currentTime =
                      pos * videoRefs.current[idx].duration;
                  }
                }}
              >
                <div
                  className="h-full bg-white rounded"
                  style={{ width: `${progress[idx] || 0}%` }}
                />
              </div>
            </div>
            <div className="absolute w-full px-5 flex justify-between items-center top-5 z-10">
              {/* Upper-SIDE BUTTON */}
              <div className="dark:text-white text-white cursor-pointer font-bold tracking-[0.8px] text-lg">
                Eduvid
              </div>
              {/* <div className="dark:text-white text-white cursor-pointer font-bold tracking-[0.8px] text-lg"><ExpandIcon/></div> */}
            </div>
            <div className="absolute w-full max-md:mb-5 bottom-0 to-transparent py-0 px-5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Link to="/profile" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full cursor-pointer">
                      <img
                        src={media.profile}
                        alt={media.user.name}
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <span className="font-semibold max-[769px]:text-sm cursor-pointer">
                      {media.user.name}
                    </span>
                  </Link>
                  {media.user.isVerified && (
                    <span className="text-blue-400 text-xs">
                      <img src="/whiteOfficialIcon.png" alt="✔️" />
                    </span>
                  )}
                  <FollowButtonCard />
                </div>
              </div>
              <div className="max-md:mb-5 pb-5 pr-8">
                {/* <h3 className="text-lg font-bold text-white mb-1">
                  {media.title}
                </h3> */}
                <p className="text-sm text-gray-300 w-[95%] mb-2 line-clamp-3 max-h-16 overflow-y-auto scrollbar-hide">
                  {media.description}
                </p>
                {/* <Link to="/pitch-details" className="flex justify-center">
                  <button className="bg-purple-800 max-md:w-full rounded text-sm text-white text-center py-2 px-5">
                    More Details
                  </button>
                </Link> */}
              </div>
            </div>
            {/* CENTER ANIMATED THUMB */}
            {isAnimating && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ animation: "like-pop 1s ease-out forwards" }}
              >
                <FaThumbsUp size={120} className="text-white drop-shadow-lg" />
              </div>
            )}

            <div className="absolute flex flex-col right-4 top-3/4 mt-12 max-md:pb-20 -translate-y-3/4 space-y-4 z-10">
              {/* LIKE BUTTON */}
              <div
                onClick={() => toggleLike(media.id)}
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mb-2">
                  {liked ? (
                    <FaThumbsUp className="w-5 h-5 text-white" />
                  ) : (
                    <img src="/LikePitch.png" alt="Like" className="w-5 h-5" />
                  )}
                </div>

                <p className="text-center text-sm text-white">
                  {formatNumber(media.likes)}
                </p>
              </div>

              {/* COMMENT BUTTON */}
              <div
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center">
                  <img
                    src="/CommentsPitch.png"
                    alt="Comment"
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-center text-sm text-white">
                  {formatNumber(media.comments.length)}
                </p>
              </div>

              {/* SHARE BUTTON */}
              <div
                onClick={() => setIsShareOpen(true)}
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center">
                  <img src="/SendPitch.png" alt="Share" className="w-5 h-5" />
                </div>
                <p className="text-center text-sm text-white">
                  {formatNumber(media.shares)}
                </p>
              </div>
              {/* MORE OPTIONS BUTTON */}
              <div
                onClick={() => setShowMoreOptions(idx)}
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mb-2">
                  <IoMdMore className="text-xl" />
                </div>
              </div>
            </div>
            {/* Moving pitch card when tray opens */}
            {/* <div
              className={`absolute inset-0 transition-transform duration-1000 ease-out ${
                openIndex === idx ? "-translate-x-80" : "translate-x-0"
              }`}
            /> */}
            {/* Comment tray */}
            <Transition
              show={openIndex === idx}
              enter="transition ease-out duration-200 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-[60%] max-md:translate-x-0"
              leave="transition ease-in duration-200 transform"
              leaveFrom="translate-x-[30%] max-md:translate-x-0"
              leaveTo="translate-x-full"
            >
              <aside className="fixed right-0 top-0 h-full left-[62%] w-full text-black z-50 overflow-y-auto">
                <div className="fixed inset-0 p-4 left-[62%] max-md:left-0 max-md:right-0 max-md:top-[25%] z-50 bg-opacity-50 flex items-center">
                  <div className="bg-white dark:bg-gray-800 mx-auto dark:text-white rounded-xl shadow-lg w-full h-full max-w-md p-6 relative">
                    {" "}
                    {/* Close Button */}
                    <button
                      onClick={() => setOpenIndex(null)}
                      className="absolute top-2 right-2 text-black dark:text-white"
                    >
                      ✕
                    </button>
                    <h3 className="text-lg font-semibold mb-4">
                      <span>{media.user.name} : </span>Comments
                    </h3>
                    {/* Comment Input */}
                    <div className="relative mb-4">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      />
                      {commentInput.trim() && (
                        <FiSend
                          onClick={() => addComment(media.id)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-600 cursor-pointer text-xl hover:scale-110 transition"
                        />
                      )}
                    </div>
                    {/* Comment List */}
                    <div className="max-h-[80%] scrollbar-hide overflow-y-auto space-y-2 bg-gray-100 dark:bg-gray-700 dark:text-white">
                      {media.comments.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          No comments yet.
                        </p>
                      ) : (
                        media.comments.map((comm, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md text-sm"
                          >
                            <p className="text-sm">
                              <span className="font-semibold mr-2">
                                {media.user.name} :
                              </span>
                              {comm.text}
                            </p>
                            <div className="flex text-xs gap-4 mt-1 text-gray-500">
                              <button className="top-0 h-12">
                                <div
                                  onClick={() =>
                                    commenttoggleLike(media.id, comm.id)
                                  }
                                  className="cursor-pointer"
                                >
                                  {commentlikedIds.includes(comm.id) ? (
                                    <FaThumbsUp
                                      size={16}
                                      className="dark:text-white text-black  mb-2"
                                    />
                                  ) : (
                                    <FaRegThumbsUp
                                      size={16}
                                      className="dark:text-white text-black mb-2"
                                    />
                                  )}
                                  <p className="text-center text-[8px] dark:text-gray-300">
                                    {formatNumber(comm.commentlikes)}
                                  </p>
                                </div>
                              </button>
                              <button
                                onClick={() =>
                                  setOpenReplyIndex(
                                    openReplyIndex === idx ? null : idx
                                  )
                                }
                                className="top-0 h-12 dark:text-gray-300"
                              >
                                {openReplyIndex === idx
                                  ? "Hide replies"
                                  : "Reply"}
                              </button>

                              {/* Comment Reply Box */}
                              <Transition
                                show={openReplyIndex === idx}
                                enter="transition-opacity duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <div className="max-h-full overflow-y-auto space-y-2">
                                  <div className="relative mb-4">
                                    {/* Comment Reply Input */}
                                    <input
                                      type="text"
                                      placeholder="Add a comment reply..."
                                      value={commentReplyInput}
                                      onChange={(e) =>
                                        setCommentReplyInput(e.target.value)
                                      }
                                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    />
                                    {commentReplyInput.trim() && (
                                      <FiSend
                                        onClick={() =>
                                          addCommentReply(comm.id, idx)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-600 cursor-pointer text-xl hover:scale-110 transition"
                                      />
                                    )}
                                  </div>
                                  {comm.replies.length === 0 ? (
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                      No Replies yet.
                                    </p>
                                  ) : (
                                    comm.replies.map((reply, idx) => (
                                      <div
                                        key={idx}
                                        className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md text-sm"
                                      >
                                        <p className="text-sm dark:text-white">
                                          <span className="font-semibold mr-2">
                                            {media.user.name} :
                                          </span>
                                          {reply.replyText}
                                          <span>
                                            <button className="">
                                              <div
                                                onClick={() =>
                                                  replytoggleLike(
                                                    media.id,
                                                    comm.id,
                                                    reply.replyId
                                                  )
                                                }
                                                className="cursor-pointer flex gap-4 p-2"
                                              >
                                                {replylikedIds.includes(
                                                  reply.replyId
                                                ) ? (
                                                  <FaThumbsUp
                                                    size={16}
                                                    className="dark:text-white text-black  mb-2"
                                                  />
                                                ) : (
                                                  <FaRegThumbsUp
                                                    size={16}
                                                    className="dark:text-white text-black mb-2"
                                                  />
                                                )}
                                                <p className="text-center text-[8px] dark:text-gray-300">
                                                  {formatNumber(
                                                    reply.replylikes
                                                  )}
                                                </p>
                                              </div>
                                            </button>
                                            <button
                                              onClick={() =>
                                                setOpenReplyIndex(
                                                  openReplyIndex === idx
                                                    ? null
                                                    : idx
                                                )
                                              }
                                              className="top-0 h-12 dark:text-gray-300"
                                            >
                                              {openReplyIndex === idx
                                                ? "Hide replies"
                                                : "Reply"}
                                            </button>
                                          </span>
                                        </p>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </Transition>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </aside>
            </Transition>
            {/* More Options Dialog */}
            <Dialog
              open={showMoreOptions === idx}
              onClose={() => setShowMoreOptions(null)}
            >
              <Dialog.Panel className="fixed max-md:w-full max-md:rounded-none max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-3/4  max-xl:w-64 w-1/4 h-40 rounded-xl bottom-1/2 top-1/2 right-1/3 left-1/3 bg-white p-4 z-50 shadow-md">
                <button
                  className="block w-full py-2 text-left text-red-600 "
                  onClick={() => {
                    setReport(true);
                  }}
                >
                  {report ? "you reported this profile" : "Report"}
                </button>
                <button
                  className="block w-full py-2 text-left"
                  onClick={() => {
                    setBlock(true);
                  }}
                >
                  {block ? "Blocked" : "Block"}
                </button>
                <button className="block w-full py-2 text-left">
                  <Link to="/profile">View Profile</Link>
                </button>
              </Dialog.Panel>
            </Dialog>

            {isShareOpen && (
              <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
                <div className="w-full max-w-md rounded-xl bg-white dark:dark-color dark:border dark:border-white p-6 relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setIsShareOpen(false)}
                    className="absolute top-4 right-4 text-2xl text-black dark:text-white"
                  >
                    ×
                  </button>

                  <h2 className="text-lg text-center text-black dark:text-white font-bold mb-4">
                    Share Eduvid To
                  </h2>

                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search Users"
                    // value={searchTerm}
                    onChange={handleSearch}
                    className="text-black w-full mb-4 px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 dark:dark-color dark:text-white focus:outline-none"
                  />

                  {/* Scrollable Horizontal Users */}
                  <div className="relative mb-4">
                    <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-72 pb-2 scrollbar-hide">
                      {filteredUsers.map((user) => {
                        const isSelected = selectedUsers.includes(user.id);
                        return (
                          <div
                            key={user.id}
                            onClick={() =>
                              setSelectedUsers((prev) =>
                                prev.includes(user.id)
                                  ? prev.filter((id) => id !== user.id)
                                  : [...prev, user.id]
                              )
                            }
                            className={`min-w-[100px] flex-shrink-0 text-center rounded-xl p-2 border ${
                              isSelected ? "bg-black" : ""
                            } cursor-pointer relative`}
                          >
                            <div className="relative w-16 h-16 mx-auto">
                              <img
                                src={user.img}
                                alt={user.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                              />
                              {isSelected && (
                                <PiCheckCircleFill className="absolute bottom-0 right-0 text-blue-600 text-lg bg-white rounded-full" />
                              )}
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white">
                              {user.name}
                            </p>
                            {user.verified && (
                              <span className="text-blue-500 text-xs">✔</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Conditional Message and Send OR Social Buttons */}
                  {selectedUsers.length > 0 ? (
                    <div className="w-full mt-4 p-2 rounded-xl border border-gray-200 bg-white dark:dark-color dark:text-white focus:outline-none">
                      {/* Message Field */}
                      <input
                        type="text"
                        placeholder="Write a message..."
                        className="w-full h-full focus:outline-none text-black dark:dark-color"
                      />

                      {/* Send Button */}
                      <button
                        onClick={() => {
                          // your send logic here
                          setIsShareOpen(false);
                        }}
                        className="w-full mt-4 py-2 rounded-full text-white font-semibold bg-blue-600"
                      >
                        Send
                      </button>
                    </div>
                  ) : (
                    // Social Share Buttons
                    <div
                      className="relative mt-4"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      {/* Scrollable Social Buttons */}
                      <div
                        ref={scrollRef}
                        className="overflow-x-auto h-full scrollbar-hide flex space-x-6 px-2"
                      >
                        {socialPlatforms.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col items-center text-center flex-shrink-0 w-16"
                          >
                            <button
                              onClick={item.onClick}
                              className="bg-gray-200 shadow text-black text-2xl rounded-full p-3"
                            >
                              {item.icon}
                            </button>
                            <span className="pt-1 text-black text-xs dark:text-white">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Left Arrow */}
                      {isHovering && showLeftArrow && (
                        <button
                          onClick={() =>
                            scrollRef.current.scrollBy({
                              left: -250,
                              behavior: "smooth",
                            })
                          }
                          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
                        >
                          <SlArrowLeft />
                        </button>
                      )}

                      {/* Right Arrow */}
                      {isHovering && showRightArrow && (
                        <button
                          onClick={() =>
                            scrollRef.current.scrollBy({
                              left: 200,
                              behavior: "smooth",
                            })
                          }
                          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
                        >
                          <SlArrowRight />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
