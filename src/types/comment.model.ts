export interface IComment {
  id: string;
  productId: number;
  createAt: number;
  rating: number;
  comment: string;
  isAnonymous: boolean;
  userName: string;
}