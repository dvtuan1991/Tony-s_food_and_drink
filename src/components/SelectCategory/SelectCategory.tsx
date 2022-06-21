import { FC, useEffect, useState } from "react";
import { Form } from "antd";
import Select from "antd/lib/select";

import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";
import { ICategory } from "types/category.model";
import { Rule } from "antd/lib/form";

interface SelectCategory {
  label: string;
  selectName: string;
  rules?: Rule[];
}

const { Option } = Select;
const SelectCategory: FC<SelectCategory> = ({ label, selectName, rules }) => {
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
    <Form.Item label={label} name={selectName} rules={rules}>
      {listCategory && (
        <Select
          allowClear={true}
          style={{width: "100%"}}
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
    </Form.Item>
  );
};

export default SelectCategory;
