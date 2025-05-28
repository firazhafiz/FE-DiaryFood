interface RecipeDetail {
  id: string;
  nama: string;
  photoResep: string;
  tanggalUnggahan: string;
  user?: {
    name: string;
    photo: string;
  };
  ingredients: string[];
  langkahList: { deskripsi: string }[];
  catatan?: string;
  rating?: number;
  reviewers?: number;
}

export type { RecipeDetail };
