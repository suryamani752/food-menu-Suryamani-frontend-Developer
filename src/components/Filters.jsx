import React, { useState, useEffect, useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import "./Filters.css";

const Filters = () => {
  const { setAreaFilter, setSortOrder } = useContext(FoodContext); // Get methods from FoodContext
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    // Fetch list of areas from the MealDB API
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((response) => response.json())
      .then((data) => setAreas(data.meals)); 
  }, []); 

  return (
    <div className="p-4">
      <h2 className="font-bold my-2">Filters</h2>
      <div className="filters-container">
        <div className="select-wrapper">
          <select
            onChange={(e) => setAreaFilter(e.target.value)} // Set area filter on change
            className="custom-select cursor-pointer"
          >
            <option value="">Select Area</option>
            {areas.map((area) => (
              <option key={area.strArea} value={area.strArea}>
                {area.strArea}
              </option>
            ))}
          </select>
        </div>
        <div className="select-wrapper">
          <select
            onChange={(e) => setSortOrder(e.target.value)} // Set sort order on change
            className="custom-select cursor-pointer"
          >
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
