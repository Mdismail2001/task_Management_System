import React, { useState, useRef } from "react";
import LeftNav from "../ShareComponent/LeftNav";
import RightNav from "../ShareComponent/RightNav";
import Navbar from "../ShareComponent/Navbar";
import { Outlet } from "react-router";

const RootAdmin = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userImage, setUserImage] = useState(
    "/src/assets/images/WhatsApp Image 2025-09-18 at 2.44.32 AM.jpeg"
  );
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 NEW: Search State
  const fileInputRef = useRef(null);

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
        setShowPopup(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="grid grid-cols-12 h-screen">
        {/* Left Sidebar */}
        <section className="col-span-2 sticky top-0 h-screen overflow-y-auto">
          <LeftNav />
        </section>

        {/* Main Content */}
        <main className="col-span-8 h-screen overflow-y-auto bg-[#f5f7fc]">
          <header className="col-span-7 sticky top-0 z-50 bg-[#f5f7fc] ">
            <Navbar setSearchQuery={setSearchQuery} /> {/* 🔍 Pass Setter */}
          </header>
          <div className="p-4">
            <Outlet context={{ searchQuery }} /> {/* 🔍 Pass to Outlet */}
          </div>
        </main>

        {/* Right Sidebar */}
        <section className="col-span-2 sticky top-0 h-screen overflow-y-auto">
          <RightNav setShowPopup={setShowPopup} userImage={userImage} />
        </section>
      </div>

      {/* Profile Upload Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center z-10">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Update Profile Image</h2>

            <img
              src={userImage}
              alt="Current User"
              className="w-32 h-32 rounded-xl mb-4 object-cover"
            />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              className="px-3 py-2 bg-[#3755db] text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              onClick={handleUploadClick}
            >
              Upload Picture
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RootAdmin;
