export interface IOrder {
  id: string;
  userId: number;
  userPhone: string;
  userName: string;
  userAddress: string;
  createAt: number;
  totalPrice: number;
  isComplete: boolean;
}
