export interface Memory {
  _id: string;
  userId: string;
  topic: string;
  description: string;
  date: string;
  imageUrl?: string;
  createdAt?: string;
}

export interface Reminder {
  id: string;
  topic: string;
  description: string;
  date: string;
  time: string;
  createdAt: string;
}

export type TabType = "memories" | "gallery";
