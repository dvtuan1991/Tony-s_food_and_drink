export interface ICart {
  id: number;
  productId: number;
  userId: number;
  isNew?: boolean;
  isConfirm?: boolean;
  isSuccess?: boolean;
  isCancel?: boolean;
  quantity?: number;
  orderListId?: string;
}
