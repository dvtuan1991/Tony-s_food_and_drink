import Row from "antd/lib/row";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { AppDispatch } from "store";
import { FilterOrderType, SortOrderType } from "types/order.model";
import { Button } from "antd";

const { Option } = Select;
const listSortOrder = [
  { id: 0, value: SortOrderType.DEFAULT, title: "Default" },
  {
    id: 1,
    value: SortOrderType.NEWEST,
    title: "Newest"
  },
  {
    id: 2,
    value: SortOrderType.OLDEST,
    title: "Oldest"
  },
  {
    id: 3,
    value: SortOrderType.ASCENT,
    title: " Total Price: Low to hight"
  },
  {
    id: 4,
    value: SortOrderType.DECENT,
    title: " Total Price: Hight to low"
  }
];

const listFilterOrder = [
  {
    id: 0,
    label: "All",
    value: FilterOrderType.DEFAULT
  },
  {
    id: 1,
    label: "Shipping",
    value: FilterOrderType.SHIPPING
  },
  {
    id: 2,
    label: "Completed",
    value: FilterOrderType.COMPLETE
  },
  {
    id: 3,
    label: "Cancelled",
    value: FilterOrderType.CANCEL
  }
];

const SortAndFilter = () => {
  const [searchQuerry, setSearchQuerry] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const handleChangeSort = (value: string) => {
    const queryObj: any = {};
    searchQuerry.forEach((value, key) => {
      queryObj[key] = value;
    });
    queryObj.sort = value;
    queryObj.index = "1";
    setSearchQuerry({
      ...queryObj
    });
  };

  const handleChangeFilter = (e: RadioChangeEvent) => {
    const queryObj: any = {};
    searchQuerry.forEach((value, key) => {
      queryObj[key] = value;
    });
    queryObj.status = e.target.value;
    setSearchQuerry({
      ...queryObj
    });

  };

  const handleClickReset = () => {
    setSearchQuerry({});
  };
  return (
    <Row align="middle" justify="space-between" className="mt-5" gutter={16}>
      <Col xs={24} sm={24} lg={6}>
        <Select
          value={
            searchQuerry.get("sort")
              ? searchQuerry.get("sort")
              : SortOrderType.DEFAULT
          }
          onChange={handleChangeSort}
          style={{ width: "100%" }}
        >
          {listSortOrder.map((item) => (
            <Option key={item.id} label={item.title} value={item.value}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} sm={24} lg={16}>
        <Radio.Group
          value={
            searchQuerry.get("status")
              ? searchQuerry.get("status")
              : FilterOrderType.DEFAULT
          }
          onChange={handleChangeFilter}
        >
          {listFilterOrder.map((item) => (
            <Radio.Button
              key={item.id}
              style={{ marginRight: 8 }}
              value={item.value}
            >
              {item.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Col>
      <Col className="mr-3">
        <Button type="text" className="text-primary" onClick={handleClickReset}>
          Reset
        </Button>
      </Col>
    </Row>
  );
};

export default SortAndFilter;
