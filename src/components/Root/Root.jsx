import React, { useRef, useState } from 'react';
import { Outlet } from 'react-router';
import LeftNav from '../ShareComponent/LeftNav';
import RightNav from '../ShareComponent/RightNav';
import Navbar from '../ShareComponent/Navbar';

const Root = () => {
    const [showPopup, setShowPopup] = useState(false);
  
    // This holds the current/previous profile image
    const [userImage, setUserImage] = useState("/src/assets/images/WhatsApp Image 2025-09-18 at 2.44.32 AM.jpeg");
  
    // Ref for hidden file input
    const fileInputRef = useRef(null);
  
    // Trigger the file input click
    const handleUploadClick = () => {
      fileInputRef.current.click();
    };
  
    // Handle file selection
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserImage(reader.result); // Update the image
          setShowPopup(false); // Close popup after upload
        };
        reader.readAsDataURL(file);
      }
    };
  
  
  return (
    <div className="relative h-screen">
      <div className="grid grid-cols-12 h-screen">
        <section className="col-span-2 sticky top-0 h-screen overflow-y-auto">
          <LeftNav />
        </section>

        <main className="col-span-8 h-screen overflow-y-auto bg-[#f5f7fc]">
          <header className=" sticky top-0 z-50 bg-[#f5f7fc] ">
            <Navbar />
          </header>
          <div className="bg-[#f5f7fc]">
            <Outlet />
          </div>
        </main>

        <section className="col-span-2 sticky top-0 h-screen overflow-y-auto">
          <RightNav setShowPopup={setShowPopup} userImage={userImage} />
        </section>
      </div>

      {/* Full-page popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blur background */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Popup content */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center z-10">
            {/* Close icon */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Update Profile Image</h2>

            {/* Show previous/current image */}
            <img
              src={userImage}
              alt="Current User"
              className="w-32 h-32 rounded-xl mb-4 object-cover"
            />

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Upload button */}
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

export default Root;
