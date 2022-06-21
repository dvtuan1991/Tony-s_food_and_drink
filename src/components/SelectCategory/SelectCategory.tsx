import { FC, useEffect, useState } from "react";
import Select from "antd/lib/select";

import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";
import { ICategory } from "types/category.model";

const { Option } = Select;
const SelectCategory = () => {
  const [listCategory, setListCategory] = useState<ICategory[]>();
  useEffect(() => {
    (async () => {
      const responseListCategory: ICategory[] = await fetchApi(
        `${SERVICE_API}/category`
      );
      setListCategory(responseListCategory);
    })();
  }, []);
  return (
    <Select allowClear >
      {listCategory?.map((category) => (
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

export default SelectCategory;
