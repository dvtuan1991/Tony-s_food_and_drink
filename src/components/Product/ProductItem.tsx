import { FC } from "react";
import Typography from "antd/lib/typography";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
import Tag from "antd/lib/tag";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import Space from "antd/lib/space";

import { RootState } from "store";
import { createCart } from "store/cart.slice";
import { SERVICE_API } from "constants/configs";
import { IProduct } from "types/product.model";
import { changePriceOutput } from "helpers/function";
import ProductImage from "./ProductImage";
import styles from "./product.module.css";

const { Title, Text } = Typography;
const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch: Dispatch<any> = useDispatch();
  const handleClickAdd = async () => {
    let userId: number = -1;
    const guestId = localStorage.getItem("guestId");
    if (user.userName) {
      userId = user.id;
    }
    if (!user.userName && guestId) {
      userId = Number(guestId);
    }
    if (!user.userName && !guestId) {
      const response = await fetch(`${SERVICE_API}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      if (response.ok) {
        const responseId = await response.json().then((result) => result.id);
        userId = responseId;
        localStorage.setItem("guestId", responseId);
      }
    }
    dispatch(
      createCart({
        userId,
        productId: product.id,
        price: product.newPrice,
        quantity: 1,
        isNew: true
      })
    );
  };
  return (
    <Col span={8}>
      <div className={styles["product-item"]}>
        <div className="w-full h-[220px] mb-5 relative">
          <ProductImage product={product} />
          {product.oldPrice && product.oldPrice > product.newPrice && (
            <div className={styles["product-tag-sale"]}>
              <Tag className="text-base text-white" color="#009bbe">
                Sale
              </Tag>
            </div>
          )}
        </div>
        <div>
          <Title level={5} className={"capitalize"}>
            {product.name}
          </Title>
          {product.oldPrice && product.oldPrice > product.newPrice ? (
            <div>
              <Space>
                <Text delete className="text-[#aaa] text-base">
                  {changePriceOutput(product.oldPrice)}
                </Text>
                <Text className="text-[#009bbe] text-lg">
                  {changePriceOutput(product.newPrice)}
                </Text>
              </Space>
            </div>
          ) : (
            <div>
              <Text className="text-[#009bbe] text-base">
                {changePriceOutput(product.newPrice)}
              </Text>
            </div>
          )}
        </div>
        <div className={styles["product-item_footer"]}>
          <Button
            block
            className="bg-[#009bbe] rounded hover:bg-[#009bbe] hover:text-white text-white focus:bg-[#009bbe] focus:text-white"
            onClick={handleClickAdd}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default ProductItem;
