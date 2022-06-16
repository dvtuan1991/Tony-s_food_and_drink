export interface IProduct {
  id: number;
  categoryId: number;
  name: string;
  thumbnail: string;
  newPrice: number;
  oldPrice?: number;
  decription: string;
  isStock: boolean;
  priority: number;
}
