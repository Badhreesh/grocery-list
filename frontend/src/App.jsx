import { useEffect, useState } from "react";

import AddItemForm from "./components/AddItemForm";
import FilterItemForm from "./components/FilterItemForm";
import GroceryList from "./components/GroceryList";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from "./services/localStorage";

function GroceryListApp() {
  const [filterItem, setFilterItem] = useState("");
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    async function getInitialItems() {
      const items = await getItems();
      setAllItems(items);
    }
    getInitialItems();
  }, []);

  const handleAddItem = async (newItem) => {
    const addedItem = await addItem(newItem);
    setAllItems((prev) => [...prev, addedItem]);
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    setAllItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleToggleItem = async (id) => {
    await updateItem(id);
    setAllItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <>
      <h1>Grocery List</h1>
      <AddItemForm onAddItem={handleAddItem} />
      <FilterItemForm
        filteredItem={filterItem}
        onFilterItemChange={setFilterItem}
      />
      <GroceryList
        items={allItems}
        filteredItem={filterItem}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
    </>
  );
}

export default function App() {
  return <GroceryListApp />;
}
