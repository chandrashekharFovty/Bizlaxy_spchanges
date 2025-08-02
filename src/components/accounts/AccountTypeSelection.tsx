import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountOption from "./AccountOptions";
import InfoCrousel from "./InfoCrousel";

const options = [
  { id: "company", title: "Company", desc: "Get connected with tools and resources to grow your business.", tooltip: "Select this if your business is registered and in the early growth stage but not yet fully established." },
  { id: "investor", title: "Investor", desc: "Discover and track promising investment opportunities.", tooltip: "For angels, VCs, or firms exploring high-potential startups and deal flow opportunities." },
  { id: "startup", title: "Startup", desc: "Access funding, mentorship, and marketing support.", tooltip: "For early-stage or scaling startups seeking funding, partnerships, and growth support." },
  { id: "learner", title: "Learner", desc: "Gain knowledge through insights to enhance your skills.", tooltip: "For students or professionals who want to learn from industry experts and real startup journeys." },
  { id: "startupidea", title: "Startup Idea", desc: "Elevate your idea with funding and expert guidance.", tooltip: "For aspiring founders with an idea. Validate, build, and explore funding and mentorship." },
  { id: "businessowner", title: "Business Owner", desc: "Gain knowledge through insights to enhance your skills.", tooltip: "For individual entrepreneurs or solopreneurs managing their own business operations." },
  { id: "professionals", title: "Professionals", desc: "Elevate your idea with funding and expert guidance.", tooltip: "For working professionals exploring networking, upskilling, or freelance opportunities." },
  { id: "creator", title: "Content Creator", desc: "Elevate your idea with funding and expert guidance.", tooltip: "For creators sharing business insights, tips, or educational videos with the Bizlaxy community." }
];

const InfoBox = {
  company: [{ title: "Business", descp: "For all growing businesses to generate leads, build connections, raise funding, and sell products through the B2B marketplace — perfect for suppliers, manufacturers, and wholesalers." }],
  investor: [{ title: "Investor", descp: "For angels, VCs, or firms exploring high-potential startups and deal flow opportunities." }],
  startup: [{ title: "Startup", descp: "For early-stage or scaling startups seeking funding, partnerships, and growth support." }],
  learner: [{ title: "Learner", descp: "For students or professionals who want to learn from industry experts and real startup journeys." }],
  startupidea: [{ title: "Startup Idea", descp: "Validate your idea with expert guidance and community feedback." }],
  businessowner: [{ title: "Business Owner", descp: "For individual entrepreneurs or solopreneurs managing their own business operations." }],
  creator: [{ title: "Content Creator", descp: "For creators sharing business insights, tips, or educational videos with the Bizlaxy community." }],
  professionals: [{ title: "Professionals", descp: "For working professionals exploring networking, upskilling, or freelance opportunities." }],
  default: [
  { title: "Business", descp: "For all growing businesses to generate leads, build connections, raise funding, and sell products through the B2B marketplace — perfect for suppliers, manufacturers, and wholesalers." },
  { title: "Investor", descp: "For angels, VCs, or firms exploring high-potential startups and deal flow opportunities." },
 { title: "Startup", descp: "For early-stage or scaling startups seeking funding, partnerships, and growth support." },
 { title: "Learner", descp: "For students or professionals who want to learn from industry experts and real startup journeys." },
{ title: "Startup Idea", descp: "Validate your idea with expert guidance and community feedback." },
 { title: "Business Owner", descp: "For individual entrepreneurs or solopreneurs managing their own business operations." },
{ title: "Content Creator", descp: "For creators sharing business insights, tips, or educational videos with the Bizlaxy community." },
  { title: "Professionals", descp: "For working professionals exploring networking, upskilling, or freelance opportunities." },
  ]
};

const SelectAccountType = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // Show selected info or default info
  const selectedInfo = selected ? InfoBox[selected] || InfoBox.default : InfoBox.default;

  return (
   <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
  {/* Right Side (Dynamic InfoCrousel) */}
  <div className="hidden md:flex w-4/12 h-screen fixed right-0 top-0 bg-gradient-to-r from-purple-500 to-blue-700 bg-opacity-60 backdrop-blur-lg text-white items-center justify-center">
    <div className="border border-white p-6 bg-white/10 w-full max-w-[350px] rounded-xl">
      <InfoCrousel InfoBoxes={selectedInfo} />
    </div>
  </div>

  {/* Left Side (Main Content) */}
  <div className="flex flex-col w-full md:w-8/12 md:mr-[35%] bg-white h-screen">
    {/* Header */}
    <div className="sticky top-0  py-4 pr-5 pl-12 z-20">
      <h3 className="text-xl md:text-2xl font-bold text-center md:text-left">
        Select Account Type
      </h3>
      <p className="text-sm md:text-base text-gray-500 text-center md:text-left">
        We’ll use this to personalize your experience and unlock relevant features.
      </p>
    </div>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto scrollbar-hide pr-5 pl-12 py-4">
      <div className="flex flex-col gap-5">
        {options.map((opt, idx) => (
          <AccountOption
            key={idx}
            id={opt.id}
            title={opt.title}
            tooltip={opt.tooltip}
            desc={opt.desc}
            selected={selected === opt.id}
            onClick={() => setSelected(opt.id)}
          />
        ))}
      </div>
    </div>

    {/* Footer Button */}
    <div className="sticky bottom-0 bg-white px-5 py-3 flex justify-end">
      {selected ? (
        <button
          className="w-32 md:w-40 h-12 md:h-14 cursor-pointer px-6 py-2 text-lg rounded-xl text-white font-semibold bg-blue-700 hover:bg-blue-800 transition-all"
          onClick={() => navigate("/infoform", { state: { userType: selected } })}
        >
          Next
        </button>
      ) : (
        <button
          className="w-32 md:w-40 h-12 md:h-14 px-6 py-2 text-lg rounded-xl text-white font-semibold bg-gray-300 cursor-not-allowed"
        >
          Next
        </button>
      )}
    </div>
  </div>
</div>

  );
};

export default SelectAccountType;
