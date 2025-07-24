import React, { useEffect, useState } from "react";
import { Post } from "./Post";
import { SuggestedContent } from "./SuggestedContent";
import Story from "./Story";
import Recommandetion from "./Recommandetion";
import { text } from "stream/consumers";

const formatNumber = (number) =>
  new Intl.NumberFormat("en-US").format(Number(number.replace(/[^0-9]/g, "")));

export function PostList() {
  const storyItems = [
    {
      name: "Alice",
      imageSrc: "/Story1.png",
      media: [
        { type: "image", src: "/Story1.png" },
        { type: "image", src: "/backhome.png" },
        { type: "video", src: "/video1.mp4" },
      ],
    },
    {
      name: "Shivi",
      imageSrc: "/left4.jpg",
      media: [
        { type: "image", src: "/left7.jpg" },
        { type: "image", src: "/left8.jpg" },
        { type: "image", src: "/left6.jpg" },
      ],
      imageStyles: "rounded-full w-16 h-16 border-2 border-blue-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
    {
      name: "Bob",
      imageSrc: "/Story2.png",
      media: [{ type: "image", src: "/Story2.png" }],
      imageStyles: "rounded-full w-16 h-16 border-2 border-blue-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
    {
      name: "Charlie",
      imageSrc: "/Story5.png",
      media: [{ type: "image", src: "/Story5.png" }],
      imageStyles: "rounded-full w-16 h-16 border-2 border-green-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
    {
      name: "Diana",
      imageSrc: "/Story3.png",
      media: [{ type: "image", src: "/Story3.png" }],
      imageStyles: "rounded-full w-16 h-16 border-2 border-yellow-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
    {
      name: "Ethan",
      imageSrc: "/Story4.png",
      media: [{ type: "image", src: "/Story4.png" }],
      imageStyles: "rounded-full w-16 h-16 border-2 border-purple-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
    {
      name: "Alice",
      imageSrc: "/Story5.png",
      media: [{ type: "image", src: "/Story5.png" }],
      imageStyles: "rounded-full w-16 h-16 border-2 border-pink-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
    {
      name: "Bob",
      imageSrc: "/Story1.png",
      media: [{ type: "image", src: "/Story1.png" }],
      imageStyles: "rounded-full w-16 h-16 border-2 border-blue-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
    {
      name: "Charlie",
      imageSrc: "/Story2.png",
      media: [],
      imageStyles: "rounded-full w-16 h-16 border-2 border-green-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
    {
      name: "Diana",
      imageSrc: "/Story3.png",
      media: [{ type: "image", src: "/Story3.png" }],
      imageStyles: "rounded-full w-16 h-16 border-2 border-yellow-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
    {
      name: "Bob",
      imageSrc: "/Story2.png",
      media: [{ type: "image", src: "/Story2.png" }],
      imageStyles: "rounded-full w-16 h-16 border-2 border-blue-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
    {
      name: "Charlie",
      imageSrc: "/Story5.png",
      media: [{ type: "image", src: "/Story5.png" }],
      imageStyles: "rounded-full w-16 h-16 border-2 border-green-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
    {
      name: "Diana",
      imageSrc: "/Story3.png",
      media: [{ type: "image", src: "/Story3.png" }],
      imageStyles: "rounded-full w-16 h-16 border-2 border-yellow-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
    {
      name: "Ethan",
      imageSrc: "/Story4.png",
      media: [{ type: "image", src: "/Story4.png" }],
      imageStyles: "rounded-full w-16 h-16 border-2 border-purple-500",
      containerStyles: "flex flex-col items-center gap-2",
    },
  ];

  const posts = [
    {
      user: {
        name: "Brian Turner",
        avatar:
          "https://cdn.builder.io/api/v1/image/assets/22e8f5e19f8a469193ec854927e9c5a6/207cecdea9d621d7e8dae4481e717853eedb0dda?placeholderIfAbsent=true",
        timeAgo: "1 hour ago",
      },
      content: {
        title:
          "Turn your idea into a thriving business—start your journey with us today! 💡🚀",
        titleLimit: 30, // 🔹 Set title character limit here
        description:
          "“From a spark of an idea to building something real — every step, sprint, and setback has shaped this journey. Here’s to the sleepless nights, early wins, and relentless belief in something greater. 🔗 #FounderLife #StartupJourney",
        descpLimit: 50, // 🔹 Set description character limit here
        documentUrl:
          "http://dt.pepperdine.edu/courses/greatbooks_v/gbv-15/66697602-The-Ramayana-R-K-Narayan.pdf",
        documentName: "Ramayana.pdf",
      },
      engagement: {
        likes: "11054",
        // comments: formatNumber("0"),
        shares: "648",
      },
      showFollowButton: true,
      showMoreOptions: true,
      //isFileImage: true,
      //isMediaContent: true,
      commentsList: [
        {
          id: 1,
          comments: [
            {
              id: 1,
              name:"im_gr",
              text: "Nice post!",
              commentlikes: 11054,
              replies: [{ replyId: 1,replyname:"Brian Turner", replyText: "Thanks 😊", replylikes: 11054 }],
            },
            {
              id: 2,
              name:"organic__ai",
              text: "Great insights!",
              commentlikes: 110,
              replies: [],
            },
          ],
        },
      ],
    },
    {
      user: {
        name: "Aakash Mehra",
        avatar:
          "https://cdn.builder.io/api/v1/image/assets/22e8f5e19f8a469193ec854927e9c5a6/87746ffdea2caec3125e0ddccd05dd8d5c11bab4?placeholderIfAbsent=true",
        timeAgo: "1 hour ago",
      },
      content: {
        title:
          "Invest in the future—discover startups shaping tomorrow’s world! 🌍💸",
        titleLimit: 30, // 🔹 Set title character limit here
        description:
          "Dream big. Hustle hard. Repeat. Pioneering new paths in [your industry] and proving that ambition paired with action wins every time. 🚀 #Innovate #BusinessGoals",
        descpLimit: 50, // 🔹 Set description character limit here
      },
      engagement: {
        likes: "1105",
        // comments: formatNumber("0"),
        shares: "64414",
      },
      showOfficialIcon: true,
      showFollowButton: true,
      commentsList: [
      {
        id: 1,
        comments: [
          {
            id: 1,
             name:"im_gr",
            text: "Nice post!",
            commentlikes: 110,
            replies: [
              { replyId: 1,replyname:"Aakash Mehra", replyText: "Thanks 😊", replylikes:110 },
            ],
          },
          {
            id: 2,
            name:"organic__ai",
            text: "Great insights!",
            commentlikes: 54,
            replies: [],
          },
        ],
      },
    ],
    },
    {
      user: {
        name: "Michael Roberts",
        avatar:
          "https://cdn.builder.io/api/v1/image/assets/22e8f5e19f8a469193ec854927e9c5a6/06479c894210e7c426346a66443e06323a031821?placeholderIfAbsent=true",
        timeAgo: "2 hours ago",
      },
      content: {
        title:
          "From pitch to profit—empowering entrepreneurs at every step! 📈💼",
        titleLimit: 30, // 🔹 Set title character limit here
        description:
          "Not just polished pitches — here’s the real side of startup life: late-night brainstorms, coffee-fueled sprints, and team huddles that make the dream possible. What’s the hustle behind your best idea? 👇 #StartupVibes #TeamWork",
        descpLimit: 50, // 🔹 Set description character limit here
        documentUrl:
          "http://dt.pepperdine.edu/courses/greatbooks_v/gbv-15/66697602-The-Ramayana-R-K-Narayan.pdf",
        documentName: "Ramayana.pdf",
      },
      engagement: {
        likes: "1109",
        // comments: formatNumber("0"),
        shares: "6441",
      },
      showOfficialIcon: true,
      showFollowButton: true,
      commentsList: [
      {
        id: 1,
        comments: [
          {
            id: 1,
             name:"im_gr",
            text: "Nice post!",
            commentlikes: 757,
            replies: [
              { replyId: 1,replyname:"Michael Roberts", replyText: "Thanks 😊", replylikes: 546585 },
            ],
          },
          {
            id: "758878",
            name:"organic__ai",
            text: "Great insights!",
            commentlikes: 87,
            replies: [],
          },
        ],
      },
    ],
    },
    {
      user: {
        name: "James Walker",
        avatar:
          "https://cdn.builder.io/api/v1/image/assets/22e8f5e19f8a469193ec854927e9c5a6/207cecdea9d621d7e8dae4481e717853eedb0dda?placeholderIfAbsent=true",
        timeAgo: "1 hour ago",
      },
      content: {
        title:
          "Turn your idea into a thriving business—start your journey with us today! 💡🚀",
        titleLimit: 30, // 🔹 Set title character limit here
        description:
          "“From a spark of an idea to building something real — every step, sprint, and setback has shaped this journey. Here’s to the sleepless nights, early wins, and relentless belief in something greater. 🔗 #FounderLife #StartupJourney",
        descpLimit: 50, // 🔹 Set description character limit here
      },
      engagement: {
        likes: "119",
        // comments: formatNumber("0"),
        shares: "64414",
      },
      showFollowButton: true,
      showMoreOptions: true,
      //isFileImage: true,
      isMediaContent: true,
     commentsList: [
      {
        id: 1,
        comments: [
          {
            id: 1,
              name:"im_gr",
            text: "Nice post!",
            commentlikes: 11,
            replies: [
              { replyId: 1, replyname:"James Walker", replyText: "Thanks 😊", replylikes: 8657 },
            ],
          },
          {
            id: 2,
            name:"organic__ai",
            text: "Great insights!",
            commentlikes: 658,
            replies: [],
          },
        ],
      },
    ],
    },
    {
      user: {
        name: "David Mitchell",
        avatar:
          "https://cdn.builder.io/api/v1/image/assets/22e8f5e19f8a469193ec854927e9c5a6/a9d86a8bff460a98d9174512096fc8279f3e7daf?placeholderIfAbsent=true",
        timeAgo: "1 hour ago",
      },
      content: {
        title:
          "Your network is your net worth—connect with founders, mentors & investors! 🤝✨",
        titleLimit: 30, // 🔹 Set title character limit here
        description:
          "Passion turned into purpose — but I need your voice: Whats the #1 challenge you face when launching a new idea? Lets chat in the comments & build solutions together. 💬👇 #GrowthMindset #EntrepreneurshipInspired by engaging caption tips like asking questions and CTAs",
        descpLimit: 50, // 🔹 Set description character limit here
      },
      engagement: {
       likes: '110541',
        // comments: formatNumber("0"),
        shares: "64414",
      },
      showFollowButton: true,
      showOfficialIcon: true,
      isLiked: true,
      //isMediaContent: true,
      commentsList: [
      {
        id: 1,
        comments: [
          {
            id: 1,
             name:"im_gr",
            text: "Nice post!",
            commentlikes: 10,
            replies: [
              { replyId: 1,replyname:"David Mitchell", replyText: "Thanks 😊", replylikes: 2 },
            ],
          },
          // {
          //   id: 2,
          //   name:"organic__ai",
          //   text: "Great insights!",
          //   replylikes: 5,
          //   replies: [],
          // },
        ],
      },
    ],
    },
    {
      user: {
        name: "C S Ghosh",
        avatar:
          "https://cdn.builder.io/api/v1/image/assets/22e8f5e19f8a469193ec854927e9c5a6/a9d86a8bff460a98d9174512096fc8279f3e7daf?placeholderIfAbsent=true",
        timeAgo: "1 hour ago",
      },
      content: {
        title:
          "Your network is your net worth—connect with founders, mentors & investors! 🤝✨",
        titleLimit: 30, // 🔹 Set title character limit here
        description:
          "Passion turned into purpose — but I need your voice: Whats the #1 challenge you face when launching a new idea? Lets chat in the comments & build solutions together. 💬👇 #GrowthMindset #EntrepreneurshipInspired by engaging caption tips like asking questions and CTAs",
        descpLimit: 50, // 🔹 Set description character limit here
      },
      engagement: {
        likes: "1105415459",
        // comments: formatNumber("0"),
        shares: "64414498",
      },
      showFollowButton: true,
      showOfficialIcon: true,
      isLiked: true,
      //isMediaContent: true,
      commentsList: [
        {
          id: 1,
          comments: [
            {
              id: 1,
              name:"im_gr",
              text: "Nice post",
              commentlikes: 110,
              replies: [{ replyId: 1, replyname:"C S Ghosh", replyText: "Thank you", replylikes: 466 }],
            },
          ],
        },
      ],
    },
  ];

  const suggestedContent = {
    title: "Suggested Eduvid's",
    items: [
      {
        image: "/reel1.png",
        title: "Secrets of Making Successful Business",
      },
      {
        image: "/reel3.png",
        title: "Secrets of Making Successful Business",
      },
      {
        image: "/reel2.png",
        title: "Secrets of Making Successful Business",
      },
    ],
  };

  //const [isActive, setIsActive] = useState(initialActive);
  const [viewMore, setViewMore] = useState(false);
  const [viewPre, setViewPre] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setViewMore(true);
  //     setViewPre(false);
  //   }, 5000); // 5000ms = 5 seconds
  //   return () => clearTimeout(timer); // cleanup on unmount
  // }, []);
  // useEffect(() => {
  //   const timer2 = setTimeout(() => {
  //     setViewMore(false);
  //     setViewPre(true);
  //   }, 10000); // 10000ms = 10 seconds
  //   return () => clearTimeout(timer2); // cleanup on unmount
  // }, []);

  // function loadMore() {
  //   // e.preventDefault();
  //   console.log("clocked");

  //   //setIsActive(!isActive);
  // }

  return (
    <div className="grow mt-6 max-lg:ml-[-160px] max-md:pt-4 z-10 pb-8 max-md:ml-0  max-md:mr-0">
      <div className="flex flex-col max-md:w-screen object-cover mt-2 items-center gap-1 ">
        <Story items={storyItems} />

        {viewPre && (
          <div className="flex  flex-col gap-6 max-md:w-screen max-w-[800px]">
            {posts.slice(0,14).map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
        )}
        <div className="dark:glass-bg flex flex-col gap-6 w-full max-w-[700px]">
          <Recommandetion />
        </div>
   
        <div className="dark:text-white flex flex-col gap-6 w-full max-w-[700px]">
          <SuggestedContent {...suggestedContent} />
        </div>

        {viewMore && (
          <div className=" flex dark:text-white  flex-col gap-6 w-full max-w-[700px]">
            {posts.slice(0,14).map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
