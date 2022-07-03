import { FC, useCallback, useEffect, useState } from "react";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import Space from "antd/lib/space";

import ModalWriteReview from "components/Modal/ModalWriteReview";
import ProductImage from "components/Product/ProductImage";
import { IProduct } from "types/product.model";
import { ICart } from "types/cart.model";
import { changePriceOutput, fetchApi } from "helpers/function";
import { SERVICE_API } from "constants/configs";
import styles from "./order.module.css";

const { Text } = Typography;
const OrderDetail: FC<{
  cart: ICart;
  userName: string;
  handleClickConfirmModal: Function;
}> = ({ cart, userName, handleClickConfirmModal }) => {
  const [product, setProduct] = useState<IProduct>();

  const getData = useCallback(async () => {
    const getProduct = await fetchApi(
      `${SERVICE_API}/product/${cart.productId}`
    );
    setProduct(getProduct);
  }, [cart.id]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className={styles["order-item"]}>
      {product && (
        <Row align="middle">
          <Col span={12}>
            <Space size={"large"}>
              <div className="w-32 h-32 p-5">
                <ProductImage product={product} />
              </div>
              <div className="flex flex-col">
                <Text className="capitalize font-semibold text-lg">
                  {product.name}
                </Text>
                <Row align="middle">
                  <div>
                    <Text className="">Quantity: </Text>
                    <Text className="text-[#ea2251] font-bold">
                      {cart.quantity}
                    </Text>
                  </div>
                  <Text className="ml-3">x</Text>
                  <div className="ml-3">
                    {product.oldPrice && product.newPrice < product.oldPrice ? (
                      <Space size={"small"}>
                        <Text
                          delete
                          className="text-xs text-slate-300"
                        >{`${changePriceOutput(product.oldPrice)}`}</Text>
                        <Text className="text-lg text-[#ea2251]">{`${changePriceOutput(
                          product.newPrice
                        )}`}</Text>
                      </Space>
                    ) : (
                      <Text className="text-lg text-[#ea2251]">
                        {changePriceOutput(product.newPrice)}
                      </Text>
                    )}
                  </div>
                </Row>
              </div>
            </Space>
          </Col>
          <Col span={12}>
            <Row align="middle" justify="end" className="pr-5">
              {cart.isSuccess && !cart.isReview && (
                <ModalWriteReview
                  product={product}
                  userName={userName}
                  cartId={cart.id}
                  action={handleClickConfirmModal}
                />
              )}
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OrderDetail;
