import { config } from "@/config";
import { Recipe } from "@/types/recipe";

export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch(`${config.apiUrl}/resep`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Failed to fetch recipes");
    const data = await response.json();
    return Array.isArray(data.data.reseps) ? data.data.reseps : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
