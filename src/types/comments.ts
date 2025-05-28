interface Comments {
  id: number;
  user: {
    id: number;
    nama: string;
    photo: string | null;
  };
  resepId: number;
  comment: string;
  createdAt: Date;
}

export type { Comments };
