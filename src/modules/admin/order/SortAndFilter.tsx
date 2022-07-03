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
    value: SortOrderType.LASTEST,
    title: "Lastest"
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
    label: "All",
    value: FilterOrderType.DEFAULT
  },
  {
    label: "Shipping",
    value: FilterOrderType.SHIPPING
  },
  {
    label: "Complete",
    value: FilterOrderType.COMPLETE
  },
  {
    label: "Cancel",
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
  console.log(sortType, filter);
  return (
    <Row align="middle" className="mt-5" gutter={16}>
      <Col span={6}>
        <Select value={sortType} onChange={handleChangeSort} className="w-full">
          {listSortOrder.map((item) => (
            <Option key={item.id} label={item.title} value={item.value}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={6}>
        <Radio.Group
          value={filter}
          options={listFilterOrder}
          onChange={handleChangeFilter}
        />
      </Col>
      <Col>
        <Button onClick={handleClickReset}>Reset</Button>
      </Col>
    </Row>
  );
};

export default SortAndFilter;
