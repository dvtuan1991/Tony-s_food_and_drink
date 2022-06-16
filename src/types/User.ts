export interface IUser {
  id: number;
  username?: string;
  password?: string;
  avatar?: string;
  email: string;
  name: string;
  phone: number;
  address: string;
  isAdmin?: boolean;
}