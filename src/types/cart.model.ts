export interface ICart {
  id: string;
  productId: number;
  userId: number;
  isNew?: boolean;
  isConfirm?: boolean;
  isSuccess?: boolean;
  isCancel?: boolean;
  quantity: number;
  price: number;
  productName?: string;
  orderListId?: string;
  isReview?: boolean;
}
