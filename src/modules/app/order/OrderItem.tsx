import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import { SERVICE_API } from "constants/configs";
import { changePriceOutput, fetchApi, getTotalPrice } from "helpers/function";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { FC, useCallback, useEffect, useState } from "react";

import { updateStatusOrder } from "store/order.slice";
import { ICart } from "types/cart.model";
import { IOrder } from "types/order.model";
import OrderDetail from "./OrderDetail";
import styles from "./order.module.css";

const { Text } = Typography;
const OrderItem: FC<{ order: IOrder }> = ({ order }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const [listCart, setListCart] = useState<ICart[]>();
  const [status, setStatus] = useState<string>();
  const [className, setClassname] = useState<string>();

  const handleClickReceiced = async () => {
    dispatch(updateStatusOrder({ id: order.id, status: "complete" }));
  };

  const getData = useCallback(async () => {
    const getListCart = await fetchApi(
      `${SERVICE_API}/order/orderlist/${order.id}`
    );
    setListCart(getListCart);
  }, [order.id]);

  useEffect(() => {
    if (!order.isComplete) {
      setStatus("Shipping");
      setClassname("text-[#f5b421]");
    }
    if (order.isComplete) {
      setStatus("Success");
      setClassname("text-[#26aa99]");
    }
    getData();
  }, [getData, order]);
  return (
    <div className={styles["order-content"]}>
      {listCart && (
        <Row>
          <Col span={24}>
            <div className={styles["order-header"]}>
              <Row align="middle">
                <Col span={18}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Text className="font-bold">Shipping To: </Text>
                    </Col>
                    <Col>
                      <Text> Name:</Text>
                      <Text className="capitalize ml-1">{order.userName}</Text>
                    </Col>
                    <Col>
                      <Text> Phone:</Text>
                      <Text className="ml-1">{`${order.userPhone}`}</Text>
                    </Col>
                    <Col className="">
                      <Text> Address:</Text>
                      <Text className="capitalize ml-1">{`${order.userAddress}`}</Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={4}>
                  <Text className="font-bold">Status: </Text>
                  <Text className={className}>{status}</Text>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={24}>
            {listCart.map((cart) => (
              <OrderDetail key={cart.id} cart={cart} />
            ))}
          </Col>
          <Col span={24}>
            <Row className="pt-5" gutter={16}>
              <Col span={6} offset={12}>
                <div>
                  <Text className="font-bold">Order Total:</Text>
                  <Text className="ml-2 text-[#ea2251] text-lg">
                    {changePriceOutput(getTotalPrice(listCart))}
                  </Text>
                </div>
              </Col>
              <Col>
                {!order.isComplete && (
                  <Button onClick={handleClickReceiced}>Received</Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OrderItem;
