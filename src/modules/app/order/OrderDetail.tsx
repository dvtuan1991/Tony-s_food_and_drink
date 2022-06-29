import { FC, useCallback, useEffect, useState } from "react";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";

import ProductImage from "components/Product/ProductImage";
import { IProduct } from "types/product.model";
import { ICart } from "types/cart.model";
import ModalWriteReview from "components/Modal/ModalWriteReview";
import { fetchApi } from "helpers/function";
import { SERVICE_API } from "constants/configs";

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
    <div>
      {product && (
        <Row>
          <Col span={8}>
            <div>
              <ProductImage product={product} />
            </div>
            <Text>{product.name}</Text>
          </Col>
          <Col span={16}>
            <Row align="middle">
              <Col span={8}>
                <Text>{cart.quantity}</Text>
              </Col>
              <Col span={8}>
                <Text>{cart.price}</Text>
              </Col>
              <Col span={8}>
                <ModalWriteReview product={product} quantity={cart.quantity} />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OrderDetail;
