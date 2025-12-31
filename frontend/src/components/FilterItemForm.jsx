function FilterItemForm({ filteredItem, onFilterItemChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={filteredItem}
        onChange={(e) => onFilterItemChange(e.target.value)}
        placeholder="Filter item..."
      />
    </form>
  );
}

export default FilterItemForm;
