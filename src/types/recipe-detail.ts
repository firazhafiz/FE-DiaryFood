export interface Comment {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  resepId: number;
  user: {
    id: number;
    name: string;
    photo: string;
  };
}

export interface RecipeDetail {
  id: number;
  nama: string;
  photoResep: string;
  kategoriId?: number;
  tanggalUnggah: string;
  description: string;
  user?: {
    name: string;
    photo: string;
  };
  bahanList: {
    nama: string;
    jumlah: string;
  }[];
  langkahList: {
    id: number;
    urutan: number;
    deskripsi: string;
  }[];
  cookingTime: string;
  preparationTime: string;
  servingTime: string;
  note: string;
  totalComments: number;
  savesCount: number;
  totalReviews: number;
  averageRating: number;
  isSavedByCurrentUser: boolean;
  kategori?: {
    nama: string;
  };
  comment?: Comment[]; // Allow undefined to handle initial state
}
