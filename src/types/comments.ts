interface Comment {
  id: number;
  user: {
    id: number;
    name: string;
    photo: string | null;
  };
  rating: number;
  resepId: number;
  comment: string;
  createdAt: Date;
}

export type { Comment };
