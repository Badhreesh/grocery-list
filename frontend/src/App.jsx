import { useState } from "react";

import AddItemForm from "./components/AddItemForm";
import FilterItemForm from "./components/FilterItemForm";
import GroceryList from "./components/GroceryList";
import { getItems, saveItems } from "./services/localStorage";

const initialItems = getItems();

function GroceryListApp() {
  const [filterItem, setFilterItem] = useState("");
  const [allItems, setAllItems] = useState(initialItems);

  const addItem = (newItem) => {
    const newAllItems = [
      ...allItems,
      { id: crypto.randomUUID(), name: newItem, done: false },
    ];
    setAllItems(newAllItems);
    saveItems(newAllItems);
  };

  const deleteItem = (id) => {
    const remainingAllItems = allItems.filter((item) => item.id !== id);
    setAllItems(remainingAllItems);
    saveItems(remainingAllItems);
  };

  const toggleItem = (id) => {
    const updatedAllItems = allItems.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setAllItems(updatedAllItems);
    saveItems(updatedAllItems);
  };

  return (
    <>
      <h1>Grocery List</h1>
      <AddItemForm onAddItem={addItem} />
      <FilterItemForm
        filteredItem={filterItem}
        onFilterItemChange={setFilterItem}
      />
      <GroceryList
        items={allItems}
        filteredItem={filterItem}
        onDeleteItem={deleteItem}
        onToggleItem={toggleItem}
      />
    </>
  );
}

export default function App() {
  return <GroceryListApp />;
}
