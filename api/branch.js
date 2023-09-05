import { fetchDataFromUrl } from "./utils"; // Adjust the path as needed
import { BASE_URL } from "./config";
// Usage example:
async function fetchBranchData() {
  const apiUrl = BASE_URL + "/getAll"; // Replace with your desired URL
  try {
    const data = await fetchDataFromUrl(apiUrl);
    console.log("Data received:", data);
    // Handle the data as needed
  } catch (error) {
    // Handle errors, e.g., display an error message to the user
    console.error("Error:", error.message);
  }
}

export { fetchBranchData };
