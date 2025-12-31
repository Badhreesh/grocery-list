function GroceryItem({ item, onDeleteItem }) {
  return (
    <li key={item.id}>
      <input type="checkbox" id={`item-${item.id}`} />
      <label htmlFor={`item-${item.id}`}>{item.name}</label>
      <button onClick={() => onDeleteItem(item.id)}>delete</button>
    </li>
  );
}

export default GroceryItem;
