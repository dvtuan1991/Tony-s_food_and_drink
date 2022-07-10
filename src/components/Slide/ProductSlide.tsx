import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { ReactNode, useEffect, useState } from "react";
import Typography from "antd/lib/typography";
import Slider from "antd/lib/slider";
import InputNumber from "antd/lib/input-number";
import { Button } from "antd";
import { useSearchParams } from "react-router-dom";

const { Title } = Typography;
const ProductSlide = () => {
  const [searchQuerry, setSearchQuerry] = useSearchParams();

  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  console.log(searchQuerry.get("min"));
  console.log(searchQuerry.get("max"));
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
    const queryObj: any = {};
    searchQuerry.forEach((value, key) => {
      queryObj[key] = value;
    });
    queryObj.min = min + "";
    queryObj.max = max + "";
    setSearchQuerry(queryObj);
  };

  const renderFormat = (value: number | undefined): ReactNode =>
    `$${value?.toFixed(2)}`;
  useEffect(() => {
    setMin(searchQuerry.get("min") ? Number(searchQuerry.get("min")) : 1);
    setMax(searchQuerry.get("min") ? Number(searchQuerry.get("max")) : 100);
  }, [searchQuerry]);
  return (
    <Row>
      <Title level={5}>Filter By Price:</Title>
      <Col span={24}>
        <Slider
          value={[min, max]}
          range
          min={1}
          max={100}
          step={1}
          onChange={handeChaneSlide}
          defaultValue={[
            searchQuerry.get("min") ? Number(searchQuerry.get("min")) : min,
            searchQuerry.get("max") ? Number(searchQuerry.get("max")) : max
          ]}
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
          <Col span={12}>
            <InputNumber
              min={1}
              max={max}
              value={min}
              onChange={handleChangeMin}
              className="w-full"
            />
          </Col>
          <Col span={12}>
            <InputNumber
              min={min}
              max={100}
              value={max}
              onChange={handleChangeMax}
              className="w-full"
            />
          </Col>
        </Row>
        <Col span={24}>
          <div className="mt-5">
            <Button type="primary" onClick={handleClickSubmit}>
              Filter
            </Button>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default ProductSlide;
