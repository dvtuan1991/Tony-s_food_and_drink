import { FC } from "react";
import Typography from "antd/lib/typography";
import Col from "antd/lib/col";
import Button from "antd/lib/button";

import { IProduct } from "types/product.model";
import ProductImage from "./ProductImage";
import styles from "./product.module.css";

const { Title, Text } = Typography;

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Col span={8}>
      <div className={styles["product-item"]}>
        <div className="w-full h-[220px] mb-5">
          <ProductImage product={product} />
        </div>
        <div>
          <Title level={5}>{product.name}</Title>
          <Text>{`$${product.newPrice.toFixed(2)}`}</Text>
        </div>
        <div className={styles["product-item_footer"]}>
          <Button
            block
            className="bg-[#ea2251] rounded hover:bg-[#ea2251] hover:text-white text-white"
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default ProductItem;
