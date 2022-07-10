import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import { useSearchParams } from "react-router-dom";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";

import { ICategory } from "types/category.model";
import { ChangeEvent, useEffect, useState } from "react";
import { SERVICE_API } from "constants/configs";
import {
  changeFilerByName,
  changeFilterCategory,
  changeProductPageSize
} from "store/product.slice";
import { getListCategories } from "store/category.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import styles from "./searchBox.module.css";

const { Option } = Select;
const SearchBox = () => {
  const { categories } = useSelector((state: RootState) => state.categories);
  const [searchQuerry, setSearchQuerry] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<number>(-1);
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeSelect = (value: number) => {
    setSelectValue(value);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClickSearch = () => {
    const queryObj: any = {};
    searchQuerry.forEach((value, key) => {
      queryObj[key] = value;
    });
    inputValue.trim() !== ""
      ? (queryObj.name = inputValue)
      : delete queryObj.name;
    queryObj.categoryId = selectValue + "";
    queryObj.index = "1";
    setSearchQuerry(queryObj);
    setInputValue("");
  };
  useEffect(() => {
    dispatch(getListCategories());
  }, [dispatch, categories.length]);

  useEffect(() => {
    setSelectValue(
      searchQuerry.get("categoryId")
        ? Number(searchQuerry.get("categoryId"))
        : -1
    );
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
        <Select
          style={{ width: "100%" }}
          value={selectValue}
          onChange={handleChangeSelect}
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
      </div>
      <div>
        <Button
          onClick={handleClickSearch}
          className="w-[60px] text-white bg-[#009bbe] rounded active:bg-primary focus:bg-primary focus:text-white"
          icon={<ArrowRightOutlined />}
        />
      </div>
    </div>
  );
};

export default SearchBox;
