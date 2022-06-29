import { FC, useCallback, useEffect, useState } from "react";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import Space from "antd/lib/space";

import ProductImage from "components/Product/ProductImage";
import { IProduct } from "types/product.model";
import { ICart } from "types/cart.model";
import { changePriceOutput, fetchApi } from "helpers/function";
import { SERVICE_API } from "constants/configs";
import styles from "./order.module.css";

const { Text } = Typography;
const OrderDetail: FC<{ cart: ICart }> = ({ cart }) => {
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
              <div className="w-32 h-auto p-1">
                <ProductImage product={product} />
              </div>
              <div className="flex flex-col">
                <Text className="capitalize">{product.name}</Text>
                <Text className="text-[#ea2251] font-bold">{`x ${cart.quantity}`}</Text>
              </div>
            </Space>
          </Col>
          <Col span={12}>
            <Row align="middle">
              <Col span={8}>
                {product.oldPrice && product.newPrice < product.oldPrice ? (
                  <Space size={"small"}>
                    <Text delete>{`${changePriceOutput(
                      product.oldPrice
                    )}`}</Text>
                    <Text>{`${changePriceOutput(product.newPrice)}`}</Text>
                  </Space>
                ) : (
                  <Text>{changePriceOutput(product.newPrice)}</Text>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OrderDetail;
