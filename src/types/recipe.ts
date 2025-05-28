interface Recipe {
  id: number;
  nama: string;
  photoResep: string;
  kategoriId: number;
  tanggalUnggahan: string;
  userId: number;
  isApproved: "PENDING" | "APPROVED" | "REJECTED";
  tanggalAcc: string | null;
  disetujuiOleh: number | null;
  kategori: { nama: string };
  user: { name: string; photo: string | null };
  tags: string[];
}

export type { Recipe };
