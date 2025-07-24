import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import Sidebar from "../layout/Sidebar";

const customProducts = [
  {
    id: 1,
    img: "/product1.png",
    title: "Black T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
    previews: ["/below01.png", "/below02.png", "/below03.png", "/below04.png"],
  },
  {
    id: 2,
    img: "/GirlsHoodies.webp",
    title: "Pink T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
    previews: [
      "/GirlsHoodies.webp",
      "/GirlsHoodies1.webp",
      "/GirlsHoodies2.webp",
      "/Hoodies.webp",
    ],
  },
  {
    id: 3,
    img: "/mento.webp",
    title: "Orange T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
    previews: ["/mento.webp", "/mento1.webp", "/mento2.webp", "/mento3.webp"],
  },
  {
    id: 4,
    img: "/product4.png",
    title: "White T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 5,
    img: "/product4.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 6,
    img: "/product1.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 7,
    img: "/product2.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 8,
    img: "/product3.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 9,
    img: "/product4.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 10,
    img: "/product4.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 11,
    img: "/product1.png",
    title: "Black T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
    previews: ["/below01.png", "/below02.png", "/below03.png", "/below04.png"],
  },
  {
    id: 12,
    img: "/GirlsHoodies.webp",
    title: "Pink T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
    previews: [
      "/GirlsHoodies.webp",
      "/GirlsHoodies1.webp",
      "/GirlsHoodies2.webp",
      "/Hoodies.webp",
    ],
  },
  {
    id: 13,
    img: "/mento.webp",
    title: "Orange T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
    previews: ["/mento.webp", "/mento1.webp", "/mento2.webp", "/mento3.webp"],
  },
  {
    id: 14,
    img: "/product4.png",
    title: "White T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 15,
    img: "/product4.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 16,
    img: "/product1.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 17,
    img: "/product2.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 18,
    img: "/product3.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 19,
    img: "/product4.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 20,
    img: "/product1.png",
    title: "Black T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
    previews: ["/below01.png", "/below02.png", "/below03.png", "/below04.png"],
  },
  {
    id: 21,
    img: "/GirlsHoodies.webp",
    title: "Pink T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
    previews: [
      "/GirlsHoodies.webp",
      "/GirlsHoodies1.webp",
      "/GirlsHoodies2.webp",
      "/Hoodies.webp",
    ],
  },
  {
    id: 22,
    img: "/mento.webp",
    title: "Orange T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
    previews: ["/mento.webp", "/mento1.webp", "/mento2.webp", "/mento3.webp"],
  },
  {
    id: 23,
    img: "/product4.png",
    title: "White T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 24,
    img: "/product4.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 25,
    img: "/product1.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 26,
    img: "/product2.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 27,
    img: "/product3.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 28,
    img: "/product4.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 29,
    img: "/product4.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 30,
    img: "/product1.png",
    title: "Black T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
    previews: ["/below01.png", "/below02.png", "/below03.png", "/below04.png"],
  },
  {
    id: 31,
    img: "/GirlsHoodies.webp",
    title: "Pink T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
    previews: [
      "/GirlsHoodies.webp",
      "/GirlsHoodies1.webp",
      "/GirlsHoodies2.webp",
      "/Hoodies.webp",
    ],
  },
  {
    id: 32,
    img: "/mento.webp",
    title: "Orange T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
    previews: ["/mento.webp", "/mento1.webp", "/mento2.webp", "/mento3.webp"],
  },
  {
    id: 34,
    img: "/product4.png",
    title: "White T-shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 35,
    img: "/product4.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 36,
    img: "/product1.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 37,
    img: "/product2.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 38,
    img: "/product3.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
  {
    id: 39,
    img: "/product4.png",
    title: "White shirt",
    price: "₹130 – ₹10/pcs",
    description: "Suzhou Dreamcolor Textile Co., Ltd.",
  },
];

function ShopProducts() {
  const location = useLocation();
  const category = location.state?.category || "shop";

  return (
  <>
  <Sidebar />

  <main className="dark:dark-color max-lg:ml-20 ml-[245px] max-md:ml-0 dark:bg-dark min-h-screen px-4 py-6 transition-all duration-300">
    
    {/* Back Link & Mobile Search */}
    <div className="flex flex-col gap-4 max-md:gap-2 mb-6 w-full">
      <div className="flex justify-between items-center">
        <Link
          to="/shop"
          className="hidden max-md:inline-block text-2xl text-black dark:text-white"
        >
          &lt;
        </Link>
        <Link
          to="/shop"
          className="max-md:hidden text-sm text-blue-600"
        >
          &lt; Back to {category}
        </Link>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden w-full flex items-center gap-2">
        <div className="flex items-center flex-grow border border-gray-300 rounded-xl px-3 py-2 bg-white dark:bg-gray-800">
          <SearchIcon className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="flex-grow bg-transparent outline-none text-sm text-black dark:text-white"
          />
        </div>
      </div>
    </div>

    {/* Filters (Mobile Only) */}
    <div className="lg:hidden flex flex-wrap gap-2 mb-6">
      <select className="border border-gray-400 rounded-full px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white">
        <option>Sort By</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
      <button className="border border-gray-400 rounded-full px-4 py-2 text-sm dark:text-white">
        Filter
      </button>
      <button className="border border-gray-400 rounded-full px-4 py-2 text-sm dark:text-white">
        Company
      </button>
      <button className="border border-gray-400 rounded-full px-4 py-2 text-sm dark:text-white">
        Brand
      </button>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {customProducts.map((product) => (
        <Link
          key={product.id}
          to="/productcart"
          state={{ product }}
          className="border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-lg transition-shadow p-3 flex flex-col gap-2 bg-white dark:bg-gray-800"
        >
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-64 max-md:h-32 object-cover rounded-lg"
          />
          <h2 className="text-base font-medium text-black dark:text-white">{product.title}</h2>
          <p className="font-semibold text-black dark:text-white">{product.price}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
          <button className="mt-auto bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl px-4 py-2 text-sm">
            Contact Supplier
          </button>
        </Link>
      ))}
    </div>
  </main>
</>

  );
}

export default ShopProducts;
