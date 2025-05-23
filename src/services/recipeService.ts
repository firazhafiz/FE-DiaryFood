import { apiRequest } from "./api";

const getRecipes = async () => {
  try {
    const response = await apiRequest("/recipes", "GET");
    return response;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export { getRecipes };
