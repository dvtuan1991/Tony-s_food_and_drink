import { useEffect } from "react";
import Select from "antd/lib/select";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { AppDispatch, RootState } from "store";
import { getListCategories } from "store/category.slice";

const { Option } = Select;
const SelectFilter = () => {
  const { categories } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuerry, setSearchQuerry] = useSearchParams();

  const handleChangeSelect = (value: number) => {
    const obj: any = {};
    searchQuerry.forEach((value, key) => {
      obj[key] = value;
    });
    obj.categoryId = value;
    setSearchQuerry({ ...obj });
  };

  useEffect(() => {
    dispatch(getListCategories());
  }, [dispatch, categories.length]);

  return (
    <Select
      style={{ width: "100%" }}
      value={
        searchQuerry.get("categoryId")
          ? Number(searchQuerry.get("categoryId"))
          : -1
      }
      onChange={handleChangeSelect}
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
  );
};

export default SelectFilter;
