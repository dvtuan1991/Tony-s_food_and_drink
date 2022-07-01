import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { FC, useState } from "react";

import ProductImage from "components/Product/ProductImage";
import { IProduct } from "types/product.model";
import Typography from "antd/lib/typography";
import Space from "antd/lib/space";
import { changePriceOutput } from "helpers/function";
import { Button, InputNumber } from "antd";

const { Title, Text } = Typography;
const ProductContent: FC<{ product: IProduct }> = ({ product }) => {
  const [quantityValue, setQuantity] = useState(1);
  return (
    <div>
      <Row gutter={32}>
        <Col span={12}>
          <div className="p-1 h-[432px]">
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
                <Button className="common-button" size="large">
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
