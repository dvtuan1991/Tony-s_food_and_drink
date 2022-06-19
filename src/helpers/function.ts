import notification from "antd/lib/notification";

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
    } else {
      return string;
    }
  }
};

type NotificationType = "success" | "info" | "warning" | "error";
export const openNotification = (type: NotificationType, message: string) => {
  notification[type]({
    message,
    placement: "top",
    duration: 2,
  });
};
