function GroceryItem({ item, onDeleteItem, onToggleItem }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        id={`item-${item.id}`}
        checked={item.done}
        onChange={() => onToggleItem(item.id)}
      />
      <label htmlFor={`item-${item.id}`}>{item.name}</label>
      <button onClick={() => onDeleteItem(item.id)}>delete</button>
    </li>
  );
}

export default GroceryItem;
