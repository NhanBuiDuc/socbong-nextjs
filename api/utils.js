import axios from "axios";

async function fetchDataFromUrl(url) {
  try {
    console.log(url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export { fetchDataFromUrl };
