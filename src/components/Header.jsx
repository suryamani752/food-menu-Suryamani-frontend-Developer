import React, { useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import "./Header.css";

const Header = () => {
  const { setSearchTerm, error } = useContext(FoodContext);

  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Food Menu</h1>
      <input
        type="text"
        placeholder="Search food..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-2 p-2 rounded text-black"
      />
      {error && <p className="mt-2 text-red-400">{error}</p>}{" "}
    </header>
  );
};

export default Header;
