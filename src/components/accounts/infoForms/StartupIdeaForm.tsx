// CompanyForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { MultiSelect } from "react-multi-select-component";
// import "react-multiple-select-dropdown-lite/dist/index.css";
import "../../../customDropDwon.css"; // Assuming you have some custom styles
import MultiSelectDropdown, {
  OptionType,
} from "../../../hooks/MultiSelectDropdown";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoArrowUndoCircle } from "react-icons/io5";

// import type { ICountry, IState, ICity } from "country-state-city";
//type OptionType = { label: string; value: string };
// Options for MultiSelect businessType, industrySector, and businessModel
const businessTypes = [
  { label: "Physical Product", value: "physical_product" },
  { label: "Service Provider", value: "service_provider" },
  { label: "Supplier", value: "supplier" },
  { label: "Manufacturer", value: "manufacturer" },
  { label: "Distributor", value: "distributor" },
  { label: "Wholesaler", value: "wholesaler" },
  { label: "Retailer", value: "retailer" },
  { label: "Trader", value: "trader" },
  { label: "Importer", value: "importer" },
  { label: "Exporter", value: "exporter" },
  { label: "Other", value: "other" },
];
// Options for MultiSelect businessType, industrySector, and businessModel
const industrySectors = [
  { label: "Drugs & Pharmaceuticals", value: "drugs_pharmaceuticals" },
  { label: "Hospital & Diagnostics", value: "hospital_diagnostics" },
  { label: "Food & Beverages", value: "food_beverages" },
  {
    label: "Industrial Plants & Machinery",
    value: "industrial_plants_machinery",
  },
  { label: "Industrial Supplies", value: "industrial_supplies" },
  { label: "Building & Construction", value: "building_construction" },
  { label: "Apparel & Garments", value: "apparel_garments" },
  { label: "Electronics & Electrical", value: "electronics_electrical" },
  { label: "Packaging Machines & Goods", value: "packaging_machines_goods" },
  { label: "Chemicals, Dyes & Solvents", value: "chemicals_dyes_solvents" },
  { label: "Mechanical Parts & Spares", value: "mechanical_parts_spares" },
  { label: "Lab Instruments & Supplies", value: "lab_instruments_supplies" },
  { label: "Furniture & Supplies", value: "furniture_supplies" },
  { label: "Automobile, Parts & Spares", value: "automobile_parts_spares" },
  { label: "Agriculture & Farming", value: "agriculture_farming" },
  { label: "Housewares & Supplies", value: "housewares_supplies" },
  { label: "Metals, Alloys & Minerals", value: "metals_alloys_minerals" },
  { label: "Hand & Machine Tools", value: "hand_machine_tools" },
  { label: "Handicrafts & Decoratives", value: "handicrafts_decoratives" },
  {
    label: "Kitchen Utensils & Appliances",
    value: "kitchen_utensils_appliances",
  },
  { label: "Textiles, Yarn & Fabrics", value: "textiles_yarn_fabrics" },
  { label: "Books & Stationery", value: "books_stationery" },
  { label: "Cosmetics & Personal Care", value: "cosmetics_personal_care" },
  { label: "Home Textile & Furnishing", value: "home_textile_furnishing" },
  { label: "Engineering Services", value: "engineering_services" },
  { label: "Gems & Jewelry", value: "gems_jewelry" },
  { label: "Computer & IT Solutions", value: "computer_it_solutions" },
  { label: "Fashion Accessories & Gear", value: "fashion_accessories_gear" },
  { label: "Herbal & Ayurvedic Products", value: "herbal_ayurvedic_products" },
  { label: "Security Systems & Services", value: "security_systems_services" },
  { label: "Sports Goods, Toys & Games", value: "sports_toys_games" },
  { label: "Telecom Equipment & Goods", value: "telecom_equipment_goods" },
  { label: "Paper & Paper Products", value: "paper_paper_products" },
  { label: "Bags, Belts & Wallets", value: "bags_belts_wallets" },
  { label: "Media, PR & Publishing", value: "media_pr_publishing" },
  { label: "IT & Telecom Services", value: "it_telecom_services" },
  { label: "Transportation & Logistics", value: "transportation_logistics" },
  { label: "Business & Audit Services", value: "business_audit_services" },
  { label: "Financial & Legal Services", value: "financial_legal_services" },
  { label: "Call Center & BPO Services", value: "call_center_bpo_services" },
  { label: "Bicycle, Rickshaw & Spares", value: "bicycle_rickshaw_spares" },
  { label: "R&D and Testing Labs", value: "rnd_testing_labs" },
  { label: "Architecture & Interiors", value: "architecture_interiors" },
  { label: "HR Planning & Recruitment", value: "hr_planning_recruitment" },
  { label: "Rail, Shipping & Aviation", value: "rail_shipping_aviation" },
  { label: "Leather Products", value: "leather_products" },
  { label: "Electronics Components", value: "electronics_components" },
  { label: "Electrical Equipment", value: "electrical_equipment" },
  {
    label: "Hospital, Clinic & Consultation",
    value: "hospital_clinic_consultation",
  },
  { label: "Other", value: "other" },
];
// Options for MultiSelect businessType, industrySector, and businessModel
const businessModels = [
  { label: "Business to Consumer (B2C)", value: "b2c" },
  { label: "Business to Business (B2B)", value: "b2b" },
  { label: "E‑Commerce", value: "e_commerce" },
  { label: "Direct to Consumer (D2C)", value: "d2c" },
  { label: "Consumer to Consumer (C2C)", value: "c2c" },
  { label: "Business to Government (B2G)", value: "b2g" },
  // { label: "Software as a Service (SaaS)", value: "saas" },
  // { label: "Recurring Revenue Model (Subscription)", value: "subscription" },
  // { label: "Buyer-Seller Platform (Marketplace)", value: "marketplace" },
  // { label: "Ad Revenue Model (Advertising Based)", value: "advertising_based" },
  // { label: "Licensed Business Model (Franchise)", value: "franchise" },
  { label: "Other", value: "other" },
];


type Form = {
  startupIdeaName: string;
  businessType: string[];
  industrySector: string[];
  businessModel: string[];
  companyStage: string;
   fundingCurrency: string;
  minFunding: string;
  maxFunding: string;
  startupIdeaDescription:string,
  country: string;
  state: string;
  city: string;
  referrals: string[];
};

type Errors = Partial<Record<keyof Form, string>>;
type Touched = Partial<Record<keyof Form, boolean>>;

const CompanyForm: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
    const [selectedCurrency, setSelectedcurrency] = useState("");
    const [showFundField, setShowFundField] = useState(false);
  const [open, setOpen] = useState(false);
  const [skippedFields, setSkippedFields] = useState<
    Partial<Record<keyof Form, boolean>>
  >({});



  useEffect(() => {
    fetch("/countries_states_cities.json") // remove ../../.. for public/ path
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load countries:", err));
  }, []);

  const [form, setForm] = useState<Form>({
    startupIdeaName: "",
    businessType: [],
    industrySector: [],
    businessModel: [],
    companyStage: "",
     fundingCurrency: "",
    minFunding: "",
    maxFunding: "",
    startupIdeaDescription : "",
    country: "",
    state: "",
    city: "",
    referrals: [],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [businessvalue, setbusinessvalue] = useState([]);
  const [industryvalue, setindustryvalue] = useState([]);
  const [valuebusinessModel, setvaluebusinessModel] = useState([]);
  
  form.businessType = businessvalue;
  form.industrySector = industryvalue;
  form.businessModel = valuebusinessModel;

  const validators: Record<keyof Form, (v: any) => string> = {
    startupIdeaName : (v) => (v.length < 3 ? "At least 5 characters required" : ""),
    businessType: (v) => (!v ? "Pick at least one" : ""),
    industrySector: (v) => (!v ? "Pick at least one" : ""),
    businessModel: (v) => (!v ? "Pick at least one" : ""),
    companyStage: (v) => (!v ? "Please select a stage" : ""),
    fundingCurrency: (v) =>
      skippedFields.fundingCurrency ? "" : !v ? "Required" : "",
    minFunding: (v) => (skippedFields.minFunding ? "" : !v ? "Required" : ""),
    maxFunding: (v) => {
      if (skippedFields.maxFunding) return "";
      if (!v) return "Required";
      if (form.minFunding && Number(v) < Number(form.minFunding))
        return "Max must be ≥ Min";
      return "";
    },
    startupIdeaDescription: (v) => (v.length < 10 ? "At least 10 characters required" : ""),
    country: (v) => (!v ? "Required" : ""),
    state: (v) => (!v ? "Required" : ""),
    city: (v) => (!v ? "Required" : ""),
    referrals: (v) => (v.length === 0 ? "Pick at least one" : ""),
  };

  const validateField = (name: keyof Form, value: any) => {
    const err = validators[name](value);
    setErrors((prev) => ({ ...prev, [name]: err }));
    return err;
  };

  const isValid = Object.keys(validators).every((key) => {
    const k = key as keyof Form;
    return !validators[k](form[k]);
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof Form;

    const updatedValue =
      type === "checkbox"
        ? form.referrals.includes(value)
          ? form.referrals.filter((r) => r !== value)
          : [...form.referrals, value]
        : value;

    setForm((prev) => ({ ...prev, [key]: updatedValue }));

    if (touched[key]) {
      validateField(key, updatedValue);
      if (key === "minFunding") {
        validateField("maxFunding", form.maxFunding);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    const key = e.target.name as keyof Form;
    setTouched((prev) => ({ ...prev, [key]: true }));
    validateField(key, form[key]);
  };

  const handleStageSelect = (stage: string) => {
    setForm((prev) => ({ ...prev, companyStage: stage }));
    setTouched((prev) => ({ ...prev, companyStage: true }));
    validateField("companyStage", stage);
  };
  //Progress bar simulation
   const progressbarArray = Object.keys(form).map((key) => {
    const k = key as keyof Form;
    return skippedFields[k] ? 1 : form[k] ? 1 : 0;
  });
  const progress = progressbarArray.reduce((acc, curr) => acc + curr, 0);
  const progressPercentage = (progress / progressbarArray.length) * 100;
  console.log("Progress Percentage:", progressPercentage);
  // Simulate progress bar width
  const progressBarWidth = `${Math.min(progressPercentage, 100)}%`;
  //console.log("Progress Bar Width:", progressBarWidth);

  // Update the width of the progress bar dynamically
  //console.log("Progress Bar Style:", progressBarStyle);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // run full validation
    (Object.keys(validators) as (keyof Form)[]).forEach((k) => {
      setTouched((prev) => ({ ...prev, [k]: true }));
      validateField(k, form[k]);
    });
    if (!isValid) return;

    const fd = new FormData(e.currentTarget);
    //console.log("FormData:", Object.fromEntries(fd.entries()));
    // Use the progressBarStyle in your JSX if needed
    // For example, you can apply it to a div or a progress bar component
    //console.log("Is Valid:", isValid);
    console.log("Form Data:", form);
    navigate("/feed");
  };

  return (
    <>
      <div className="w-full h-auto">
        <div className="fixed w-full flex gap-1">
          {progressbarArray.map((_, index) => (
            <div
              className="w-[5.8%] bg-gray-200 rounded-full h-2.5 mb-4"
              key={index}
            >
              <div
                className={`btn-gradient h-2.5 rounded-full bg-indigo-500 ${
                  index < progress ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
          ))}
        </div>
        <form
          onSubmit={onSubmit}
          encType="multipart/form-data"
          className="w-full overflow-scroll scrollbar-hide mt-[4%] h-[600px] flex flex-col gap-5 z-10"
        >
          <div className="w-[97%] overflow-scroll scrollbar-hide mt-[3%] h-[600px] flex flex-col gap-5 z-10">
            {/* Company Name */}
            <div className="w-full  flex flex-col mx-auto">
              <label className="text-sm font-medium">Startup Name</label>
              <input
                name="startupIdeaName"
                value={form.startupIdeaName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Please Enter your startup idea here"
                className="w-full h-[60px] placeholder:text-[#707070] mt-2 outline-[#BED3FF] border border-[#BED6FF] rounded-xl px-7 text-sm"
              />
              {errors.startupIdeaName && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.startupIdeaName}
                </div>
              )}
            </div>

            {/* Business Type */}
            <div className="w-full  flex flex-col mx-auto">
              {/* <label className="text-sm font-medium">Business Type</label> */}
              {/* MultiSelect Component */}
              <div className="w-full mt-2">
                <MultiSelectDropdown
                  label="Business Type"
                  options={businessTypes}
                  value={businessvalue}
                  onChange={setbusinessvalue}
                  placeholder="Select Business type"
                  error={errors.businessType}
                  
                />
              </div>

              {errors.businessType && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.businessType}
                </div>
              )}
            </div>

            {/* Industry Sector */}
            <div className="w-full  flex flex-col mx-auto">
              {/* <label className="text-sm font-medium">Industry & Sector</label> */}
              {/* MultiSelect Component */}
              <div className="w-full mt-2">
                <MultiSelectDropdown
                  label="Industry & Sector"
                  options={industrySectors}
                  value={industryvalue}
                  onChange={setindustryvalue}
                  placeholder="Select Industry&Sector"
                  error={errors.industrySector}
                  
                />
              </div>

              {errors.industrySector && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.industrySector}
                </div>
              )}
            </div>

            {/* Business Model */}
            <div className="w-full  flex flex-col mx-auto">
              {/* <label className="text-sm font-medium">Business Model</label> */}
              {/* MultiSelect Component */}
              <div className="w-full mt-2">
                <MultiSelectDropdown
                  label="Business Model"
                  options={businessModels}
                  value={valuebusinessModel}
                  onChange={setvaluebusinessModel}
                  placeholder="Select Business Model"
                  error={errors.businessModel}
                  
                />
              </div>

              {errors.businessModel && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.businessModel}
                </div>
              )}
            </div>
            {/* Stage */}
            <div className="w-full flex flex-col mx-auto">
              <label className="text-sm font-medium">Stage</label>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleStageSelect("Early")}
                  className={`px-3 py-2 rounded-[6px] w-auto ${
                    form.companyStage === "Early"
                      ? "btn-gradient text-white"
                      : "bg-[#EAF6FF]"
                  } border border-[#BED6FF] text-sm`}
                >
                  Early Stage
                </button>
                {/* <button
                  type="button"
                  onClick={() => handleStageSelect("Growth")}
                  className={`px-3 py-2 rounded-[6px] w-auto ${
                    form.companyStage === "Growth"
                      ? "btn-gradient text-white"
                      : "bg-[#EAF6FF]"
                  } border border-[#BED6FF] text-sm`}
                >
                  Growth Stage
                </button>
                <button
                  type="button"
                  onClick={() => handleStageSelect("Mature")}
                  className={`px-3 py-2 rounded-[6px] w-auto ${
                    form.companyStage === "Mature"
                      ? "btn-gradient text-white"
                      : "bg-[#EAF6FF]"
                  } border border-[#BED6FF] text-sm`}
                >
                  Mature Stage
                </button> */}
              </div>
              {errors.companyStage && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.companyStage}
                </div>
              )}
            </div>
             {showFundField ? (
              // <span
              //   className="text-indigo-600 cursor-pointer ml-5 hover:underline"
              //   onClick={() => setShowFundField(false)}
              // >
              //   Undo
              // </span>
              ""
            ) : (
              <div className="w-full flex flex-col mx-auto">
                <label className="text-sm font-medium">
                  Amount Required for Funding{" "}
                  <span
                    className="text-indigo-600 cursor-pointer ml-5 hover:underline"
                    onClick={() => {
                      setSkippedFields((prev) => ({
                        ...prev,
                        fundingCurrency: true,
                        minFunding: true,
                        maxFunding: true,
                      }));
                      setShowFundField(true), setOpen(true);
                    }}
                  >
                    Skip
                  </span>
                </label>
                <div className="w-full h-[46px] flex flex-row justify-between items-center mt-3">
                  {/* Funding Range: Min */}
                  <div className="w-4/12 flex flex-col">
                    <input
                      type="number"
                      name="minFunding"
                      placeholder="Min"
                      value={form.minFunding}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full h-[46px] placeholder:text-[#707070] mt-2 outline-[#BED3FF] border border-[#BED6FF] rounded-xl text-center text-sm"
                    />
                    {errors.minFunding && (
                      <div className="text-red-500 text-sm">
                        {errors.minFunding}
                      </div>
                    )}
                  </div>
                  {/* Currency for funding */}
                  <div className="w-2/12 h-[46px]">
                    <select
                      name="currency"
                      id="currency"
                      value={selectedCurrency}
                      onChange={(e) => {
                        setSelectedcurrency(e.target.value);
                        setForm((prev) => ({
                          ...prev,
                          fundingCurrency: e.target.value,
                        }));
                        setTouched((prev) => ({
                          ...prev,
                          fundingCurrency: true,
                        }));
                        validateField("fundingCurrency", e.target.value);
                      }}
                      onBlur={handleBlur}
                      className="w-full h-full text-[#707070] mt-1 outline-[#BED3FF] border border-[#BED6FF] rounded-xl text-center text-sm"
                    >
                      <option value="" disabled>
                        Select Currency
                      </option>
                      {data.map((c: any) => (
                        <option
                          key={c.countryCode}
                          value={c.currency}
                          className="text-black"
                        >
                          {c.currency}{" "}
                          <span className="text-red-800 ml-3">
                            {c.currency_symbol}
                          </span>
                        </option>
                      ))}
                    </select>
                    {errors.fundingCurrency && (
                      <div className="text-red-500 text-sm">
                        {errors.fundingCurrency}
                      </div>
                    )}
                  </div>
                  {/* Funding Range: Max */}
                  <div className="w-4/12 flex flex-col">
                    <input
                      type="number"
                      name="maxFunding"
                      placeholder="Max"
                      value={form.maxFunding}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full h-[46px] placeholder:text-[#707070] mt-2 outline-[#BED3FF] border border-[#BED6FF] rounded-xl text-center  text-sm"
                    />
                    {errors.maxFunding && (
                      <div className="text-red-500 text-sm">
                        {errors.maxFunding}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* Company Name */}
            <div className="w-full  flex flex-col mx-auto">
              <label className="text-sm font-medium">Tell Us About Company</label>
              <input
              type="textArea"
                name="startupIdeaDescription"
                value={form.startupIdeaDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your company Description here"
                className="w-full h-[60px] placeholder:text-[#707070] mt-2 outline-[#BED3FF] border border-[#BED6FF] rounded-xl px-7 text-sm"
              />
              {errors.startupIdeaDescription && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.startupIdeaDescription}
                </div>
              )}
            </div>

            {/* Country */}
            <div className="w-full flex flex-col mx-auto">
              <label className="text-sm font-medium">Country</label>
              <select
                name="country"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedState(""); // reset state
                  setForm((prev) => ({
                    ...prev,
                    country: e.target.value,
                    state: "",
                    city: "",
                  }));
                  setTouched((prev) => ({ ...prev, country: true }));
                  validateField("country", e.target.value);
                }}
                onBlur={handleBlur}
                className="mt-2 w-full h-[60px] outline-[#BED6FF] placeholder:text-[#707070] text-[#707070] border border-[#BED6FF] rounded-xl px-7 text-sm"
              >
                <option value="" disabled>
                  Select Country
                </option>
                {data.map((c: any) => (
                  <option key={c.countryCode} value={c.name} className="text-black">
                    {c.name} {c.flag ? `(${c.flag})` : ""}
                  </option>
                ))}
              </select>
              {errors.country && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.country}
                </div>
              )}
            </div>

            {/* State */}
            <div className="w-full  flex flex-col mx-auto">
              <label className="text-sm font-medium">State</label>
              <select
                name="state"
                value={selectedState}
                onChange={(e) => {
                  const stateVal = e.target.value;
                  setSelectedState(stateVal);
                  setForm((prev) => ({
                    ...prev,
                    state: stateVal,
                    city: "", // reset city
                  }));
                  setTouched((prev) => ({ ...prev, state: true }));
                  validateField("state", stateVal);
                }}
                onBlur={handleBlur}
                className="mt-2 w-full h-[60px] outline-[#BED6FF] placeholder:text-[#707070] text-[#707070] border border-[#BED6FF] rounded-xl px-7 text-sm"
              >
                <option value="" disabled>
                  Select State
                </option>
                {/* Render states from selected country */}
                {data
                  .find((c) => c.name === selectedCountry)
                  ?.states?.map((state: any, idx: number) => (
                    <option key={idx} value={state.name} className="text-black">
                      {state.name}
                    </option>
                  ))}
              </select>
              {errors.state && (
                <div className="text-red-500 text-sm mt-1">{errors.state}</div>
              )}
            </div>

            {/* City */}
            <div className="w-full  flex flex-col mx-auto">
              <label className="text-sm font-medium">City</label>
              <select
                name="city"
                value={form.city}
                onChange={(e) => {
                  const cityVal = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    city: cityVal,
                  }));
                  setTouched((prev) => ({ ...prev, city: true }));
                  validateField("city", cityVal);
                }}
                onBlur={handleBlur}
                className="mt-2 w-full h-[60px] outline-[#BED6FF] placeholder:text-[#707070] text-[#707070] border border-[#BED6FF] rounded-xl px-7 text-sm"
              >
                <option value="" disabled>
                  Select City
                </option>
                {data
                  .find((country) => country.name === selectedCountry)
                  ?.states.find((state) => state.name === selectedState)
                  ?.cities.map((city: any, idx: number) => (
                    <option key={idx} value={city.name} className="text-black">
                      {city.name}
                    </option>
                  ))}
              </select>
              {errors.city && (
                <div className="text-red-500 text-sm mt-1">{errors.city}</div>
              )}
            </div>

            {/* Referrals */}
            <div className="w-full  flex flex-col mx-auto">
              <fieldset className="w-full h-[60px] flex flex-col gap-2">
                <legend className="text-sm font-medium mb-2">
                  How did you hear about us?
                </legend>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="referrals"
                    value="Facebook"
                    checked={form.referrals.includes("Facebook")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="btn-gradient"
                  />{" "}
                  Facebook
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="referrals"
                    value="Instagram"
                    checked={form.referrals.includes("Instagram")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                     className="btn-gradient"
                  />{" "}
                  Instagram
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="referrals"
                    value="YouTube"
                    checked={form.referrals.includes("YouTube")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                     className="btn-gradient"
                  />{" "}
                  YouTube
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="referrals"
                    value="Friend"
                    checked={form.referrals.includes("Friend")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                     className="btn-gradient"
                  />{" "}
                  Friend
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="referrals"
                    value="Others"
                    checked={form.referrals.includes("Others")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                     className="btn-gradient"
                  />{" "}
                  Others
                </label>
              {errors.referrals && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.referrals}
                </div>
              )}
              </fieldset>
            </div>
          </div>
        {/* Submit */}
        <div className="h-20 w-full">
          <div className="w-[97%] h-full flex justify-end">
            <button
              onClick={() => {
                onSubmit;
              }}
              type="submit"
              disabled={!isValid}
              className={`w-[122px] h-[51px] rounded-xl font-semibold text-lg ${
                isValid
                  ? "bg-[#1C4BC4] text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
        </form>
        <Dialog open={open} onClose={() => {}} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-transparent transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg text-left transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div
                  id="alert-additional-content-4"
                  className="p-4 mb-4 text-white flex gap-3 items-center border rounded-lg btn-gradient dark:bg-gray-800"
                  role="alert"
                >
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 w-4 h-4 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-sm font-medium">
                      Are you sure you want to skip the funding details?
                    </h3>
                  </div>

                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => {
                        setSkippedFields((prev) => ({
                          ...prev,
                          fundingCurrency: false,
                          minFunding: false,
                          maxFunding: false,
                        }));
                        setShowFundField(false), setOpen(false);
                      }}
                      className="text-white bg-[#1C4BC4]  focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-2 me-2 text-center inline-flex items-center dark:bg-gray-800 dark:focus:ring-yellow-800"
                    >
                      Undo
                      <IoArrowUndoCircle className="ml-2 w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSkippedFields((prev) => ({
                          ...prev,
                          fundingCurrency: true,
                          minFunding: true,
                          maxFunding: true,
                        }));
                        setShowFundField(true), setOpen(false);
                      }}
                      className="text-white bg-[#1C4BC4] dark:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-2 me-2 text-center inline-flex items-center"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default CompanyForm;