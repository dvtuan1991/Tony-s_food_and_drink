import Input from "antd/lib/input";
import SelectCategory from "components/SelectCategory/SelectCategory";

import styles from "./searchBox.module.css";

const SearchBox = () => {
  return (
    <div className={styles["search-box"]}>
      <div>
        <Input />
      </div>
      <div>
        <SelectCategory />
      </div>
    </div>
  );
};

export default SearchBox;
