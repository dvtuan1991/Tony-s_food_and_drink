import Button from "antd/lib/button";
import Col from "antd/lib/col";
import Collapse from "antd/lib/collapse";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";
import { FC, useCallback, useEffect, useState } from "react";
import { ICart } from "types/cart.model";

import { IOrder } from "types/order.model";
import OrderDetail from "./OrderDetail";

const { Panel } = Collapse;
const { Title, Text } = Typography;
const OrderItem: FC<{ order: IOrder }> = ({ order }) => {
  const [listCart, setListCart] = useState<ICart[]>();
  const getData = useCallback(async () => {
    const getListCart = await fetchApi(
      `${SERVICE_API}/order/orderlist/${order.id}`
    );
    setListCart(getListCart);
  }, [order.id]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div>
      <Row>
        <Col span={24}>
          <Title className="text-center" level={5}>
            Contact Information
          </Title>
        </Col>
        <Col span={24}>
          <Button>Received</Button>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={8}>
              <Text>User Name:</Text>
              <Text>{order.userName}</Text>
            </Col>
            <Col span={8}>
              <Text>User Phone:</Text>
              <Text>{`${order.userPhone}`}</Text>
            </Col>
            <Col span={8}>
              <Text>User Address:</Text>
              <Text>{`${order.userAddress}`}</Text>
            </Col>
          </Row>
          <Col span={24}>
            {listCart && (
              <Collapse>
                <Panel key={order.id} header={<Text>See Detail</Text>}>
                  {listCart.map((cart) => (
                    <OrderDetail key={cart.id} cart={cart} />
                  ))}
                </Panel>
              </Collapse>
            )}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default OrderItem;
