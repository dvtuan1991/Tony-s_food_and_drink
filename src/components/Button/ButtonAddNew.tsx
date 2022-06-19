import Button from "antd/lib/button";
import { FC } from "react";

const ButtonAddNew: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="py-5">
      <Button onClick={onClick}>Add New</Button>
    </div>
  );
};

export default ButtonAddNew;
