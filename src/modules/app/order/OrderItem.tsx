import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import { SERVICE_API } from "constants/configs";
import { useDispatch } from "react-redux";
import { FC, useCallback, useEffect, useState } from "react";
import Popconfirm from "antd/lib/popconfirm";

import { updateStatusOrder } from "store/order.slice";
import { AppDispatch } from "store";
import {
  changePriceOutput,
  fetchApi,
  getTotalPrice,
  changeDateOrderOutput
} from "helpers/function";
import { ICart } from "types/cart.model";
import { IOrder } from "types/order.model";
import OrderDetail from "./OrderDetail";
import styles from "./order.module.css";

const { Text } = Typography;
const OrderItem: FC<{ order: IOrder }> = ({ order }) => {
  const [visibleConfirmReceived, setVisitbleReceived] =
    useState<boolean>(false);
  const [visibleConfirmCancel, setVisitbleCancel] = useState<boolean>(false);
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

  const handleClickCancel = async () => {
    const data = { id: order.id, isComplete: false, isCancel: true };
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
    if (order.isCancel) {
      setStatus("Cancel");
      setClassName("text-[#ff4d4f]");
    }
    getData();
  }, [getData, order.isComplete, order.isCancel]);
  return (
    <div className={styles["order-content"]}>
      {listCart && (
        <div className={styles["order-box"]}>
          <Row>
            <Col span={24}>
              <div className={styles["order-header"]}>
                <Row align="middle" justify="space-between">
                  <Col span={6}>
                    <Text>{changeDateOrderOutput(order.createAt)}</Text>
                  </Col>
                  <Col span={6} className={"text-right"}>
                    <div>
                      <Text className="font-bold">Total:</Text>
                      <Text className="ml-2 text-[#009bbe] text-lg">
                        {changePriceOutput(getTotalPrice(listCart))}
                      </Text>
                    </div>
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
              <Row className="pr-5 pb-5" align="middle" justify="end">
                {!order.isCancel && !order.isComplete && (
                  <Col className="pr-5">
                    <Popconfirm
                      title="Are you sure want"
                      onConfirm={handleClickCancel}
                      onCancel={() => setVisitbleCancel(false)}
                      visible={visibleConfirmCancel}
                    >
                      <Button danger onClick={() => setVisitbleCancel(true)}>
                        Cancel
                      </Button>
                    </Popconfirm>
                  </Col>
                )}
                <Col className="pr-5">
                  {!order.isComplete && !order.isCancel && (
                    <Popconfirm
                      title="Are you sure want"
                      onConfirm={handleClickReceiced}
                      onCancel={() => setVisitbleReceived(false)}
                      visible={visibleConfirmReceived}
                    >
                      <Button onClick={() => setVisitbleReceived(true)}>
                        Received
                      </Button>
                    </Popconfirm>
                  )}
                </Col>
                <Col>
                  <Text className="text-bold mr-3">Status:</Text>
                  <Text className={className}>{status}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
