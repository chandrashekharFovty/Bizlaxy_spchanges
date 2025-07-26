// File: DynamicForm.tsx
import React from "react";
import { FieldHead, formHeadConfig, UserType } from "./FormConfig";
import InfoCrousel from "./InfoCrousel";
import CompanyForm from "./infoForms/CompanyForm";
import CreatorForm from "./infoForms/CreatorForm";
import LearnerForm from "./infoForms/LearnerForm";
import InvestorForm from "./infoForms/InvestorForm";
import StartupIdeaForm from "./infoForms/StartupIdeaForm";
import BusinessOwnerForm from "./infoForms/BusinessOwnerForm";
import StartupForm from "./infoForms/StartupForm";

const InfoBox = {
  company: [
    { title: "Busines", descp: "For all growing businesses to generate leads, build connections, raise funding, and sell products through the B2B marketplace — perfect for suppliers, manufacturers, and wholesalers." },
  ],
  investor: [
    { title: "Investor", descp: "For angels, VCs, or firms exploring high-potential startups and deal flow opportunities." },
  ],
  startup: [
    { title: "Startup", descp: "For aspiring founders with an idea. Validate, build, and explore funding and mentorship." },
  ],
  learner: [
    { title: "Learner", descp: "For students or professionals who want to learn from industry experts and real startup journeys." },
  ],
  startupidea: [
    { title: "Business Owner", descp: "For individual entrepreneurs or solopreneurs managing their own business operations." },
  ],
  businessowner: [
    { title: "Professionals", descp: "For working professionals exploring networking, upskilling, or freelance opportunities." },
  ],
  creator: [
    { title: "Content Creator", descp: "For creators sharing business insights, tips, or educational videos with the Bizlaxy community." },
  ],
};

const infoDataByUserType = {
  company: [
    { title: "Busines", descp: "For all growing businesses to generate leads, build connections, raise funding, and sell products through the B2B marketplace — perfect for suppliers, manufacturers, and wholesalers." },
  ],
  investor: [
    { title: "Investor", descp: "For angels, VCs, or firms exploring high-potential startups and deal flow opportunities." },
  ],
  startup: [
    { title: "Startup", descp: "For aspiring founders with an idea. Validate, build, and explore funding and mentorship." },
  ],
  learner: [
    { title: "Learner", descp: "For students or professionals who want to learn from industry experts and real startup journeys." },
  ],
  startupidea: [
    { title: "Business Owner", descp: "For individual entrepreneurs or solopreneurs managing their own business operations." },
  ],
  businessowner: [
    { title: "Professionals", descp: "For working professionals exploring networking, upskilling, or freelance opportunities." },
  ],
  creator: [
    { title: "Content Creator", descp: "For creators sharing business insights, tips, or educational videos with the Bizlaxy community." },
  ],
};

type Props = { userType: UserType };

export default function DynamicForm({ userType }: Props) {
  const headings = formHeadConfig[userType] || [];

  const formComponents = {
    company: <CompanyForm />,
    investor: <InvestorForm />,
    startup: <StartupForm />,
    learner: <LearnerForm />,
    startupidea: <StartupIdeaForm />,
    businessowner: <BusinessOwnerForm />,
    creator: <CreatorForm />,
  };

  const SelectedForm = formComponents[userType];
  const SelectedInfo = infoDataByUserType[userType] || InfoBox;

  return (
    <div className="flex flex-col md:flex-row min-w-screen overflow-hidden">
      {/* Left Side (Form Section) */}
      <div className="w-full md:w-8/12 md:mr-[33%] px-5 bg-white">
        {headings.map((heading: FieldHead, idx: number) => (
          <div
            key={idx}
            className="fixed  w-full md:w-[65%]  h-16 my-4 flex flex-col gap-2 z-30 pr-5"
          >
            <h3 className="text-2xl font-bold">{heading.formheading}</h3>
            <p className="text-sm text-gray-500">{heading.formdescription}</p>
          </div>
        ))}
     <div className="w-full min-h-[calc(100vh-56px)] md:min-h-screen overflow-y-auto px-4 mt-10 py-6">
  {SelectedForm}
</div>

      </div>

      {/* Right Side (InfoCrousel) - Hidden on mobile */}
      <div className="hidden md:flex w-4/12 h-screen fixed right-0 bg-gradient-to-r from-purple-500 to-blue-700 bg-opacity-60 backdrop-blur-lg text-white items-center justify-center">
        <div className="border border-white p-6 bg-white/10 w-full max-w-[350px] rounded-xl">
          <InfoCrousel InfoBoxes={SelectedInfo} />
        </div>
      </div>
    </div>
  );
}
