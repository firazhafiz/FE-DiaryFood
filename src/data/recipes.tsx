export interface Comment {
  user: {
    id: number;
    name: string;
    photo: string;
    createdAt: Date;
  };
}

export interface Ingredient {
  text: string;
  checked: boolean;
}

export interface Recipe {
  id: number;
  title: string;
  slug: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  comments: Comment[];
  saves: number;
  rating: number;
  ratingCount: number;
  prepTime: number;
  cookTime: number;
  serveTime: number;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  notes: string;
}



export const sidebarRecipes = [
  {
    title: "Ayam Bakar Taliwang",
    slug: "ayam-bakar-taliwang",
    image: "/assets/images/ayam_bakar.jpg",
  },
  {
    title: "Sate Padang",
    slug: "sate-padang",
    image: "/assets/images/sate_padang.jpg",
  },
  {
    title: "Mie Goreng Jawa",
    slug: "mie-goreng-jawa",
    image: "/assets/images/mie_goreng.jpg",
  },
];
