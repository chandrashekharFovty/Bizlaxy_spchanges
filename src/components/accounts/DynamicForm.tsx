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

const InfoBox = [
  {
    title: "Connect & Grow Together",
    descp:
      "Build meaningful social and professional connections, explore, chat, and collaborate with like-minded people.",
  },
  {
    title: "Explore New Opportunities",
    descp: "Find events, groups, and collaborations.",
  },
  {
    title: "Share & Learn",
    descp: "Share insights, ask questions, and grow your knowledge.",
  },
];

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

  return (
    <div className="flex max-md:flex-col  min-w-screen scrollbar-hide overflow-hidden">
      {/* Left side */}
      <div className="max-w-3xl max-md:hidden w-4/12 max-md:w-screen h-screen max-md:pt-1  fixed bg-gradient-to-r from-purple-500 to-blue-700 bg-opacity-60 backdrop-blur-lg text-white flex overflow-hidden items-center justify-center">
       <div className="border border-white p-6 bg-white/10 w-[400px] rounded-xl">
               <InfoCrousel InfoBoxes={InfoBox} />
           </div>
           </div>
      {/* Right side */}
      <div className="w-9/12 ml-[35%] px-5 max-md:w-screen max-md:mx-auto bg-white">
        {headings.map((heading: FieldHead, idx: number) => (
          <div
            key={idx}
            className="fixed bg-white w-full h-14 my-4 max-md:my-2 flex flex-col gap-2 z-30"
          >
            <h3 className="text-2xl font-bold max-md:text-[16px]">{heading.formheading}</h3>
            <p className="text-sm max-md:text-xs font-normal text-gray-500">
              {heading.formdescription}
            </p>
          </div>
        ))}
        <div className="w-full overflow-scroll scrollbar-hide mt-20 py-2 flex flex-col gap-5 z-10">
          {SelectedForm}
        </div>
      </div>
    </div>
  );
}
