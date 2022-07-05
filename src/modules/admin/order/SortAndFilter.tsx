import Row from "antd/lib/row";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "store";
import { changeOrderFilter, changeSortType } from "store/order.slice";
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
    label: "Canceled",
    value: FilterOrderType.CANCEL
  }
];

const SortAndFilter = () => {
  const { filter, sortType } = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>();
  const handleChangeSort = (value: string) => {
    dispatch(changeSortType(value));
  };

  const handleChangeFilter = (e: RadioChangeEvent) => {
    dispatch(changeOrderFilter(e.target.value));
  };

  const handleClickReset = () => {
    dispatch(changeSortType(SortOrderType.DEFAULT));
    dispatch(changeOrderFilter(FilterOrderType.DEFAULT));
  };
  return (
    <Row align="middle" justify="space-between" className="mt-5" gutter={16}>
      <Col span={6}>
        <Select value={sortType} onChange={handleChangeSort} className="w-full">
          {listSortOrder.map((item) => (
            <Option key={item.id} label={item.title} value={item.value}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={12}>
        <Radio.Group value={filter} onChange={handleChangeFilter}>
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
        <Button type="default" onClick={handleClickReset}>
          Reset
        </Button>
      </Col>
    </Row>
  );
};

export default SortAndFilter;
