import MainTemplate from "../components/templates/MainTemplate";
import { fetchRecipes } from "@/data/fetchRecipes";
import dynamic from "next/dynamic";

const AuthProvider = dynamic(
  () => import("@/context/AuthContext").then((mod) => mod.AuthProvider),
  { ssr: false }
);

export default async function Home() {
  const recipes = await fetchRecipes();
  return (
    <AuthProvider>
      <MainTemplate recipes={recipes} />
    </AuthProvider>
  );
}
