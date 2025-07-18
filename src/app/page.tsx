import MainTemplate from "../components/templates/MainTemplate";
import { fetchRecipes } from "@/data/fetchRecipes";
import { AuthProvider } from "@/context/AuthContext";

export default async function Home() {
  const recipes = await fetchRecipes();
  return (
    <AuthProvider>
      <MainTemplate recipes={recipes} />
    </AuthProvider>
  );
}
