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
    if (addedItem) {
      setAllItems((prev) => [...prev, addedItem]);
    }
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    const remainingAllItems = allItems.filter((item) => item.id !== id);
    setAllItems(remainingAllItems);
  };

  const handleToggleItem = async (id) => {
    await updateItem(id);
    const items = await getItems();
    setAllItems(items);
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
