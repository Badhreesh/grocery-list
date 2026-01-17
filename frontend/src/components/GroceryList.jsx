import GroceryItem from "./GroceryItem";

function GroceryList({ items, filteredItem, onDeleteItem, onToggleItem }) {
  const itemRows = [];
  items.forEach((item) => {
    if (item.name.toLowerCase().indexOf(filteredItem.toLowerCase()) === -1)
      return;
    itemRows.push(
      <GroceryItem
        item={item}
        onDeleteItem={onDeleteItem}
        onToggleItem={onToggleItem}
        key={item.id}
      />
    );
  });

  return <ul>{itemRows}</ul>;
}

export default GroceryList;
