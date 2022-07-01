import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Typography from "antd/lib/typography";
import { getOrderList, updateStatusOrder } from "store/order.slice";
import { RootState } from "store";
import OrderItem from "./OrderItem";

const { Title } = Typography;
const OrderContent = () => {
  const { user } = useSelector((state: RootState) => state.users);
  const { orders } = useSelector((state: RootState) => state.orders);
  const dispatch: Dispatch<any> = useDispatch();
  const guestId = localStorage.getItem("guestId");

  useEffect(() => {
    const userId = user.id ? user.id : Number(guestId);
    dispatch(getOrderList(userId));
  }, [user.id, guestId, dispatch]);

  if (orders.length === 0) {
    return <span>No thing</span>;
  }
  return (
    <Row justify="center">
      {orders.length && (
        <>
          <Col span={24}>
            <Title level={3}>Your Order</Title>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24}>
                {orders.map((order) => (
                  <OrderItem
                    order={order}
                    key={order.id}
                  />
                ))}
              </Col>
            </Row>
          </Col>
        </>
      )}
    </Row>
  );
};

export default OrderContent;
