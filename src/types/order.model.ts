export enum SortOrderType {
  DEFAULT = "none",
  NEWEST = "new",
  OLDEST = "old",
  ASCENT = "ascent",
  DECENT = "decent"
}

export enum FilterOrderType {
  DEFAULT = "none",
  CANCEL = "cancel",
  COMPLETE = "complete",
  SHIPPING = "shipping"
}

export interface IOrder {
  id: string;
  userId: number;
  userPhone: string;
  userName: string;
  userAddress: string;
  createAt: number;
  totalPrice: number;
  isComplete: boolean;
  isCancel?: boolean;
  ordinalNum?: number;
}
