import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "store";
import { getOrderList } from "store/order.slice";
import { PAGE_SIZE, SERVICE_API } from "constants/configs";
import { FilterOrderType, SortOrderType } from "types/order.model";
import { changeDateOrderOutput, changePriceOutput } from "helpers/function";
import OrderStatusTag from "components/Tag/OrderStatusTag";

const { Title, Text } = Typography;
const NewUpdate = () => {
  const { orders } = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const url = `${SERVICE_API}/orderlist/adminlist?index=1&limit=${PAGE_SIZE}&sort=${SortOrderType.DEFAULT}&status=${FilterOrderType.DEFAULT}`;
    dispatch(getOrderList(url));
  }, []);
  return (
    <div>
      <Row gutter={32}>
        <Col span={12}>
          <div>
            <div className="p-5">
              <Title level={5}>New Order:</Title>
            </div>
            <Row className="px-5">
              <Col span={4}>
                <Title level={5}>Customer</Title>
              </Col>
              <Col span={11}>
                <Title level={5}>Location</Title>
              </Col>
              <Col span={5}>
                <Title level={5}>Order Status</Title>
              </Col>
              <Col span={3}>
                <Title level={5}>Price</Title>
              </Col>
            </Row>
            <div className="px-5">
              {orders.map((order) => (
                <Row key={order.id}>
                  <Col span={4}>
                    <Text className="font-semibold text-lg">
                      {order.userName}
                    </Text>
                  </Col>
                  <Col span={11}>
                    <Text>{order.userAddress}</Text>
                  </Col>
                  <Col span={5}>
                    <OrderStatusTag order={order} />
                  </Col>
                  <Col span={3}>
                    <div>
                      <Text>{changePriceOutput(order.totalPrice)}</Text>
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
          </div>
        </Col>
        <Col span={12}>test</Col>
      </Row>
    </div>
  );
};

export default NewUpdate;
