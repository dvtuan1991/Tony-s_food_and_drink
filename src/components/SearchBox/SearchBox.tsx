import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";

import { ICategory } from "types/category.model";
import { ChangeEvent, useEffect, useState } from "react";
import { SERVICE_API } from "constants/configs";
import {
  changeFilerByName,
  changeFilterCategory,
  changeProductPageSize
} from "store/product.slice";
import { fetchApi } from "helpers/function";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import styles from "./searchBox.module.css";

const { Option } = Select;
const SearchBox = () => {
  const { filterCategory, filterProductName } = useSelector(
    (state: RootState) => state.products
  );
  const [listCategory, setListCategory] = useState<ICategory[]>();
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();
  const handleChangeSelect = (value: number) => {
    setSelectValue(value);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClickSearch = () => {
    if (inputValue.trim() !== "") {
      dispatch(changeFilerByName(inputValue));
      dispatch(changeProductPageSize(1));
    }
    if (selectValue && selectValue >= -1) {
      dispatch(changeFilterCategory(selectValue));
      dispatch(changeProductPageSize(1));
    }
  };
  useEffect(() => {
    (async () => {
      const responseListCategory: ICategory[] = await fetchApi(
        `${SERVICE_API}/category`
      );

      setListCategory([
        { id: -1, name: "All", ordinalNum: -1 },
        ...responseListCategory
      ]);
    })();
  }, []);
  return (
    <div className={styles["search-box"]}>
      <div className="w-2/4">
        <Input
          className="rounded text-black"
          placeholder="Enter food name here"
          value={inputValue}
          onChange={handleChangeInput}
          allowClear
        />
      </div>
      <div className="w-1/3">
        {listCategory && (
          <Select
            allowClear={true}
            style={{ width: "100%" }}
            value={selectValue}
            onChange={handleChangeSelect}
            defaultValue={filterCategory}
          >
            {listCategory.map((category) => (
              <Option
                key={category.id}
                value={category.id}
                label={category.name.toLocaleUpperCase()}
              >
                {category.name}
              </Option>
            ))}
          </Select>
        )}
      </div>
      <div>
        <Button
          onClick={handleClickSearch}
          className="w-[60px] text-white bg-[#009bbe] rounded"
          icon={<ArrowRightOutlined />}
        />
      </div>
    </div>
  );
};

export default SearchBox;
