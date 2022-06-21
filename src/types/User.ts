export interface IUser {
  id: number;
  userName?: string;
  password?: string;
  avatar?: string;
  email: string;
  name: string;
  phone: number;
  address: string;
  isAdmin?: boolean;
}