import { Row } from "antd";
import { FC } from "react";

import { IProduct } from "../../types/product.model";
import ProductImage from "./ProductImage";

const HotProduct: FC<{ listProduct: IProduct[] }> = ({ listProduct }) => {
  return (
    <Row gutter={6} align="middle">
      {listProduct.map((product) => (
        <ProductImage product={product} key={product.id} />
      ))}
    </Row>
  );
};

export default HotProduct;
