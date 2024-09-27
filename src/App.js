import React, { useState, useContext, useEffect } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import FoodItems from "./components/FoodItems";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import { FoodContext } from "./context/FoodContext";

const App = () => {
  const { sortedItems, searchTerm } = useContext(FoodContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const displayedItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleItemClick = (item) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedItem(item);
        setItemDetails(data.meals[0]);
      });
  };

  return (
    <div>
      <Header />
      <Filters />
      <FoodItems items={displayedItems} onItemClick={handleItemClick} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {itemDetails && (
        <Modal item={itemDetails} onClose={() => setItemDetails(null)} />
      )}
      <Footer />
    </div>
  );
};

export default App;
