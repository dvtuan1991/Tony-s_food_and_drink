import Select from "antd/lib/select";
import Typography from "antd/lib/typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

import { changeSortType } from "store/product.slice";
import { SortProductType } from "types/product.model";

const { Title } = Typography;
const listSeclect = [
  {
    id: 0,
    value: SortProductType.DEFAULT,
    title: "Default"
  },
  {
    id: 1,
    value: SortProductType.ASCENT,
    title: "Price: Low to Hight"
  },
  {
    id: 2,
    value: SortProductType.DECENT,
    title: "Price: Hight to Low"
  }
];
const { Option } = Select;
const SelectSort = () => {
  const { sortType } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  const hanleClickChooseSelect = (value: string) => {
    dispatch(changeSortType(value));
  };
  return (
    <div>
      <div>
        <Title level={5}>Sort by:</Title>
      </div>
      <Select
        onChange={hanleClickChooseSelect}
        value={sortType}
        className="w-full"
      >
        {listSeclect.map((item) => (
          <Option key={item.id} value={item.value} label={item.title}>
            {item.title}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectSort;
