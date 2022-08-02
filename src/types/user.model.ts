export interface IUser {
  id: number;
  userName?: string;
  password?: string;
  avatar?: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  isAdmin?: boolean;
}