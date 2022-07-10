import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import Slider from "antd/lib/slider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "store";
import { getListCategories } from "store/category.slice";

const { Option } = Select;
const FilterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.categories);
  const handleFinish = (value: any) => {
    console.log(value);
  };

  useEffect(() => {
    dispatch(getListCategories());
  }, [dispatch, categories.length]);
  return (
    <div>
      <Form name="filterAdmin" method="get" onFinish={handleFinish}>
        <Form.Item name="productName">
          <Input />
        </Form.Item>
        <Form.Item name="price">
          <Slider
            range
            // value={[min, max]}

            // defaultValue={[
            //   searchQuerry.get("min") ? Number(searchQuerry.get("min")) : min,
            //   searchQuerry.get("max") ? Number(searchQuerry.get("max")) : max
            // ]}
            trackStyle={[{ backgroundColor: "#009bbe" }]}
            handleStyle={[
              { backgroundColor: "#009bbe", borderColor: "#009bbe" },
              { backgroundColor: "#009bbe", borderColor: "#009bbe" }
            ]}
            min={1}
            max={100}
            step={1}
            // tipFormatter={renderFormat}
          />
        </Form.Item>
        <Form.Item name="categoryId">
          <Select style={{ width: "100%" }}>
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
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Filter</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FilterForm;
