import notification from "antd/lib/notification";
import { ICart } from "types/cart.model";

export const fetchApi = async (url: string) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
};

export const setLimitTring = (string: string, limit: number = 80) => {
  if (string) {
    if (string.length > limit) {
      return string.substring(0, limit) + "...";
    }
    return string;
  }
};

type NotificationType = "success" | "info" | "warning" | "error";
export const openNotification = (type: NotificationType, message: string) => {
  notification[type]({
    message,
    placement: "top",
    duration: 2
  });
};

export const changePriceOutput = (price: number) => {
  return `$${price.toFixed(2)}`;
};

export const isVietnamesePhoneNumber = (number: string) => {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
};

export const getTotalPrice = (carts: ICart[]) => {
  if (carts.length === 0) {
    return 0;
  }
  return carts.reduce((total, cart) => total + cart.price, 0);
};
