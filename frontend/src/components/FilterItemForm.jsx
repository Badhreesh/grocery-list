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

export default FilterItemForm;
