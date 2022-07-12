import Select from "antd/lib/select";
import { FC, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

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
const SelectSort: FC<{ pageSize: number }> = ({ pageSize }) => {
  const [searchQuerry, setSearchQuerry] = useSearchParams();

  const hanleClickChooseSelect = useCallback(
    (value: string) => {
      const obj: any = {};
      searchQuerry.forEach((value, key) => {
        obj[key] = value;
      });
      obj.sort = value;
      setSearchQuerry({ ...obj });
    },
    [searchQuerry, setSearchQuerry]
  );
  return (
    <Select
      onChange={hanleClickChooseSelect}
      value={
        searchQuerry.get("sort")
          ? searchQuerry.get("sort")
          : SortProductType.DEFAULT
      }
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
