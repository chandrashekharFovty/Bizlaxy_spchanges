import React, { useState } from "react";
export const FollowButton: React.FC = () => {
    const [isFollowing, setIsFollowing] = useState(false);

  return (
    <button
      onClick={() => setIsFollowing(!isFollowing)}
      className={`px-1 py-1 text-sm font-semibold ${
        isFollowing ? " text-[#1C4BC4] dark:text-white" : "dark:text-white text-[#1C4BC4]"
      }`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};
export const FollowButtonCard: React.FC = () => {
    const [isFollowing, setIsFollowing] = useState(false);

  return (
    <button
      onClick={() => setIsFollowing(!isFollowing)}
      className={` text-xs font-mediam text-center h-4 w-16 ${
        isFollowing ? "text-white " : "text-white"
      }`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};


