import moment from "moment";

import notification from "antd/lib/notification";
import { ICart } from "types/cart.model";
import { IComment } from "types/comment.model";
import { IStatisticComment } from "types/statistic.comment.model";

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

export const changeDateOrderOutput = (value: number) => {
  return `${moment(value).format(`MMMM DD, YYYY`)} at ${moment(value).format(
    `LTS`
  )}`;
};

export const groupBy = (objectArray: any, property: string) =>
  objectArray.reduce((acc: any, obj: any) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

export const groupByRatingPoint = (listComment: IComment[]) => {
  return listComment.reduce((acc: any, curr) => {
    const key = curr.rating;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += 1;
    return acc;
  }, {});
};

export const handleStaticResult = (data: {
  leng: number;
  statistic: { ratingPoint: number; total: number }[];
}) => {
  data.statistic.sort((a, b) => b.ratingPoint - a.ratingPoint);
  const result = data.statistic.map((item) => {
    if (item.total > 0) {
      return {
        ...item,
        percent: Number(((item.total / data.leng) * 100).toFixed(0))
      };
    }
    return {
      ...item,
      percent: 0
    };
  });
  return result;
};

export const getAvgPoint = (total: number, listStatic: IStatisticComment[]) => {
  const totalPoint = listStatic.reduce(
    (total, curr) => total + curr.ratingPoint * curr.total,
    0
  );
  return totalPoint / total;
};
