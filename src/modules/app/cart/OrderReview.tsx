import Typography from "antd/lib/typography";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useSelector } from "react-redux";

import { RootState } from "store";
import { useCallback, useEffect, useState } from "react";
import { changePriceOutput, fetchApi } from "helpers/function";
import { SERVICE_API } from "constants/configs";
import { ICart } from "types/cart.model";
import Space from "antd/lib/space";
import styles from "./cart.module.css";

const { Title, Text } = Typography;
const OrderReview = () => {
  const { cartsCheckOut, totalPrice } = useSelector(
    (state: RootState) => state.carts
  );
  const [listCart, setListCart] = useState<ICart[]>();
  const getData = useCallback(async () => {
    const listsCart = await Promise.all(
      cartsCheckOut.map(async (cart) => {
        const product = await fetchApi(
          `${SERVICE_API}/product/${cart.productId}`
        );
        return { ...cart, productName: product.name };
      })
    );
    setListCart(listsCart);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="text-base">
      <Title level={3}>Your order</Title>
      <div className={`${styles["card-heading"]} ${styles.card} `}>
        <Row align="middle">
          <Col span={16}>
            <Title level={5}>Product</Title>
          </Col>
          <Col span={8}>
            <Title level={5}>Subtotal</Title>
          </Col>
        </Row>
      </div>
      {listCart &&
        listCart.map((cart) => (
          <div key={cart.id} className={`${styles.card}`}>
            <Row>
              <Col span={16}>
                <Space>
                  <Text className="capitalize">{cart.productName}</Text>
                  <strong className="text-[#ea2251] ">{`x ${cart.quantity}`}</strong>
                </Space>
              </Col>
              <Col span={8}>
                <Text>{changePriceOutput(cart.price)}</Text>
              </Col>
            </Row>
          </div>
        ))}
      <div className={`${styles.card}`}>
        <Row align="middle">
          <Col span={16}>
            <Text>Shipping</Text>
          </Col>
          <Col span={8}>
            <Text>Free</Text>
          </Col>
        </Row>
      </div>
      <div className={`${styles.card}`}>
        <Row align="middle">
          <Col span={16}>
            <Title level={5}>SubTotal</Title>
          </Col>
          <Col span={8}>
            <Text className="text-[#ea2251]">
              {changePriceOutput(totalPrice)}
            </Text>
          </Col>
        </Row>
      </div>
      <div className={`${styles["card-footer"]} ${styles.card} `}>
        <Row>
          <Col span={16}>
            <Title level={5}>Total</Title>
          </Col>
          <Col span={8}>
            <strong className="text-[#ea2251]">
              {changePriceOutput(totalPrice)}
            </strong>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderReview;
