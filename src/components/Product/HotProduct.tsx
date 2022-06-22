import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { FC } from "react";

import { IProduct } from "../../types/product.model";
import ProductImage from "./ProductImage";

const HotProduct: FC<{ listProduct: IProduct[] }> = ({ listProduct }) => {
  return (
    <Row gutter={6} align="middle">
      {listProduct.map((product) => (
        <Col span={6} key={product.id}>
          <ProductImage product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default HotProduct;
