import { Button, Form } from "antd";
import Input from "antd/lib/input";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";

import SelectCategory from "components/SelectCategory/SelectCategory";
import styles from "./searchBox.module.css";

const SearchBox = () => {
  return (
    <Form labelCol={{ span: 24 }} layout="inline">
      <div className={styles["search-box"]}>
        <div className="w-2/3">
          <Form.Item name="Product Name">
            <Input
              className="rounded text-black"
              placeholder="Enter food name here"
              allowClear
            />
          </Form.Item>
        </div>
        <div className="w-1/3 flex">
          <div className="w-4/5">
            <SelectCategory label={""} selectName={""} />
          </div>
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-[60px] text-white bg-[#ea2251] rounded"
              icon={<ArrowRightOutlined />}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default SearchBox;
