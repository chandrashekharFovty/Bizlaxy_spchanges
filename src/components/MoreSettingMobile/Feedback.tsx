import React, { useRef, useState } from 'react';
import { CiImageOn } from 'react-icons/ci';
import { MdExpandLess } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Feedback() {
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const MaxFileSize = 1; // 1 MB limit
  const MaxFileSizeInBytes = MaxFileSize * 1024 * 1024;

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MaxFileSizeInBytes) {
        alert(`File size exceeds ${MaxFileSize} MB limit.`);
        e.target.value = '';
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!feedbackText.trim()) {
      alert("Please enter some feedback.");
      return;
    }

    const formData = new FormData();
    formData.append("feedback", feedbackText);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Example: handle form submission (API call)
    console.log("Feedback submitted:", feedbackText);
    console.log("Image file:", imageFile);

    // Reset form
    setFeedbackText("");
    setImageFile(null);
    setImagePreview(null);
    alert("Thank you for your feedback!");
  };

  return (
    <div className="dark:dark-color h-screen p-4">
      {/* Fixed Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:dark-color z-10 border-b border-gray-200 dark:border-gray-700">
        <Link
          to="/settings"
          className="flex items-center font-semibold text-black dark:text-white py-4 px-4"
        >
          <MdExpandLess className="transform rotate-[-90deg] text-2xl" />
          <span className="font-bold text-xl ml-28">Profile Privacy</span>
        </Link>
      </div>

      <div className="pt-24 lg:pt-0">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Share your feedback to enhance your experience
        </p>

        <textarea
          placeholder="Write your feedback..."
          maxLength={100}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          className="w-full border border-gray-400 rounded p-3 mb-4 focus:outline-none focus:border-blue-500 dark:dark-color dark:border-gray-400 dark:text-white"
          rows="5"
        />

        {imagePreview && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Attached Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-48 h-48 object-cover border border-gray-400 rounded"
            />
          </div>
        )}

        <div className="flex flex-col items-center w-full gap-4">
          <button
            onClick={handleUploadClick}
            className="flex items-center justify-center w-full h-14 gap-2 px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <CiImageOn className="text-xl" />
            Upload Image
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <button
            onClick={handleSubmit}
            className="w-full h-14 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
