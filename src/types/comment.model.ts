export interface IComment {
  id: string;
  productId: number;
  userId: number;
  createAt: number;
  rating: number;
  comment: string;
  isAnonymous: boolean;
  userName: string;
  userAvatar?: string;
}
