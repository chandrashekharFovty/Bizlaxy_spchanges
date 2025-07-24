import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyForm = () => {
  const navigate = useNavigate();

  // --- 1. Setup form state
  const [form, setForm] = useState({
    companyName: "",
    businessType: "",
    industrySector: "",
    businessModel: "",
    companyStage: "", // e.g. "early", "growth", "mature"
    minFunding: "",
    maxFunding: "",
    state: "",
    city: "",
    referrals: [] as string[],
  });

  const [error, setError] = useState({
    form,
  });

  const validatecompanyName = (v) =>
    !v
      ? `Please Enter your username`
      : v.length < 3 && "Your username too short";

      //add rest of all validation here

   const oncompanyName = (e) => {
    const v = e.target.value;
    setForm(v);
    setError((prev) => ({ ...prev, username: validatecompanyName(v) || "" }));
  };
  // --- 2. Generic change handler for inputs/selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, ariaChecked } = e.target;

    if (type === "checkbox") {
      setForm((prev) => {
        const newArr = prev.referrals.includes(value)
          ? prev.referrals.filter((v) => v !== value)
          : [...prev.referrals, value];
        return { ...prev, referrals: newArr };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- 3. Handle company stage button clicks
  const handleStageSelect = (stage: string) => {
    setForm((prev) => ({ ...prev, companyStage: stage }));
  };

  // --- 4. Submission handler
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });

    // DEBUG: inspect
    for (const [key, val] of formData.entries()) {
      console.log(key, val);
    }

    // Convert to plain obj if needed
    const obj: Record<string, any> = {};
    for (const [key, val] of formData.entries()) {
      if (obj[key]) {
        if (Array.isArray(obj[key])) obj[key].push(val);
        else obj[key] = [obj[key], val];
      } else {
        obj[key] = val;
      }
    }
    console.log("Submitted payload:", obj);
  };
  // const onSubmit = (data: any) => {
  //   console.log("Form submitted:", data);
  //   navigate("/feed");
  // };
  return (
  <>
  {/* Full page container */}
  <div className="w-full h-screen flex flex-col">

    {/* Sticky progress bar */}
    <div className="w-full sticky top-0 bg-white z-10 px-4 py-3">
      <div className="w-full h-[8px] bg-transparent rounded-xl flex gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <progress
            key={i}
            value={i === 0 ? 100 : 0}
            max={100}
            className="rounded-[6px] bg-[#C7D3EB] w-1/6 h-[6.5px]"
          />
        ))}
      </div>
    </div>

    {/* Scrollable form */}
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 py-4">
      <form onSubmit={onSubmit} className="w-full max-w-5xl mx-auto flex flex-col gap-6">

        {/* Company Name */}
        <div className="w-full h-[90px] flex flex-col justify-end">
          <label className="text-sm font-medium" htmlFor="companyName">
            Company Name
          </label>
          <div className="h-[60px] mt-2">
            <input
              type="text"
              value={form.companyName}
              name="companyName"
              onChange={handleChange}
              placeholder="Enter your company name"
              className="border border-[#BED6FF] outline-[#BED6FF] rounded-xl text-sm w-full h-full px-4"
            />
          </div>
        </div>

        {/* Business Type */}
        <div className="w-full h-[90px] flex flex-col justify-end">
          <label className="text-sm font-medium" htmlFor="businessType">
            Business Type
          </label>
          <div className="h-[60px] mt-2">
            <select
              value={form.businessType}
              onChange={handleChange}
              name="businessType"
              id="businessType"
              className="text-black border border-[#BED6FF] outline-[#BED6FF] rounded-xl text-sm w-full h-full px-4"
            >
              <option value="default" className="text-[#797575]">
                Select Business Type
              </option>
              <option value="manufacturer">Manufacturer</option>
            </select>
          </div>
        </div>

        {/* Industry Sector */}
        <div className="w-full h-[90px] flex flex-col justify-end">
          <label className="text-sm font-medium" htmlFor="industrySector">
            Industry & Sector
          </label>
          <div className="h-[60px] mt-2">
            <select
              value={form.industrySector}
              onChange={handleChange}
              name="industrySector"
              id="industrySector"
              className="text-black border border-[#BED6FF] outline-[#BED6FF] rounded-xl text-sm w-full h-full px-4"
            >
              <option value="default">Select Industry/Sector</option>
              <option value="manufacturer">Manufacturer</option>
            </select>
          </div>
        </div>

        {/* Business Model */}
        <div className="w-full h-[90px] flex flex-col justify-end">
          <label className="text-sm font-medium" htmlFor="businessModel">
            Business Model
          </label>
          <div className="h-[60px] mt-2">
            <select
              value={form.businessModel}
              onChange={handleChange}
              name="businessModel"
              id="businessModel"
              className="text-black border border-[#BED6FF] outline-[#BED6FF] rounded-xl text-sm w-full h-full px-4"
            >
              <option value="default">Select Business Model</option>
              <option value="manufacturer">Manufacturer</option>
            </select>
          </div>
        </div>

        {/* Company Stage */}
        <div className="w-full flex flex-col justify-end">
          <label className="text-sm font-medium">Stage of Company</label>
          <div className="mt-2 flex flex-wrap gap-3">
            {["Early Stage", "Growth stage", "Mature stage"].map((stage) => (
              <button
                key={stage}
                type="button"
                className={`px-4 py-1 rounded text-sm font-normal border ${
                  form.companyStage === stage
                    ? "bg-[#bce2fd] border-[#BED6FF]"
                    : "bg-[#EAF6FF] border-[#BED6FF]"
                }`}
                onClick={() => handleStageSelect(stage)}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        {/* Funding Amount */}
        <div className="w-full flex flex-col justify-end">
          <label className="text-sm font-medium">Amount Required for Funding</label>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <input
              type="number"
              value={form.minFunding}
              name="minFunding"
              onChange={handleChange}
              placeholder="Min"
              className="w-full sm:w-[48%] h-[46px] border border-[#BED6FF] rounded-xl text-sm p-3 text-center outline-none"
            />
            <input
              type="number"
              value={form.maxFunding}
              name="maxFunding"
              onChange={handleChange}
              placeholder="Max"
              className="w-full sm:w-[48%] h-[46px] border border-[#BED6FF] rounded-xl text-sm p-3 text-center outline-none"
            />
          </div>
        </div>

        {/* State */}
        <div className="w-full h-[90px] flex flex-col justify-end">
          <label className="text-sm font-medium">State</label>
          <div className="h-[60px] mt-2">
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className="text-black border border-[#BED6FF] outline-[#BED6FF] rounded-xl text-sm w-full h-full px-4"
            >
              <option value="default">Select State</option>
              <option value="MP">Madhya Pradesh</option>
              <option value="MH">Maharashtra</option>
              <option value="GJ">Gujarat</option>
            </select>
          </div>
        </div>

        {/* City */}
        <div className="w-full h-[90px] flex flex-col justify-end">
          <label className="text-sm font-medium">City</label>
          <div className="h-[60px] mt-2">
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="text-black border border-[#BED6FF] outline-[#BED6FF] rounded-xl text-sm w-full h-full px-4"
            >
              <option value="default">Select City</option>
              <option value="Indore">Indore</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Ujjain">Ujjain</option>
            </select>
          </div>
        </div>

        {/* Referral Sources */}
        <div className="w-full flex flex-col">
          <label className="text-md font-medium mb-2">
            How Did You Hear About Us
          </label>
          <div className="space-y-2">
            {["Facebook", "Instagram", "Youtube", "Friend", "Others"].map((ref) => (
              <label key={ref} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="referrals"
                  value={ref}
                  checked={form.referrals.includes(ref)}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                {ref}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-end">
          <button
            type="submit"
            disabled={!FormData}
            className={`w-[122px] h-[51px] text-lg font-semibold text-white px-4 py-2 rounded-xl ${
              FormData ? "bg-[#1C4BC4]" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</>

  );
};

export default CompanyForm;
