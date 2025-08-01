import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar, { Footer } from "../layout/Sidebar";
import CategorySection from "./AllCategory";
import MostView from "./MostView";
import ShopCarousel from "./ShopCarousel";
import { SearchInput } from "../ui/SearchInput";
import { Arrow } from "@radix-ui/react-context-menu";
import { ArrowLeft, Filter, SearchIcon } from "lucide-react";
import filter from "../../../public/filter.webp"

const products = [
  "Apple iPhone",
  "Samsung Galaxy",
  "Google Pixel",
  "OnePlus Nord",
  "Sony Xperia",
  "Nokia Lumia",
  "Shirt", "Pants", "Shoes", "Socks", "Hat", "Dress", 
];

const Category = () => {
    const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = products.filter((product) =>
        product.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    setQuery(item);
    setSuggestions([]);
  };

  const navigate=useNavigate()
  return (
   <div className="flex w-full dark:dark-color min-h-screen bg-white dark:bg-gray-900">
  {/* Sidebar */}
  <Sidebar />

  {/* Main Content */}
  <div className="flex-1 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ml-[240px] max-lg:ml-20 max-md:ml-0 transition-all duration-300">
    
    {/* Top Bar */}
    <div className="flex items-center justify-between mb-4 relative z-20">
      {/* Left: Back + Search */}
      <div className="flex items-center flex-grow space-x-2">
        {/* Back Arrow */}
        <Link to="/shop" className="lg:hidden">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>

        {/* Search */}
        <div className="relative flex items-center w-full border border-gray-300 rounded-xl px-3 py-2 bg-white dark:bg-gray-800">
          <SearchIcon className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search account here..."
            value={query}
            onChange={handleChange}
            className="flex-grow bg-transparent outline-none text-sm text-black dark:text-white"
          />

          {/* Filter Button (Mobile Only) */}
          <button
            onClick={() => navigate("/filter")}
            className="p-2 lg:hidden rounded-xl bg-blue-600 text-white ml-2"
          >
            <img src={filter} alt="Filter" className="w-6 h-6 object-cover" />
          </button>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute left-0 top-full mt-2 z-30 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-full max-h-60 overflow-y-auto rounded shadow scrollbar-hide">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item)}
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-black dark:text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right: Shop Profile */}
      <Link to="/shopprofile" className="ml-4 flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer">
          <img src="/isShop.png" alt="Shop" className="w-6 h-6" />
        </div>
      </Link>
    </div>

    {/* Carousel Banner */}
    <div className="my-4 max-md:h-[250px]">
      <ShopCarousel />
    </div>

    {/* Categories */}
    <h2 className="text-xl font-semibold mt-6 mb-4">Categories</h2>
    <CategorySection />

    {/* Most Viewed */}
    <div className="mt-10">
      <MostView />
    </div>
  </div>

  {/* Footer */}
  <Footer />
</div>

    
  );
};




export function Filters() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryOpen, setIndustryOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [productName, setProductName] = useState("");
  const [minQty, setMinQty] = useState("");
  const [maxQty, setMaxQty] = useState("");

  const businessOptions = [
    "Supplier",
    "Retailer",
    "Manufacturer",
    "Distributor",
    "Service Provider",
    "Trader",
    "Wholesaler",
    "Importer",
    "Other",
  ];

  const industryOptions = [
    "Agriculture",
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Construction",
    "Other",
  ];

  const locationOptions = [
    "India",
    "USA",
    "UK",
    "Germany",
    "Australia",
    "Other",
  ];

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const filteredBusinessOptions = businessOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearFilters = () => {
    setSelectedOptions([]);
    setSearchTerm("");
    setSelectedIndustry("");
    setSelectedLocation("");
    setProductName("");
    setMinQty("");
    setMaxQty("");
  };

  const applyFilters = () => {
    console.log("Applied Filters:", {
      selectedOptions,
      selectedIndustry,
      productName,
      selectedLocation,
      minQty,
      maxQty,
    });
    //  Use navigate or props callback here if needed
  };

  return (
    <div className="p-4">
      <Link to="/shop" className="flex items-center gap-2 mb-4">
        <ArrowLeft className="w-5 h-5 text-gray-600" />
        <span className="text-xl font-semibold">Filters</span>
      </Link>

      {/* Business Type */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium">What are you looking for?</label>
        <div
          className="border px-4 py-2 rounded cursor-pointer flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={selectedOptions.length === 0 ? "text-gray-400" : ""}>
            {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Select Business Type"}
          </span>
          <svg
            className={`w-4 h-4 transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isOpen && (
          <div className="border border-gray-300 rounded-xl mt-2 p-2 max-h-60 overflow-y-auto">
            <input
              type="text"
              placeholder="Search Business Model"
              className="border border-gray-300 p-2 w-full mb-2 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredBusinessOptions.map((option) => (
              <label key={option} className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="hidden"
                />
                <span
                  className={`text-center w-5 h-5 inline-block mr-2 border rounded ${
                    selectedOptions.includes(option)
                      ? "bg-gradient-to-l from-blue-500 to-purple-500 text-white"
                      : "bg-white text-white"
                  }`}
                >✓</span>
                {option}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Industry Type */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium">Industry Type</label>
        <div
          className="border px-4 py-2 rounded cursor-pointer flex justify-between items-center"
          onClick={() => setIndustryOpen(!industryOpen)}
        >
          <span className={selectedIndustry === "" ? "text-gray-400" : ""}>
            {selectedIndustry || "Select Industry Type"}
          </span>
          <svg
            className={`w-4 h-4 transform ${industryOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {industryOpen && (
          <div className="border border-gray-300 rounded-xl mt-2 p-2">
            {industryOptions.map((option) => (
              <div
                key={option}
                className="py-1 px-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => {
                  setSelectedIndustry(option);
                  setIndustryOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product/Service Name */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium">Product/Service Name</label>
        <input
          type="text"
          placeholder="Search by product or service name..."
          className="border border-gray-300 p-2 w-full rounded"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      {/* Location Preference */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium">Location Preference</label>
        <div
          className="border px-4 py-2 rounded cursor-pointer flex justify-between items-center"
          onClick={() => setLocationOpen(!locationOpen)}
        >
          <span className={selectedLocation === "" ? "text-gray-400" : ""}>
            {selectedLocation || "Select Location"}
          </span>
          <svg
            className={`w-4 h-4 transform ${locationOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {locationOpen && (
          <div className="border border-gray-300 rounded-xl mt-2 p-2">
            {locationOptions.map((option) => (
              <div
                key={option}
                className="py-1 px-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => {
                  setSelectedLocation(option);
                  setLocationOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quantity Needed */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium">Quantity Needed</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="border border-gray-300 p-2 w-full rounded"
            value={minQty}
            onChange={(e) => setMinQty(e.target.value)}
          />
          <span className="w-6 mt-2 text-xl text-gray-600">-</span>
          <input
            type="number"
            placeholder="Max"
            className="border border-gray-300 p-2 w-full rounded"
            value={maxQty}
            onChange={(e) => setMaxQty(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-10 m-10">
        <button onClick={clearFilters} className="text-blue-600 text-xl font-medium">Clear</button>
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Apply
        </button>
      </div>
    </div>
  );
}




export default Category;
