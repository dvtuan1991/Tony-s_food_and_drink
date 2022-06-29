import Button from "antd/lib/button";
import Checkbox, { CheckboxChangeEvent } from "antd/lib/checkbox/Checkbox";
import Col from "antd/lib/col";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal";
import Rate from "antd/lib/rate";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import ProductImage from "components/Product/ProductImage";
import { ChangeEvent, FC, useState } from "react";

import { IProduct } from "types/product.model";

const { Text } = Typography;
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const ModalWriteReview: FC<{ product: IProduct; quantity: number }> = ({
  product,
  quantity
}) => {
  const [rateValue, setRateValue] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const handleChangeCommnet = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleClickCheckbox = (e: CheckboxChangeEvent) => {
    setIsCheck(e.target.checked);
  };
  return (
    <div>
      <Button>Review</Button>
      <Modal>
        <div className="p-5">
          <Row>
            <Col span={12}>
              <div>
                <ProductImage product={product} />
              </div>
            </Col>
            <Col span={12}>
              <Text>
                {product.name} <span>{`x ${quantity}`}</span>
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Rate
                allowClear={false}
                tooltips={desc}
                value={rateValue}
                onChange={setRateValue}
              />
              <Text className="ant-rate-text">{desc[rateValue - 1]}</Text>
            </Col>
            <Col span={24}>
              <Text>Your Comment: </Text>
              <TextArea
                placeholder="How do you thing this product"
                value={comment}
                onChange={handleChangeCommnet}
              />
            </Col>
            <Col span={24}>
              <Checkbox onChange={handleClickCheckbox}>Anymous mode</Checkbox>
            </Col>
            <Col span={24}>
              <Button>Submit</Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default ModalWriteReview;
