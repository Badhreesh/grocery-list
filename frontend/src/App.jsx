import { useState } from "react";

import AddItemForm from "./components/AddItemForm";
import FilterItemForm from "./components/FilterItemForm";
import GroceryList from "./components/GroceryList";

const initialItems = [
  { id: 1, name: "Milk", done: false },
  { id: 2, name: "Cheese", done: false },
  { id: 3, name: "Mushroom", done: false },
];

function GroceryListApp() {
  const [filterItem, setFilterItem] = useState("");
  const [allItems, setAllItems] = useState(initialItems);
  const addItem = (newItem) =>
    setAllItems([
      ...allItems,
      { id: crypto.randomUUID(), name: newItem, done: false },
    ]);
  const deleteItem = (id) =>
    setAllItems(allItems.filter((item) => item.id !== id));
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
      />
    </>
  );
}

export default function App() {
  return <GroceryListApp />;
}
