import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { FC, useState } from "react";
import Typography from "antd/lib/typography";
import Space from "antd/lib/space";
import { Button, InputNumber } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "store";
import { IProduct } from "types/product.model";
import { createCart } from "store/cart.slice";
import ProductImage from "components/Product/ProductImage";
import { changePriceOutput, openNotification } from "helpers/function";
import { SERVICE_API } from "constants/configs";

const { Title, Text } = Typography;
const ProductContent: FC<{ product: IProduct }> = ({ product }) => {
  const [quantityValue, setQuantity] = useState(1);
  const { user } = useSelector((state: RootState) => state.users);
  const { isCartLoading } = useSelector((state: RootState) => state.carts);
  const dispatch = useDispatch<AppDispatch>();
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
        quantity: quantityValue,
        isNew: true
      })
    )
      .unwrap()
      .then(() => {
        openNotification("success", "Add To Cart success");
        setQuantity(1);
      });
  };
  return (
    <div>
      <Row gutter={32}>
        <Col span={12}>
          <div className="pl-5 h-[432px] ">
            <ProductImage product={product} />
          </div>
        </Col>
        <Col span={12}>
          <div className="pt-2">
            <Title level={1}>{product.name}</Title>
            {product.oldPrice && product.oldPrice > product.newPrice ? (
              <div>
                <Space>
                  <Text delete className="text-[#aaa] text-base">
                    {changePriceOutput(product.oldPrice)}
                  </Text>
                  <Text className="text-[#ea2251] text-lg">
                    {changePriceOutput(product.newPrice)}
                  </Text>
                </Space>
              </div>
            ) : (
              <div>
                <Text className="text-[#ea2251] text-base">
                  {changePriceOutput(product.newPrice)}
                </Text>
              </div>
            )}
            <div className="mt-3 mb-3">
              <Text className="text-base">{product.decription}</Text>
            </div>
            <div className="flex">
              <div className="w-16 mr-3">
                <InputNumber
                  size="large"
                  min={1}
                  max={100}
                  value={quantityValue}
                  onChange={setQuantity}
                  className="w-full "
                />
              </div>
              <div>
                <Button
                  className="common-button"
                  size="large"
                  onClick={handleClickAdd}
                  disabled={isCartLoading}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductContent;
