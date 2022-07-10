import { ChangeEvent, FC, useState } from "react";
import Button from "antd/lib/button";
import Checkbox, { CheckboxChangeEvent } from "antd/lib/checkbox/Checkbox";
import Col from "antd/lib/col";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal";
import Rate from "antd/lib/rate";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import { useSelector } from "react-redux";

import useWindowDimensions from "hooks/useWindowSize";
import { SERVICE_API } from "constants/configs";
import { RootState } from "store";
import { openNotification, setLimitTring } from "helpers/function";
import { IProduct } from "types/product.model";
import ProductImage from "components/Product/ProductImage";
import styles from "./modal.module.css";

const { Text, Title } = Typography;
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const ModalWriteReview: FC<{
  product: IProduct;
  userName: string;
  cartId: string;
  action: Function;
}> = ({ product, userName, cartId, action }) => {
  const { user } = useSelector((state: RootState) => state.users);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rateValue, setRateValue] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleClickOpen = () => {
    setIsModalVisible(true);
  };

  const handleCliCkCancel = () => {
    setIsModalVisible(false);
  };

  const handleClickOk = async () => {
    console.log(userName);
    console.log(user?.userName);
    const guestId = localStorage.getItem("guestId");
    const userInfo =
      user.id || user.id === 0
        ? { userId: user.id, userName: user.userName, userAvatar: user.avatar }
        : { userId: guestId, userName };
    const data = {
      ...userInfo,
      productId: product.id,
      rating: rateValue,
      comment: comment.trim(),
      isAnonymous: isCheck
    };
    const responseUpdate = await fetch(`${SERVICE_API}/comment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (responseUpdate.ok) {
      const responseUpdateCart = await fetch(
        `${SERVICE_API}/order/${cartId}/update`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ isReview: true })
        }
      );
      openNotification("success", "Thank you for your review");
      action(cartId);
      setIsModalVisible(false);
    }
  };
  const handleChangeCommnet = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleClickCheckbox = (e: CheckboxChangeEvent) => {
    setIsCheck(e.target.checked);
  };
  const { width } = useWindowDimensions();

  return (
    <div>
      <Button onClick={handleClickOpen}>Review</Button>
      <Modal
        visible={isModalVisible}
        onOk={handleClickOk}
        okText={<span className="text-[#000000d9]">OK</span>}
        onCancel={handleCliCkCancel}
        width={width}
      >
        <div className="p-5">
          <Row>
            <Col span={10}>
              <div className={styles["modal-image"]}>
                <ProductImage product={product} />
              </div>
            </Col>
            <Col span={14}>
              <div className="pl-3">
                <Title level={5} className="text-center">
                  {product.name}
                </Title>
                <Text>{setLimitTring(product.decription, 300)}</Text>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col span={24} className="pb-3">
              <div>
                <Text>How do you feel: </Text>
              </div>
              <Rate
                allowClear={false}
                tooltips={desc}
                value={rateValue}
                onChange={setRateValue}
              />
              <Text className="ant-rate-text">{desc[rateValue - 1]}</Text>
            </Col>
            <Col span={24} className="pb-3">
              <div className="mb-3">
                <Text>Write some thing:</Text>
              </div>
              <TextArea
                placeholder="How do you thing this product"
                value={comment}
                onChange={handleChangeCommnet}
              />
            </Col>
            <Col span={24}>
              <Checkbox onChange={handleClickCheckbox}>Anonymous mode</Checkbox>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default ModalWriteReview;
