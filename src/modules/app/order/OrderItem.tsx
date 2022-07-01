import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import { SERVICE_API } from "constants/configs";
import { useDispatch } from "react-redux";
import { FC, useCallback, useEffect, useState } from "react";

import { updateStatusOrder } from "store/order.slice";
import { AppDispatch } from "store";
import { changePriceOutput, fetchApi, getTotalPrice } from "helpers/function";
import { ICart } from "types/cart.model";
import { IOrder } from "types/order.model";
import OrderDetail from "./OrderDetail";
import styles from "./order.module.css";

const { Text } = Typography;
const OrderItem: FC<{ order: IOrder }> = ({ order }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [listCart, setListCart] = useState<ICart[]>();
  const [status, setStatus] = useState<string>();
  const [className, setClassName] = useState<string>();
  const handleClickReceiced = async () => {
    const data = { id: order.id, isComplete: true, isCancel: false };
    const result = await dispatch(updateStatusOrder(data))
      .unwrap()
      .then((payload) => payload);
    const newListCart = listCart?.map((item) => ({
      ...item,
      isSuccess: result.isComplete
    }));
    setListCart(newListCart);
  };

  const handleClickConfirmModal = (cartId: string) => {
    const newListCart = listCart?.map((cart) => {
      if (cart.id === cartId) {
        return { ...cart, isReview: true };
      }
      return { ...cart };
    });
    setListCart(newListCart);
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
      setClassName("text-[#f5b421]");
    }
    if (order.isComplete) {
      setStatus("Success");
      setClassName("text-[#26aa99]");
    }
    getData();
  }, [getData, order.isComplete]);
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
              <OrderDetail
                key={cart.id}
                cart={cart}
                userName={order.userName}
                handleClickConfirmModal={handleClickConfirmModal}
              />
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
