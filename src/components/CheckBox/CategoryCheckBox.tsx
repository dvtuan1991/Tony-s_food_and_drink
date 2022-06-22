import Checkbox from "antd/lib/checkbox";
import Typography from "antd/lib/typography";
import Tag from "antd/lib/tag";
import { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";
import { ICategory } from "types/category.model";
import styles from "./checkbox.module.css";

const { CheckableTag } = Tag;
const { Group } = Checkbox;
const { Title } = Typography;

const CategoryCheckBox = () => {
  const [listCategory, setListCategory] = useState<ICategory[]>();
  useEffect(() => {
    (async () => {
      const getListCategory = await fetchApi(`${SERVICE_API}/category`);
      setListCategory(getListCategory);
    })();
  }, []);
  return (
    <div className={styles["checkbox-group"]}>
      <Title level={5}>Categories</Title>
      {listCategory && (
        <div className="flex flex-wrap">
          {listCategory.map((category) => (
            <div key={category.id}>
              <CheckableTag
                className="bg-[#ea2251] text-sm mb-2 py-1 px-2 text-white rounded hover:bg-transparent hover:border-[#ea2251]"
                checked={false}
              >
                {category.name}
              </CheckableTag>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryCheckBox;
