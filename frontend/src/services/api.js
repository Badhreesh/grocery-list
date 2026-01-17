const BASE_URL = "http://localhost:5000";

export async function getItems() {
  try {
    const response = await fetch(`${BASE_URL}/items`);
    if (!response.ok) {
      throw new Error("Error getting items from DB!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function addItem(item) {
  try {
    const response = await fetch(`${BASE_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item }),
    });
    if (!response.ok) {
      throw new Error(`Error adding ${item} to DB!`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateItem(id) {
  try {
    const response = await fetch(`${BASE_URL}/items/${id}`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error(`Error updating item with id ${id} in DB!`);
    }
    // const data = await response.json();
    // return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteItem(id) {
  try {
    const response = await fetch(`${BASE_URL}/items/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error deleting item with id ${id} from DB!`);
    }
  } catch (error) {
    console.log(error);
  }
}
