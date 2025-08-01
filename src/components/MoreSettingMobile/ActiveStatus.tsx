import React, { useState } from 'react';
import { MdExpandLess } from 'react-icons/md';
import { Link } from 'react-router-dom';

function ActiveStatus() {
  const [isActive, setIsActive] = useState(true);

  const toggleSwitch = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="dark:dark-color">
      {/* Fixed header (mobile only) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:dark-color z-10 border-b-2 border-gray-200 dark:border-gray-700">
        <Link
          to="/settings"
          className="flex items-center font-semibold text-black dark:text-white py-4 px-4"
        >
          <MdExpandLess className="transform rotate-[-90deg] text-2xl" />
          <span className="font-bold text-xl ml-28">Active Status</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="lg:w-full lg:fixed dark:dark-color lg:top-0 w-screen h-screen">
       {/* Toggle Button */}
        <div className="flex mt-[80px] ">
            <h1 className=" ml-4 text-black dark:text-white text-2xl lg:text-3xl font-semibold">
          Show my active status
        </h1>
          <div
            onClick={toggleSwitch}
            className={` ml-6 w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                : 'bg-gray-400'
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                isActive ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </div>
        </div>
        <p className="pl-4 lg:text-xs text-sm pt-8 lg:pt-4 text-black dark:text-white">
          When turned on, your followers and connections can see when you're online<br/> or last active.
          When off, you won’t see others' activity status either.
        </p>

       
      </div>
    </div>
  );
}

export default ActiveStatus;
