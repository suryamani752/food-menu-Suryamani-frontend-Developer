import React, { createContext, useState, useEffect } from "react";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [areaFilter, setAreaFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(""); 

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${
        areaFilter || "Indian"
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setFoodItems(data.meals);
          setError(""); 
        } else {
          setFoodItems([]);
          setError("No results found for this area.");
        }
      })
      .catch(() => {
        setFoodItems([]);
        setError("Error fetching data.");
      });
  }, [areaFilter]);

  const filteredItems = foodItems.filter((item) =>
    item.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.strMeal.localeCompare(b.strMeal);
    } else {
      return b.strMeal.localeCompare(a.strMeal);
    }
  });

  return (
    <FoodContext.Provider
      value={{
        sortedItems,
        areaFilter,
        setAreaFilter,
        sortOrder,
        setSortOrder,
        searchTerm,
        setSearchTerm,
        error,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
