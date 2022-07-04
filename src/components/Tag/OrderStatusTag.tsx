import Tag from "antd/lib/tag";
import { FC } from "react";

import { IOrder } from "types/order.model";

const OrderStatusTag: FC<{ order: IOrder }> = ({ order }) => {
  if (order.isCancel) {
    return <Tag color={"error"}>Cancel</Tag>;
  }
  if (order.isComplete) {
    return <Tag color={"#108ee9"}>Complete</Tag>;
  }
  return <Tag color={"green"}>Shipping</Tag>;
};

export default OrderStatusTag;
