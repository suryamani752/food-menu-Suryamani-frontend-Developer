import React, { useRef, useEffect, useState } from "react";

const Modal = ({ item, onClose }) => {
  const modalRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0); // Track scroll progress

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close modal on outside click
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener
    };
  }, [onClose]);

  const handleScroll = () => {
    const modal = modalRef.current;
    const scrollTop = modal.scrollTop; // Scroll distance from top
    const scrollHeight = modal.scrollHeight - modal.clientHeight; // Total scrollable height
    const scrollPercent = (scrollTop / scrollHeight) * 100; // Calculate percentage scrolled
    setScrollProgress(scrollPercent);
  };

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      modal.addEventListener("scroll", handleScroll); // Add scroll listener
    }
    return () => {
      if (modal) {
        modal.removeEventListener("scroll", handleScroll); // Remove scroll listener on cleanup
      }
    };
  }, []);

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-4 rounded max-w-lg w-full max-h-[80vh] overflow-y-auto relative"
      >
        <div
          className="h-1 bg-blue-500 sticky top-0 left-0 z-20"
          style={{ width: `${scrollProgress}%` }}
        ></div>
        <button
          onClick={onClose}
          className="bg-red-500 text-white p-2 rounded mb-4 sticky top-0 z-10"
        >
          Close
        </button>
        <img
          src={item.strMealThumb}
          alt={item.strMeal}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold my-2">{item.strMeal}</h2>
        <p>
          <strong>Category:</strong> {item.strCategory}
        </p>
        <p>
          <strong>Area:</strong> {item.strArea}
        </p>
        <p className="mt-2">{item.strInstructions}</p>{" "}
        {/* Display instructions */}
      </div>
    </div>
  );
};

export default Modal;
