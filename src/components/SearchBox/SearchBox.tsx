import Input from "antd/lib/input";
import Button from "antd/lib/button";
import { useSearchParams } from "react-router-dom";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import { ChangeEvent, useState, FC } from "react";

const SearchBox: FC<{ scroll: () => void }> = ({ scroll }) => {
  const [searchQuerry, setSearchQuerry] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>("");
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClickSearch = () => {
    setSearchQuerry({ name: inputValue.toLowerCase() });
    setInputValue("");
  };

  return (
    <div className="flex">
      <div className="flex-grow-[2]">
        <Input
          className=" text-black"
          placeholder="Enter food name here"
          value={inputValue}
          onChange={handleChangeInput}
          allowClear
        />
      </div>
      <div onClick={scroll}>
        <Button
          onClick={handleClickSearch}
          className="w-[60px] text-white bg-[#009bbe]  active:bg-primary focus:bg-primary focus:text-white"
          icon={<SearchOutlined />}
        />
      </div>
    </div>
  );
};

export default SearchBox;
