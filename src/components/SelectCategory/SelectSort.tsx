import Select from "antd/lib/select";
import { useDispatch } from "react-redux";
import { changeSortType } from "store/product.slice";
import { SortProductType } from "types/product.model";

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
  const dispatch = useDispatch();
  const hanleClickChooseSelect = (value: string) => {
    dispatch(changeSortType(value));
  };
  return (
    <Select
      onChange={hanleClickChooseSelect}
      defaultValue={SortProductType.DEFAULT}
      className="w-full"
    >
      {listSeclect.map((item) => (
        <Option key={item.id} value={item.value} label={item.title}>
          {item.title}
        </Option>
      ))}
    </Select>
  );
};

export default SelectSort;
