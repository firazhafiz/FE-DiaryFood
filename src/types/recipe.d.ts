interface Recipe {
  id: number;
  nama: string;
  kategoriId: number;
  tanggalUnggahan: string; // timestamp without time zone
  userId: number;
  disetujuiOleh: number;
  tanggalAcc: string; // timestamp without time zone
  isApproved: boolean;
  photoResep: string;
}

export type { Recipe };
