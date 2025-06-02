import { Comment } from "./comments";
interface RecipeDetail {
  id: number;
  nama: string;
  photoResep: string;
  tanggalUnggahan: string;
  user?: {
    name: string;
    photo: string;
  };
  bahanList: {
    nama: string;
    jumlah: string;
  }[];
  comment: Comment[];
  langkahList: { deskripsi: string }[];
  description: string;
  cookingTime: string;
  preparationTime: string;
  servingTime: string;
  note: string;
  catatan?: string;
  rating?: number;
  reviewers?: number;
  savesCount: number;
  totalComments: number;
  totalReviews: number;
  averageRating: number;
  isSavedByCurrentUser: boolean;
}

export type { RecipeDetail };
