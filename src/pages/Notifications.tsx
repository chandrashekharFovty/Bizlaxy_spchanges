import { RightSidebar } from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/Sidebar";
import Notifications from "@/components/notifications/Notifications";
import React from "react";

const Notofications = () => {
  return (
   <>
  <div className="dark:dark-color w-full h-screen flex flex-col lg:flex-row overflow-hidden">
    {/* Main Notification Area */}
    <div className="w-full lg:w-full px-4 py-6 overflow-x-hidden z-10">
      <Notifications />
    </div>

    {/* Optional Right Sidebar for Desktop */}
    {/* <div className="max-md:hidden  lg:block lg:w-[350px] h-full bg-white dark:bg-dark shadow-lg"> */}
      {/* <RightSidebar /> */}
    {/* </div> */}
  </div>
</>

  );
};

export default Notofications;
