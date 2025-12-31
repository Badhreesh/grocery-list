import { useState } from "react";

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

export default AddItemForm;
