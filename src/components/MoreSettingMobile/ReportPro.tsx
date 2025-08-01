import React, { useRef, useState } from 'react';
import { CiCamera, CiImageOn } from 'react-icons/ci';
import { MdExpandLess } from 'react-icons/md';
import { Link } from 'react-router-dom';

function ReportPro() {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const MaxFileSizeMB = 1;
  const MaxFileSizeBytes = MaxFileSizeMB * 1024 * 1024;

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current.click();
  };

  const handleFileValidation = (file, e) => {
    if (file.size > MaxFileSizeBytes) {
      alert(`File size exceeds ${MaxFileSizeMB} MB limit.`);
      e.target.value = '';
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && handleFileValidation(file, e)) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleCameraChange = (e) => {
    const file = e.target.files[0];
    if (file && handleFileValidation(file, e)) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = () => {
    if (!feedbackText.trim()) {
      alert("Please write some feedback.");
      return;
    }

    const formData = new FormData();
    formData.append("feedback", feedbackText);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Example: You can now send `formData` to your server
    console.log("Feedback submitted:", feedbackText);
    console.log("Image file:", imageFile);

    // Reset form (optional)
    setFeedbackText("");
    setImageFile(null);
    setImagePreview(null);
    alert("Report submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-white dark:dark-color lg:pt-0 pt-16 px-4">
      {/* Fixed Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:dark-color z-10 border-b border-gray-200 dark:border-gray-700">
        <Link
          to="/settings"
          className="flex items-center font-semibold text-black dark:text-white py-4 px-4"
        >
          <MdExpandLess className="transform rotate-[-90deg] text-2xl" />
          <span className="font-bold text-xl ml-6">Help Center</span>
        </Link>
      </div>

      <div className="mt-6 lg:mt-0">
        <p className="mb-4 text-gray-700 text-sm dark:text-gray-200">
          Tell us what’s not working or what you experienced.
        </p>

        <textarea
          placeholder="Write your feedback..."
          maxLength={100}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          className="dark:dark-color w-full border border-gray-400 rounded-lg p-3 mb-4 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          rows="5"
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">Attached Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-48 h-48 object-cover border border-gray-400 rounded"
            />
          </div>
        )}

        {/* Upload / Capture Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleUploadClick}
            className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <CiImageOn className="text-xl" /> Upload Image
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={handleCameraClick}
            className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <CiCamera className="text-xl" /> Take Image
          </button>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={cameraInputRef}
            className="hidden"
            onChange={handleCameraChange}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-[#1C4BC4] text-white mt-4 ml-2 w-[95%] h-14 rounded-xl"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}

export default ReportPro;
