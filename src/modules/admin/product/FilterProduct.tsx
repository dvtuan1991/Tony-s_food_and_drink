import Space from "antd/lib/space";
import Collapse from "antd/lib/collapse";
import Button from "antd/lib/button";
import Col from "antd/lib/col";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import Row from "antd/lib/row";
import Select from "antd/lib/select";
import Slider from "antd/lib/slider";
import Typography from "antd/lib/typography";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { AppDispatch, RootState } from "store";
import { getListCategories } from "store/category.slice";

const { Option } = Select;
const { Title } = Typography;
const { Panel } = Collapse;
const FilterProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuerry, setSearchQuerry] = useSearchParams();
  const { categories } = useSelector((state: RootState) => state.categories);
  const [fitterCategory, setFilterCategory] = useState<number>(-1);
  const [filterName, setFilterName] = useState<string>("");
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const handleChangeFilterCategory = (value: number) => {
    setFilterCategory(value);
  };

  const handleChangeMin = (value: number) => {
    setMin(Number(value));
  };

  const handleChangeMax = (value: number) => {
    setMax(Number(value));
  };

  const handleChangeFilterName = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value);
  };

  const handeChaneSlide = (value: number[]) => {
    setMin(value[0]);
    setMax(value[1]);
  };

  const renderFormat = (value: number | undefined): ReactNode =>
    `$${value?.toFixed(2)}`;

  const handleClickSubmitFilter = () => {
    const queryObj: any = {};
    searchQuerry.forEach((value, key) => {
      queryObj[key] = value;
    });
    queryObj.min = min + "";
    queryObj.max = max + "";
    queryObj.categoryId = fitterCategory + "";
    queryObj.index = "1";
    filterName.trim() !== ""
      ? (queryObj.name = filterName)
      : delete queryObj.name;
    setSearchQuerry({
      ...queryObj
    });
    setFilterName("");
  };

  useEffect(() => {
    dispatch(getListCategories());
  }, [dispatch, categories.length]);
  return (
    <Collapse className="mt-5">
      <Panel header="Filter By:" key="1">
        <div className="border border-solid boder-[#ccc] rounded-md">
          <Row gutter={16} align="middle" className=" sm:p-3 xs:p-3 lg:p-5 ">
            <Col xs={24} sm={24} lg={6}>
              <Title level={5}>Name:</Title>
              <Input
                value={filterName}
                onChange={handleChangeFilterName}
                placeholder="search name here"
              />
            </Col>
            <Col xs={24} sm={24} lg={6}>
              <Title level={5}>Category:</Title>
              <Select
                style={{ width: "100%" }}
                value={fitterCategory}
                onChange={handleChangeFilterCategory}
                defaultValue={
                  searchQuerry.get("categoryId")
                    ? Number(searchQuerry.get("categoryId"))
                    : -1
                }
              >
                <Option key={-1} value={-1} label={"All"}>
                  All
                </Option>
                <Option key={-2} value={-2} label={"Sale"}>
                  Sale
                </Option>
                {categories.map((category) => (
                  <Option
                    key={category.id}
                    value={category.id}
                    label={category.name.toLocaleUpperCase()}
                  >
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={24}>
              <Title level={5}>Price</Title>
              <Row gutter={16}>
                <Col xs={24} sm={24} lg={6}>
                  <Space>
                    <InputNumber
                      addonBefore={"$"}
                      min={1}
                      max={max}
                      value={min}
                      onChange={handleChangeMin}
                      placeholder="From"
                      className="w-full"
                    />
                    <InputNumber
                      addonBefore={"$"}
                      min={min}
                      max={100}
                      value={max}
                      onChange={handleChangeMax}
                      placeholder="To"
                      className="w-full"
                    />
                  </Space>
                </Col>
                <Col xs={24} sm={24} lg={6}>
                  <Slider
                    range
                    value={[min, max]}
                    onChange={handeChaneSlide}
                    defaultValue={[
                      searchQuerry.get("min")
                        ? Number(searchQuerry.get("min"))
                        : min,
                      searchQuerry.get("max")
                        ? Number(searchQuerry.get("max"))
                        : max
                    ]}
                    trackStyle={[{ backgroundColor: "#009bbe" }]}
                    handleStyle={[
                      { backgroundColor: "#009bbe", borderColor: "#009bbe" },
                      { backgroundColor: "#009bbe", borderColor: "#009bbe" }
                    ]}
                    min={1}
                    max={100}
                    step={1}
                    tipFormatter={renderFormat}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="mt-3">
              <Button onClick={handleClickSubmitFilter}>Filter</Button>
            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>
  );
};

export default FilterProduct;
