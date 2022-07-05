import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { ReactNode, useState } from "react";
import Typography from "antd/lib/typography";
import Slider from "antd/lib/slider";
import InputNumber from "antd/lib/input-number";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { changeFilterPrice } from "store/product.slice";

const { Title } = Typography;
const ProductSlide = () => {
  const dispatch = useDispatch();
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);

  const handeChaneSlide = (value: number[]) => {
    setMin(value[0]);
    setMax(value[1]);
  };

  const handleChangeMin = (value: number) => {
    setMin(Number(value));
  };

  const handleChangeMax = (value: number) => {
    setMax(Number(value));
  };

  const handleClickSubmit = () => {
    dispatch(changeFilterPrice({ min, max }));
  };

  const renderFormat = (value: number | undefined): ReactNode =>
    `$${value?.toFixed(2)}`;

  return (
    <Row>
      <Title level={5}>Price</Title>
      <Col span={24}>
        <Slider
          value={[min, max]}
          range
          min={1}
          max={100}
          step={1}
          onChange={handeChaneSlide}
          defaultValue={[min, max]}
          trackStyle={[{ backgroundColor: "#009bbe" }]}
          handleStyle={[
            { backgroundColor: "#009bbe", borderColor: "#009bbe" },
            { backgroundColor: "#009bbe", borderColor: "#009bbe" }
          ]}
          tipFormatter={renderFormat}
        />
      </Col>
      <Col span={24}>
        <Row gutter={16} justify="space-between">
          <Col span={"auto"}>
            <InputNumber
              min={1}
              max={max}
              value={min}
              onChange={handleChangeMin}
            />
          </Col>
          <Col span={"auto"}>
            <InputNumber
              min={min}
              max={100}
              value={max}
              onChange={handleChangeMax}
            />
          </Col>
        </Row>
        <Col span={24}>
          <div className="mt-5">
            <Button type="primary" onClick={handleClickSubmit}>Filter</Button>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default ProductSlide;
