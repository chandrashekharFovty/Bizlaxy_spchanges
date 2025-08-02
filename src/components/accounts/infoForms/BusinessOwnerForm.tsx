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



type Form = {
  businessName: string;
  businessType: string[];
  industrySector: string[];
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

  useEffect(() => {
    fetch("/countries_states_cities.json") // remove ../../.. for public/ path
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load countries:", err));
  }, []);


  const [form, setForm] = useState<Form>({
    businessName: "",
    businessType: [],
    industrySector: [],
    country: "",
    state: "",
    city: "",
    referrals: [],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [businessvalue, setbusinessvalue] = useState([]);
  const [industryvalue, setindustryvalue] = useState([]);

// Add these inside your component above the return statement:

  const handleOnindustrySelect = (selected: any[]) => {
    setindustryvalue(selected);
    setForm((prev) => ({
      ...prev,
      industrySector: selected,
    }));
    setTouched((prev) => ({ ...prev, industrySector: true }));
    validateField("industrySector", selected);
  };
  form.businessType = businessvalue;
  form.industrySector = industryvalue;
  // form.businessModel = valuebusinessModel;

  const validators: Record<keyof Form, (v: any) => string> = {
    businessName: (v) => (v.length < 3 ? "At least 5 characters required" : ""),
    businessType: (v) => (!v ? "Pick at least one" : ""),
    industrySector: (v) => (!v ? "Pick at least one" : ""),
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

   
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    const key = e.target.name as keyof Form;
    setTouched((prev) => ({ ...prev, [key]: true }));
    validateField(key, form[key]);
  };

 
  //Progress bar simulation
  const progressbarArray = Object.keys(form).map((key) => {
    key = key as keyof Form;
    return form[key] ? 1 : 0;
  });
  const progress = progressbarArray.reduce((acc, curr) => acc + curr, 0);
  const progressPercentage = (progress / progressbarArray.length) * 100;
  console.log("Progress Percentage:", progressPercentage);
  // Simulate progress bar width
  const progressBarWidth = `${Math.min(progressPercentage, 100)}%`;
 

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // run full validation
    (Object.keys(validators) as (keyof Form)[]).forEach((k) => {
      // setTouched((prev) => ({ ...prev, [k]: true }));
      validateField(k, form[k]);
    });
    if (!isValid) return;

    const fd = new FormData(e.currentTarget);

    console.log("Form Data:", form);
    navigate("/feed");
  };

  return (
    <>
    <div className="w-full h-[100%] flex flex-col">
        <div className="fixed w-[60%] flex gap-1 max-lg:mt-2 max-xl:mt-5">
          {progressbarArray.map((_, index) => (
            <div
              className="w-1/12 bg-gray-200 rounded-full h-2.5 mb-4 "
              key={index}
            >
              <div
                className={`btn-gradient h-2.5 rounded-full  ${
                  index < progress ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
          ))}
        </div>

      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="w-full overflow-scroll scrollbar-hide mt-[4%] flex flex-col gap-10 z-10">
      
      <div className="w-[97%] h-[100%] overflow-scroll scrollbar-hide mt-[3%] flex flex-col gap-5 z-10">

        {/* Company Name */}
        <div className="w-full flex flex-col mx-auto">
          <label className="text-sm font-medium">Company Name</label>
          <input
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            // onBlur={handleBlur}
            placeholder="Enter your comapny name here"
            className="w-full h-[60px] placeholder:text-[#707070] mt-2 outline-[#BED3FF] border border-[#BED6FF] rounded-xl px-7 text-sm"
          />
          {errors.businessName && (
            <div className="text-red-500 text-sm mt-1">
              {errors.businessName}
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
              <label className="text-sm font-medium">Industry & Sector</label>
              {/* MultiSelect Component */}
              <div className="w-full mt-2 ">
                {/* <MultiSelect
                  options={industrySectors}
                  selectedValues={industryvalue}
                  onSelect={handleOnindustrySelect}
                  onRemove={handleOnindustryRemove}
                  showCheckbox
                  showArrow
                  avoidHighlightFirstOption
                  placeholder="Select Industry&Sector type"
                  className="custom-multiselect w-full h-[60px] placeholder:text-[#707070] mt-2 outline-[#BED3FF] border border-[#BED6FF] rounded-xl px-4 text-sm"
                /> */}
                <MultiSelect
                  options={industrySectors}
                  value={industryvalue}
                  onChange={handleOnindustrySelect}
                  labelledBy="Select Industry & Sector"
                  hasSelectAll={false}
                  className="rmsc"
                  overrideStrings={{ selectSomeItems: "Select Industry & Sector" }} // placeholder text
                />

                {/* <MultiSelectDropdown
                  label="Industry & Sector"
                  options={industrySectors}
                  value={industryvalue}
                  onChange={setindustryvalue}
                  placeholder="Select Industry&Sector"
                  error={errors.industrySector}
                  
                /> */}
                {/* {industryvalue.find((item) => item.value === "other") && (
                  <div className="mt-2 border z-50 border-[#BED3FF] rounded-md p-2 w-full text-sm flex justify-between">
                    <input
                      type="text"
                      value={customIndustry}
                      onChange={(e) => setCustomIndustry(e.target.value)}
                      placeholder="Enter your custom business model"
                      className="rounded-md w-full text-sm outline-none placeholder:text-[#707070]"
                    />
                    <button
                      onClick={handleAddCustomIndustry}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Add
                    </button>
                  </div>
                )} */}
              </div>

              {errors.industrySector && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.industrySector}
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
            <div className="text-red-500 text-sm mt-1">{errors.country}</div>
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
            className="mt-2 w-full h-[60px] outline-[#BED6FF] text-[#707070] placeholder:text-[#707070] border border-[#BED6FF] rounded-xl px-7 text-sm"
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
            className="mt-2 w-full h-[60px] outline-[#BED6FF] text-[#707070] placeholder:text-[#707070] border border-[#BED6FF] rounded-xl px-7 text-sm"
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
                <label
                  className="fb-custom-checkbox"
                  // onBlur={handleBlur}
                >
                  <input
                    type="checkbox"
                    className="fb-checkbox-input"
                    name="referrals"
                    value="Facebook"
                    checked={form.referrals.includes("Facebook")}
                    onChange={handleChange}
                  />
                  <span className="fb-checkbox-checkmark"></span>
                  Facebook
                </label>
                <label
                  className="fb-custom-checkbox"
                  // onBlur={handleBlur}
                >
                  <input
                    type="checkbox"
                    className="fb-checkbox-input"
                    name="referrals"
                   value="Instagram"
                    checked={form.referrals.includes("Instagram")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="fb-checkbox-checkmark"></span>
                  Instagram
                </label>
                <label
                  className="fb-custom-checkbox"
                  // onBlur={handleBlur}
                >
                  <input
                    type="checkbox"
                    className="fb-checkbox-input"
                    name="referrals"
                    value="YouTube"
                    checked={form.referrals.includes("YouTube")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="fb-checkbox-checkmark"></span>
                  YouTube
                </label>
                <label
                  className="fb-custom-checkbox"
                  // onBlur={handleBlur}
                >
                  <input
                    type="checkbox"
                    className="fb-checkbox-input"
                    name="referrals"
                    value="Friend"
                    checked={form.referrals.includes("Friend")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                   
                  />
                  <span className="fb-checkbox-checkmark"></span>
                  Friend
                </label>
                <label
                  className="fb-custom-checkbox"
                  // onBlur={handleBlur}
                >
                  <input
                    type="checkbox"
                    className="fb-checkbox-input"
                    name="referrals"
                    value="Others"
                    checked={form.referrals.includes("Others")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="fb-checkbox-checkmark"></span>
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
       <div className="h-20 w-full sticky bottom-8 z-20">
        <div className="w-[97%]  h-full flex justify-end items-start">
        <button
          type="submit"
           onClick={() => {
                  onSubmit;
                }}
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
      </div>
    </>
  );
};

export default CompanyForm;
