import { Button, Form } from "antd";
import Input from "antd/lib/input";
import SelectCategory from "components/SelectCategory/SelectCategory";

import styles from "./searchBox.module.css";

const SearchBox = () => {
  return (
    <Form labelCol={{ span: 24 }} layout="inline">
      <div className={styles["search-box"]}>
        <div className="w-2/4">
          <Form.Item name="Product Name">
            <Input />
          </Form.Item>
        </div>
        <div className="w-1/4">
          <SelectCategory label={""} selectName={""} />
        </div>
        <div className="w-1/4">
          <Form.Item>
            <Button htmlType="submit">Search</Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default SearchBox;
