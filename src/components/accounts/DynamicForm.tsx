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
import ProfessionalForm from "./infoForms/ProfessionalForm";
import StartupForm from "./infoForms/StartupForm";

const InfoBox = {
  company: [
    {
      title: "Busines",
      descp:
        "For all growing businesses to generate leads, build connections, raise funding, and sell products through the B2B marketplace — perfect for suppliers, manufacturers, and wholesalers.",
    },
  ],
  investor: [
    {
      title: "Investor",
      descp:
        "For angels, VCs, or firms exploring high-potential startups and deal flow opportunities.",
    },
  ],
  startup: [
    {
      title: "Startup",
      descp:
        "For aspiring founders with an idea. Validate, build, and explore funding and mentorship.",
    },
  ],
  learner: [
    {
      title: "Learner",
      descp:
        "For students or professionals who want to learn from industry experts and real startup journeys.",
    },
  ],
  startupidea: [
    {
      title: "Business Owner",
      descp:
        "For individual entrepreneurs or solopreneurs managing their own business operations.",
    },
  ],
  businessowner: [
    {
      title: "professionals",
      descp:
        "For working professionals exploring networking, upskilling, or freelance opportunities.",
    },
  ],
  creator: [
    {
      title: "Content Creator",
      descp:
        "For creators sharing business insights, tips, or educational videos with the Bizlaxy community.",
    },
  ],
  professionals: [
    {
      title: "Professional",
      descp:
        "For all growing businesses to generate leads, build connections, raise funding, and sell products through the B2B marketplace — perfect for suppliers, manufacturers, and wholesalers.",
    },
  ],
};

const infoDataByUserType = {
  company: [
    {
      title: "Busines",
      descp:
        "For all growing businesses to generate leads, build connections, raise funding, and sell products through the B2B marketplace — perfect for suppliers, manufacturers, and wholesalers.",
    },
  ],
  investor: [
    {
      title: "Investor",
      descp:
        "For angels, VCs, or firms exploring high-potential startups and deal flow opportunities.",
    },
  ],
  startup: [
    {
      title: "Startup",
      descp:
        "For aspiring founders with an idea. Validate, build, and explore funding and mentorship.",
    },
  ],
  learner: [
    {
      title: "Learner",
      descp:
        "For students or professionals who want to learn from industry experts and real startup journeys.",
    },
  ],
  startupidea: [
    {
      title: "Business Owner",
      descp:
        "For individual entrepreneurs or solopreneurs managing their own business operations.",
    },
  ],
  businessowner: [
    {
      title: "Professionals",
      descp:
        "For working professionals exploring networking, upskilling, or freelance opportunities.",
    },
  ],
  creator: [
    {
      title: "Content Creator",
      descp:
        "For creators sharing business insights, tips, or educational videos with the Bizlaxy community.",
    },
  ],
  professionals: [
    {
      title: "Professional",
      descp:
        "For all growing businesses to generate leads, build connections, raise funding, and sell products through the B2B marketplace — perfect for suppliers, manufacturers, and wholesalers.",
    },
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
    professionals : <ProfessionalForm/>,
  };

  const SelectedForm = formComponents[userType];
  const SelectedInfo = infoDataByUserType[userType] || InfoBox;

  return (
    <div className="flex gap-5 min-w-screen overflow-hidden">
      {/* Left Side (Form Section) */}
      <div className="w-full flex flex-col gap-5 h-screen md:w-8/12 md:mr-[33%] max-[480px]:pr-0 max-[480px]:pl-0 pr-5 pl-10 bg-white">
        <div className="z-30 bg-white w-full">
        {headings.map((heading: FieldHead, idx: number) => (
          <div
            key={idx}
            className="fixed w-full md:w-[65%] h-16 my-4 flex flex-col gap-2 z-30 pr-5 pl-10"          >
            <h3 className="text-2xl bg-white max-[480px]:text-sm font-bold">{heading.formheading}</h3>
            <p className="text-sm  bg-white max-[480px]:text-xs text-gray-500">{heading.formdescription}</p>
          </div>
        ))}
        </div>
        <div className="w-full min-h-[calc(100vh-56px)] md:min-h-screen pr-5 pl-10 mt-10 max-lg:mt-20 py-6">
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
