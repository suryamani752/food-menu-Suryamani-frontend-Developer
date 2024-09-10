import React from "react";
import FoodItemCard from "./FoodItemCard";
import "./FoodItems.css";

const FoodItems = ({ items, onItemClick }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {items.length > 0 ? (
        items.map((item) => (
          <FoodItemCard
            key={item.idMeal} 
            item={item}
            onClick={onItemClick} 
          />
        ))
      ) : (
        <p className="text-center col-span-3">No items found</p> 
      )}
    </div>
  );
};

export default FoodItems;
