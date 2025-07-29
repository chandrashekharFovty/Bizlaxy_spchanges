import React, { useEffect, useRef, useState } from "react";
import { UserAvatar } from "../ui/UserAvatar";
import { FollowButton } from "../ui/FollowButton";
import { CountBadge } from "../ui/CountBadge";
import officialIcon from "/Official Icon.png";
import SavePostBadge from "../ui/SavePostBadge";
import PostPopover, { PostModal } from "./PostPopover";
import { LuHeart } from "react-icons/lu";
import { FaRegComment, FaThreads, FaXTwitter } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { FaHeart, FaRegThumbsUp, FaThumbsUp, FaWhatsapp } from "react-icons/fa";
import { HiDocument, HiMiniArrowTurnUpRight } from "react-icons/hi2";
import { CgFileDocument } from "react-icons/cg";
import * as Dialog from "@radix-ui/react-dialog";
import { Transition } from "@headlessui/react";
import { BsChatDots } from "react-icons/bs";
import { RiFacebookCircleLine } from "react-icons/ri";
import { MdOutlineInsertLink } from "react-icons/md";
import { PiCheckCircleFill } from "react-icons/pi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

//MEDIA CONTENT IMAGES ARRAY
const images = ["/poster03.png", "/poster01.png", "/poster02.png"];
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

//REPLY OF COMMENTS TYPE OF DATA NEEDED
interface CommentReply {
  replyId: number;
  replyname: string;
  replyText: string;
  replylikes: number;
  isReplyLiked?: boolean;
}

//POST COMMENTS TYPE OF DATA NEEDED WITH REPLY ARRAY
interface CommentItem {
  id: number;
  name: string;
  text: string;
  commentlikes: number;
  isCommentLiked?: boolean;
  replies: CommentReply[];
}

// Extend MediaItem to hold comments
// Extend MediaItem to hold comments
interface CommentListItem {
  id: number;
  comments: CommentItem[];
}

interface PostProps {
  user: {
    name: string;
    avatar: string;
    timeAgo: string;
  };
  content: {
    title: string;
    titleLimit: number;
    description: string;
    descpLimit: number;
    isFileImage?: string;
    isFileVideo?: string;
    isFileDocument?: string;
    documentUrl?: string; // add this prop
    documentName?: string; // optional custom file name
  };
  engagement: {
    likes: string;
    shares: string;
  };
  showFollowButton?: boolean;
  showMoreOptions?: boolean;
  isLiked?: boolean;
  showOfficialIcon?: boolean;
  isMediaContent?: boolean;
  onclose?: () => void;
  commentsList: CommentListItem[]; // Post media
}

export function Post({
  user,
  content,
  engagement,
  commentsList,
  showFollowButton = false,
  showMoreOptions = false,
  showOfficialIcon = false,
  isMediaContent = false,
}: PostProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shares, setShares] = useState(parseInt(engagement.shares));
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(parseInt(engagement.likes));
  const [showComment, setShowComment] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(" ");
  const [commentList, setCommentList] = useState<CommentListItem[]>(
    commentsList || []
  );
  const [commentsCount, setCommentsCount] = useState(
    commentList[0]?.comments.length || 0
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openReplyIndex, setOpenReplyIndex] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [commentReplyInput, setCommentReplyInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);




// Social Media Share Functionality
const shareUrl = "https://yourwebsite.com/post"; // actual share link
const shareText = "Check out this Post!";

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
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        "_blank"
      );
    },
  },
  {
    icon: <BsChatDots />,
    label: "Messenger",
    onClick: () => {
      window.open(
        `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}`,
        "_blank"
      );
    },
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    onClick: () => {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
        "_blank"
      );
    },
  },
  {
    icon: <FaThreads />,
    label: "Threads",
    onClick: () => {
      window.open(
        `https://threads.net/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        "_blank"
      );
    },
  },
  {
    icon: <FaXTwitter />,
    label: "Twitter",
    onClick: () => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
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

  const handleShare = () => setIsShareOpen(true);

  const handleLike = () => {
    if (!isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  const toggleCommentLike = (mediaId: number, commentId: number) => {
    setCommentList((prev) =>
      prev.map((item) =>
        item.id === mediaId
          ? {
              ...item,
              comments: item.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      commentlikes: comment.isCommentLiked
                        ? comment.commentlikes - 1
                        : comment.commentlikes + 1,
                      isCommentLiked: !comment.isCommentLiked,
                    }
                  : comment
              ),
            }
          : item
      )
    );
  };

  const toggleReplyLike = (
    mediaId: number,
    commentId: number,
    replyId: number
  ) => {
    setCommentList((prev) =>
      prev.map((item) =>
        item.id === mediaId
          ? {
              ...item,
              comments: item.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: comment.replies.map((reply) =>
                        reply.replyId === replyId
                          ? {
                              ...reply,
                              replylikes: reply.isReplyLiked
                                ? reply.replylikes - 1
                                : reply.replylikes + 1,
                              isReplyLiked: !reply.isReplyLiked,
                            }
                          : reply
                      ),
                    }
                  : comment
              ),
            }
          : item
      )
    );
  };

  const addComment = (mediaId: number) => {
    if (!commentInput.trim()) return;
    setCommentsCount((prev) => prev + 1);
    setCommentList((prev) =>
      prev.map((item) =>
        item.id === mediaId
          ? {
              ...item,
              comments: [
                ...item.comments,
                {
                  id: 1,
                  name: "",
                  text: commentInput,
                  commentlikes: 0,
                  isCommentLiked: true,
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
    setCommentList((prev) =>
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
                          replyname: "",
                          replyText: commentReplyInput,
                          replylikes: 0,
                          isReplyLiked: true,
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

  const handleDoubleClick = () => {
    const heart = heartRef.current;
    heart.classList.remove("scale-0", "opacity-0");
    heart.classList.add("scale-[1000%]", "opacity-100");

    setTimeout(() => {
      heart.classList.remove("scale-500");
      heart.classList.add("scale-0");
    }, 3000);

    setTimeout(() => {
      heart.classList.remove("opacity-100");
      heart.classList.add("opacity-0");
    }, 2000);
    handleLike();
  };

  const heartRef = useRef(null);

  const handleDownload = () => {
    if (!content.documentUrl) return;
    const link = document.createElement("a");
    link.href = content.documentUrl;
    link.download =
      content.documentName || content.documentUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const truncatedDescription =
    content.description.length > content.descpLimit
      ? content.description.slice(0, content.descpLimit)
      : content.description;

  return (
    <>
      <div className="shadow-[0_0_2px_1px_rgba(0,0,0,0.1)] dark:shadow  dark:border dark:border-gray-300 dark:bg-black/30  max-md:w-screen max-md:mr-4 bg-white p-5 rounded-xl w-full relative z-10">
        <div className=" flex justify-between py-[7px]">
          <div className="max-md:w-11/12 flex gap-2">
            <UserAvatar src={user.avatar} />
            <div className="">
              <div className="flex items-center gap-2">
                <span className="max-md:text-xs dark:text-white font-medium text-base">
                  {user.name}
                </span>
                {showMoreOptions && (
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/22e8f5e19f8a469193ec854927e9c5a6/9e55e48d50c24f504973bb6ca3fab7e2ea80bba0?placeholderIfAbsent=true"
                    className="w-5 max-md:w-4"
                  />
                )}
                {showOfficialIcon && (
                  <img src={officialIcon} className="w-4 h-4" />
                )}
                {showFollowButton && <FollowButton />}
              </div>
              <span className="dark:text-gray-400 text-xs text-gray-500">
                {user.timeAgo}
              </span>
            </div>
          </div>
          <div className="absolute max-md:w-1/12 dark:text-white top-4 right-4 z-10">
            <PostModal />
          </div>
        </div>

        <div className="text-sm mt-2.5 w-full">
          <div className="w-[660px]">
            <div className="max-md:text-sm max-md:w-72 font-semibold">
              {content.title}
            </div>
            <div className="max-md:text-xs max-md:w-72 dark:text-gray-500 text-[#464646] font-normal mt-2">
              {showFullDescription ? content.description : truncatedDescription}
              {content.description.length > content.descpLimit && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="dark:dark-color  text-[#1C4BC4] text-[12px] ml-1 hover:underline"
                >
                  {showFullDescription ? "see less" : "see more"}
                </button>
              )}
            </div>

            {isMediaContent && (
              <div onDoubleClick={handleDoubleClick}>
                <div className="max-md:w-[300px] max-md:h-[300px] max-md:object-cover relative mt-5 border w-[650px] h-[650px] overflow-hidden rounded-2xl">
                  <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full max-md:w-[300px] h-[650px] max-md:h-[280px] object-cover"
                  />
                  <p className="absolute top-8 right-4 -translate-y-1/2 p-1 text-[#777676] border text-sm rounded-full">
                    {currentIndex + 1}/{images.length}
                  </p>
                  <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-2 -translate-y-1/2 p-1 text-[#777676] border text-xl rounded-full"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-[#777676] border text-xl rounded-full"
                  >
                    &gt;
                  </button>
                </div>
                <div className="max-md:w-[280px] flex justify-center py-4 gap-2">
                  {images.map((_, index) => (
                    <hr
                      key={index}
                      className={`h-3 w-3 max-md:w-2 max-md:h-2 max-md:border border-2 cursor-pointer rounded-full ${
                        currentIndex === index
                          ? "bg-blue-800 dark:bg-gray-800"
                          : "bg-[#BABABA] dark:bg-gray-200"
                      }`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
                <i
                  ref={heartRef}
                  className="ri-heart-fill text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-transform duration-500 ease-in-out"
                ></i>
                {/* <HeartIcon ref={heartRef} className="ri-heart-fill text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-transform duration-500 ease-in-out"/> */}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between text-xs font-medium mt-3">
          <div className=" max-md:gap-1 flex items-center gap-4">
            <div
              onClick={handleLike}
              className={`flex items-center gap-1 cursor-pointer border border-gray-400 h-8 px-3 rounded-full transition hover:bg-gray-100 dark:hover:bg-black ${
                isLiked
                  ? "text-red-500 bg-red-50 border-red-200 dark:text-white dark:border-white dark:bg-black "
                  : "text-black dark:text-white"
              }`}
            >
              {isLiked ? (
                <FaHeart className="text-lg" />
              ) : (
                <LuHeart className="text-lg" />
              )}
              <span>{formatNumber(likes)}</span>
            </div>

            <div
              onClick={() => {
                setShowComment(true);
                setOpenIndex(openIndex === currentIndex ? null : currentIndex);
              }}
              className="flex items-center gap-1 cursor-pointer border border-gray-400 h-8 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <FaRegComment className="text-lg" />
              <span className="text-sm">{formatNumber(commentsCount)}</span>
            </div>

            {/* Share */}
            <div
              onClick={handleShare}
              className="flex items-center gap-1 cursor-pointer border border-gray-400 h-8 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <FiSend className="text-lg" />
              <span className="text-sm">{formatNumber(shares)}</span>
            </div>
          </div>

          <div className="cursor-pointer flex gap-1">
            {content.documentUrl && (
              <CgFileDocument
                onClick={handleDownload}
                className="text-xl mt-[0.7px] cursor-pointer hover:text-blue-600 transition"
                title={`Download ${content.documentName || "attachment"}`}
              />
            )}
            <img src="/savePost.svg" alt="savepost" className="h-5 w-5 text-black dark:invert"/>
          </div>
        </div>
      </div>

      {/* Comment Dialog */}
      <Dialog.Root open={showComment} onOpenChange={setShowComment}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 z-40" />
          <Dialog.Content className="fixed inset-0 z-40 flex items-center justify-center mx-auto">
            <div className="rounded-xl bg-white dark:bg-gray-800 border">
              <Dialog.Title className="text-lg dark:text-white flex p-3 justify-between font-bold w-full h-full">
                <h2>Bizlaxy</h2>
                <button onClick={() => setShowComment(false)}>X</button>
              </Dialog.Title>
              <div className="flex max-md:flex-col mx-auto max-md:h-[482px] scrollbar-hide">
                <div className="p-3 w-1/2 max-md:w-full">
                  <div className="p-2 dark:border dark:border-gray-300 dark:glass-bg-dark  max-md:w-screen bg-white rounded-xl relative z-10">
                    <div className="w-full flex justify-between">
                      <div className="flex gap-2">
                        <UserAvatar src={user.avatar}/>
                        <div className="">
                          <div className="flex items-center gap-2">
                            <span className="max-md:text-xs dark:text-white font-medium text-base">
                              {user.name}
                            </span>
                            {showMoreOptions && (
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/22e8f5e19f8a469193ec854927e9c5a6/9e55e48d50c24f504973bb6ca3fab7e2ea80bba0?placeholderIfAbsent=true"
                                className="w-5 max-md:w-4"
                              />
                            )}
                            {showOfficialIcon && (
                              <img src={officialIcon} className="w-3 h-3" />
                            )}
                            {showFollowButton && <FollowButton />}
                          </div>
                          <span className="dark:text-gray-400 text-xs text-gray-500">
                            {user.timeAgo}
                          </span>
                        </div>
                      </div>
                      <div className="absolute max-md:w-1/12 dark:text-white top-4 right-4 z-10">
                        <PostModal />
                      </div>
                    </div>

                    <div className="text-sm mt-2.5 w-full max-w-2xl">
                      <div className="w-full">
                        <div className="max-md:text-sm w-full font-semibold dark:text-white">
                          {content.title}
                        </div>
                        <div className="max-md:text-xs max-md:w-full dark:text-gray-500 text-[#464646] font-normal mt-2">
                          {showFullDescription
                            ? content.description
                            : truncatedDescription}
                          {content.description.length > content.descpLimit && (
                            <button
                              onClick={() =>
                                setShowFullDescription(!showFullDescription)
                              }
                              className="text-blue-400 dark:text-white text-[12px] ml-1 hover:underline"
                            >
                              {showFullDescription ? "see less" : "see more"}
                            </button>
                          )}
                        </div>

                        {isMediaContent && (
                          <div
                            onDoubleClick={handleDoubleClick}
                            className="max-md:hidden "
                          >
                            <div className="max-md:mx-auto max-md:w-2/3 max-md:h-[150px] max-w-full max-h-[300px] object-cover relative mt-5 border overflow-hidden rounded-2xl">
                              <img
                                src={images[currentIndex]}
                                alt={`Slide ${currentIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <p className="absolute top-8 right-4 -translate-y-1/2 p-1 text-[#777676] border text-sm rounded-full">
                                {currentIndex + 1}/{images.length}
                              </p>
                              <button
                                onClick={prevSlide}
                                className="absolute top-1/2 left-2 -translate-y-1/2 p-1 text-[#777676] border text-xl rounded-full"
                              >
                                &lt;
                              </button>
                              <button
                                onClick={nextSlide}
                                className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-[#777676] border text-xl rounded-full"
                              >
                                &gt;
                              </button>
                            </div>
                            <div className="max-md:w-full flex justify-center py-4 gap-2">
                              {images.map((_, index) => (
                                <hr
                                  key={index}
                                  className={`h-3 w-3 max-md:w-2 max-md:h-2 max-md:border border-2 cursor-pointer rounded-full ${
                                    currentIndex === index
                                      ? "bg-blue-800 dark:bg-gray-800"
                                      : "bg-[#BABABA] dark:bg-gray-200"
                                  }`}
                                  onClick={() => goToSlide(index)}
                                />
                              ))}
                            </div>
                            <i
                              ref={heartRef}
                              className="ri-heart-fill text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-transform duration-500 ease-in-out"
                            ></i>
                            {/* <HeartIcon ref={heartRef} className="ri-heart-fill text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-transform duration-500 ease-in-out"/> */}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs font-medium mt-3">
                      <div className=" max-md:gap-1 flex items-center gap-4">
                        <div
                          onClick={handleLike}
                          className={`flex items-center gap-1 cursor-pointer border border-gray-400 h-8 px-3 rounded-full transition ${
                            isLiked
                              ? "text-red-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-300 bg-red-50 border-red-200"
                              : "text-gray-700 dark:text-white"
                          }`}
                        >
                          {isLiked ? (
                            <FaHeart className="text-lg" />
                          ) : (
                            <LuHeart className="text-lg" />
                          )}
                          <span>{formatNumber(likes)}</span>
                        </div>

                        <div
                          // onClick={() => {
                          //   setOpenIndex(
                          //     openIndex === currentIndex ? null : currentIndex
                          //   ),
                          //     setShowComment(true);
                          // }}
                          className="flex dark:text-white items-center gap-1 cursor-pointer border border-gray-400 h-8 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <FaRegComment className="text-lg" />
                          <span className="text-sm">
                            {formatNumber(commentsCount)}
                          </span>
                        </div>

                        {/* Share */}
                        <div
                          // onClick={handleShare}
                          className="flex dark:text-white items-center gap-1 cursor-pointer border border-gray-400 h-8 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <FiSend className="text-lg" />
                          <span className="text-sm">
                            {formatNumber(shares)}
                          </span>
                        </div>
                      </div>

                      <div className="cursor-pointer flex gap-1 dark:text-white">
                        {content.documentUrl && (
                          <CgFileDocument
                            onClick={handleDownload}
                            className="text-2xl mt-[0.7px] cursor-pointer hover:text-blue-600 transition"
                            title={`Download ${
                              content.documentName || "attachment"
                            }`}
                          />
                        )}
                        <SavePostBadge />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 max-md:w-full scrollbar-hide  text-black z-40 overflow-y-auto">
                  {/* <div className="text-lg dark:text-white text-center font-bold">
                    {user.name} : Comments
                  </div> */}
                  {/* Desktop */}
                  {commentList.map((media, idx) => (
                    <aside className="h-full w-full text-black z-40 p-3">
                      <div className="z-40 bg-opacity-50 flex items-center ">
                        <div className="bg-white dark:bg-gray-800 border w-full h-full flex flex-col items-start justify-between mx-auto dark:text-white rounded-xl px-3 py-1 relative">
                          {/* Close Button */}
                          {/* Comment List */}
                          <div className="max-md:h-[300px]  max-h-[400px] scrollbar-hide overflow-y-auto space-y-2 dark:bg-gray-800 dark:text-white">
                            {media.comments.length === 0 ? (
                              <p className="text-sm text-gray-300 dark:text-gray-300">
                                No comments yet.
                              </p>
                            ) : (
                              media.comments.map((comm, idx) => (
                                <div
                                  key={idx}
                                  className="dark:bg-gray-800 px-4 py-2 rounded-md text-sm"
                                >
                                  <p className="text-sm">
                                    <strong className="font-semibold mr-2">
                                      {comm.name} :
                                    </strong>
                                    {comm.text}
                                  </p>
                                  <div className="flex text-xs gap-4 mt-1 text-gray-300">
                                    <button className="top-0 h-12">
                                      <div
                                        onClick={() =>
                                          toggleCommentLike(media.id, comm.id)
                                        }
                                        className={`flex items-center gap-1 cursor-pointer h-2 transition ${
                                          comm.isCommentLiked
                                            ? "text-red-500 border-red-200"
                                            : "text-gray-700 dark:text-white"
                                        }`}
                                      >
                                        {comm.isCommentLiked ? (
                                          <FaHeart size={16} />
                                        ) : (
                                          <LuHeart size={16} />
                                        )}
                                        <span>
                                          {formatNumber(comm.commentlikes)}
                                        </span>
                                      </div>
                                    </button>
                                    <button
                                      onClick={() =>
                                        setOpenReplyIndex(
                                          openReplyIndex === idx ? null : idx
                                        )
                                      }
                                      className="top-0 h-12 text-black dark:text-gray-300"
                                    >
                                      {openReplyIndex === idx
                                        ? "Hide replies"
                                        : "Reply"}
                                    </button>

                                    {/* Comment Reply Box */}
                                    <Transition show={openReplyIndex === idx}>
                                      <div className="max-h-full overflow-y-auto space-y-2">
                                        <div className="relative mb-4">
                                          {/* Comment Reply Input */}
                                          <input
                                            type="text"
                                            placeholder="Reply..."
                                            value={commentReplyInput}
                                            onChange={(e) =>
                                              setCommentReplyInput(
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-300 dark:bg-gray-800 text-black dark:text-gray-300 dark:border-gray-600"
                                          />
                                          {commentReplyInput.trim() && (
                                            <FiSend
                                              onClick={() =>
                                                addCommentReply(comm.id, idx)
                                              }
                                              className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-600 dark:text-gray-50 cursor-pointer text-xl hover:scale-110 transition"
                                            />
                                          )}
                                        </div>
                                        {comm.replies.length === 0 ? (
                                          <p className="text-sm text-gray-600 dark:text-gray-300">
                                            No Replies yet.
                                          </p>
                                        ) : (
                                          comm.replies.map((reply, idx) => (
                                            <div
                                              key={reply.replyId}
                                              className="dark:bg-gray-800 px-4 py-2 rounded-md text-sm"
                                            >
                                              <p className="text-sm flex gap-2">
                                                <strong className="font-semibold mr-2 text-black dark:text-gray-300">
                                                  {reply.replyname} :
                                                </strong>
                                                <span className="text-black dark:text-gray-300">
                                                  {reply.replyText}
                                                </span>

                                                <span className="flex gap-2">
                                                  {" "}
                                                  <button className="top-0 h-12">
                                                    <div
                                                      onClick={() =>
                                                        toggleReplyLike(
                                                          media.id,
                                                          comm.id,
                                                          reply.replyId
                                                        )
                                                      }
                                                      className={`flex items-center gap-1 cursor-pointer h-2 transition ${
                                                        reply.isReplyLiked
                                                          ? "text-red-500 border-red-200"
                                                          : "text-gray-700 dark:text-white"
                                                      }`}
                                                    >
                                                      {reply.isReplyLiked ? (
                                                        <FaHeart size={16} />
                                                      ) : (
                                                        <LuHeart size={16} />
                                                      )}
                                                      <span>
                                                        {formatNumber(
                                                          reply.replylikes
                                                        )}
                                                      </span>
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
                                                    className="top-0 h-12 text-black dark:text-gray-300"
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
                          {/* Comment Input */}
                          <div className="relative my-4">
                            <input
                              type="text"
                              placeholder="Add a comment..."
                              value={commentInput}
                              onChange={(e) => setCommentInput(e.target.value)}
                              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            />
                            {commentInput.trim() && (
                              <FiSend
                                onClick={() => addComment(media.id)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-600 dark:text-gray-50 cursor-pointer text-xl hover:scale-110 transition"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </aside>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Share Dialog */}
      {/* <Dialog.Root open={isShareOpen} onOpenChange={setIsShareOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full h-[500px] max-w-md rounded-xl bg-white dark:dark-color dark:border dark:border-white p-6">
              <Dialog.Title className="text-lg text-center font-bold mb-4">
                Send Post To
              </Dialog.Title>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="dark:dark-color  dark:border dark:border-white w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <div className="space-y-2 max-h-[300px] scrollbar-hide overflow-y-auto">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={user.img}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">@{user.title}</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                        Send
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No users found.</p>
                )}
              </div>

              <button
                onClick={() => setIsShareOpen(false)}
                className="mt-4 w-full px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root> */}

   
                                                    
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
                        isSelected ? "dark:bg-black bg-gray-300" : ""
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
                  className="w-full h-full focus:outline-none dark:dark-color text-black"
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
    </>
  );
}
export default Post;
