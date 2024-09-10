import React from "react";

const FoodItemCard = ({ item, onClick }) => {
  return (
    <div
      className="border rounded p-4 cursor-pointer"
      onClick={() => onClick(item)} 
    >
      <img
        src={item.strMealThumb} 
        alt={item.strMeal}
        className="w-full h-32 object-cover rounded"
      />
      <h3 className="font-bold">{item.strMeal}</h3>
      <p>Rating: {Math.floor(Math.random() * 5) + 1}/5</p> 
    </div>
  );
};

export default FoodItemCard;
