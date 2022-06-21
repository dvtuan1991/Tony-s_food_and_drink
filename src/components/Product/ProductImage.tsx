import { Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import { SERVICE_API } from "constants/configs";
import { IProduct } from "../../types/product.model";

const ProductImage: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Col span={6}>
      <Link to={`product/:${product.id}`}>
        <img src={`${SERVICE_API}/${product.thumbnail}`} alt={product.name} />
      </Link>
    </Col>
  );
};

export default ProductImage;
