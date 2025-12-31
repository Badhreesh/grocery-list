export function saveItems(allItems) {
  const allItemsJson = JSON.stringify(allItems);
  localStorage.setItem("items", allItemsJson);
}

export function getItems() {
  const allItemsJson = localStorage.getItem("items") || "[]";
  return JSON.parse(allItemsJson);
}
