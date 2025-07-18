import MainTemplate from "../../components/templates/MainTemplate";
import { fetchRecipes } from "@/data/fetchRecipes";

export default async function Home() {
  const recipes = await fetchRecipes();
  return <MainTemplate recipes={recipes} />;
}
