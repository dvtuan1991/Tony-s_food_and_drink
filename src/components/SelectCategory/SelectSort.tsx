import Select from "antd/lib/select";
import Typography from "antd/lib/typography";
import { SERVICE_API } from "constants/configs";
import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "store";

import { changeSortType, getListProductApp } from "store/product.slice";
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
    [searchQuerry]
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
