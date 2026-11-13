export type Person = {
  _id: string;
  name: string;
  username: string;
  bio?: string;
  followers?: string[];
  following?: string[];
};

export type Post = {
  _id: string;
  author: Person | null;
  content: string;
  likes: string[];
  createdAt: string;
};
