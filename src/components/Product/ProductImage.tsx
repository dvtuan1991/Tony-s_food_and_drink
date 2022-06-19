import { Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../types/product.model";

const ProductImage: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Col span={6}>
      <Link to={`product/:${product.id}`}>
        <img src={product.thumbnail} alt={product.name} />
      </Link>
    </Col>
  );
};

export default ProductImage;
