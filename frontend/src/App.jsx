// import "./App.css";

import { useState } from "react";

const initialItems = [
  { id: 1, name: "Milk", done: false },
  { id: 2, name: "Cheese", done: false },
  { id: 3, name: "Mushroom", done: false },
];

function GroceryItem({ item, onDeleteItem }) {
  return (
    <li key={item.id}>
      <input type="checkbox" id={`item-${item.id}`} />
      <label htmlFor={`item-${item.id}`}>{item.name}</label>
      <button onClick={() => onDeleteItem(item.id)}>delete</button>
    </li>
  );
}

function GroceryList({ items, filteredItem, onDeleteItem }) {
  const itemRows = [];
  items.forEach((item) => {
    if (item.name.toLowerCase().indexOf(filteredItem.toLowerCase()) === -1)
      return;
    itemRows.push(
      <GroceryItem item={item} onDeleteItem={onDeleteItem} key={item.id} />
    );
  });
  return <ul>{itemRows}</ul>;
}

function FilterItemForm({ filteredItem, onFilterItemChange }) {
  return (
    <form>
      <input
        type="text"
        value={filteredItem}
        onChange={(e) => onFilterItemChange(e.target.value)}
        placeholder="Filter item..."
      />
    </form>
  );
}
function AddItemForm({ onAddItem }) {
  const [item, setItem] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedItem = item.trim();
    if (trimmedItem.length === 0) return;
    onAddItem(trimmedItem);
    setItem("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter item..."
      />
      <button>Add</button>
    </form>
  );
}

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
