export interface Kategori {
  id: number;
  nama: string;
  totalRecipe: number;
}

export const categories: Kategori[] = [
  {
    id: 1,
    nama: "Breakfast",
    totalRecipe: 100,
  },
  {
    id: 2,
    nama: "Lunch",
    totalRecipe: 77,
  },
  {
    id: 3,
    nama: "Dinner",
    totalRecipe: 12,
  },
  {
    id: 4,
    nama: "Dessert",
    totalRecipe: 82,
  },
  {
    id: 5,
    nama: "Snacks",
    totalRecipe: 12,
  },
  {
    id: 6,
    nama: "Drinks",
    totalRecipe: 16,
  },
];
