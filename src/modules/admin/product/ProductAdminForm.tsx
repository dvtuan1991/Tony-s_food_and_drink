import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Col from "antd/lib/col";
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Input from "antd/lib/input/Input";
import Select from "antd/lib/select";
import TextArea from "antd/lib/input/TextArea";
import Radio from "antd/lib/radio";
import InputNumber from "antd/lib/input-number";
import _ from "lodash";
import Button from "antd/lib/button";
import { useNavigate } from "react-router-dom";
import { Space } from "antd";

import { IProduct } from "types/product.model";
import { ICategory } from "types/category.model";
import { fetchApi, openNotification } from "helpers/function";
import { SERVICE_API } from "constants/configs";
import styles from "./product.module.css";
import { defaultValidateMessages } from "helpers/common";

interface FormProduct {
  name: string;
  decription: string;
  categoryId?: number;
  newPrice: number;
  oldPrice?: number;
  isStock: string;
  priority: number;
  file?: File;
}

const { Option } = Select;
const ProductAdminForm: FC<{ product?: IProduct; isCreate?: boolean }> = ({
  product,
  isCreate,
}) => {
  const inputUploadRef = useRef<any>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [listCategory, setListCategory] = useState<ICategory[]>();
  const [file, setFile] = useState<File>();

  const handleClickImage = () => {
    inputUploadRef.current && inputUploadRef.current.click();
  };

  const handleClickCancel = () => {
    form.setFieldsValue(initFormValue);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files) {
      const isImageType =
        files[0].type === "image/jpeg" ||
        files[0].type === "image/jpg" ||
        files[0].type === "image/png";
      if (isImageType) {
        console.log(files[0]);
        setFile(files[0]);
      }
    } else {
      setFile(undefined);
    }
  };

  const initFormValue = useMemo(() => {
    if (isCreate) {
      return {
        name: "",
        decription: "",
        categoryId: null,
        newPrice: 1,
        oldPrice: 1,
        isStock: "yes",
        priority: 0,
      };
    }
    if (product) {
      return {
        name: product.name,
        decription: product.decription,
        categoryId: product.categoryId,
        newPrice: product.newPrice,
        oldPrice: product.oldPrice,
        isStock: product.isStock ? "yes" : "no",
        priority: product.priority,
      };
    }
  }, [product, isCreate]);

  const handleClickSubmitForm = async (value: FormProduct) => {
    const formData = new FormData();
    if (isCreate && !file) {
      openNotification("error", "Image required");
    }
    if (isCreate && file) {
      formData.append("name", value.name);
      formData.append("newPrice", value.newPrice + "");
      value.oldPrice && formData.append("oldPrice", value.oldPrice + "");
      formData.append("categoryId", value.categoryId + "");
      formData.append("decription", value.decription);
      formData.append("priority", value.priority + "");
      formData.append("isStock", value.isStock === "yes" ? "true" : "false");
      formData.append("file", file);
      const res = await fetch(`${SERVICE_API}/product`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        openNotification("success", "Create product succes");
        navigate("/admin/product");
      }
    }
    if (!isCreate && product) {
      if (file || !_.isEqual(value, initFormValue)) {
        formData.append("name", value.name);
        formData.append("newPrice", value.newPrice + "");
        value.oldPrice && formData.append("oldPrice", value.oldPrice + "");
        formData.append("categoryId", value.categoryId + "");
        formData.append("decription", value.decription);
        formData.append("priority", value.priority + "");
        formData.append("isStock", value.isStock === "yes" ? "true" : "false");
        file && formData.append("file", file);
        const res = await fetch(`${SERVICE_API}/product/${product.id}`, {
          method: "PUT",
          body: formData,
        });
        if (res.ok) {
          openNotification("success", "Update product success");
          navigate("/admin/product");
        }
      } else {
        navigate("/admin/product");
      }
    }
  };

  const getCategoryData = useCallback(async () => {
    const responseListCategory: ICategory[] = await fetchApi(
      `${SERVICE_API}/category`
    );
    setListCategory(responseListCategory);
  }, []);

  useEffect(() => {
    getCategoryData();
  }, [getCategoryData]);

  return (
    <>
      {initFormValue && (
        <Form
          labelCol={{ span: "auto" }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          validateMessages={defaultValidateMessages}
          initialValues={initFormValue}
          form={form}
          onFinish={handleClickSubmitForm}
        >
          <div className="p-5">
            <Row justify="center">
              <Col span={20}>
                <Row justify="center" gutter={16}>
                  <Col span={8}>
                    <div
                      className={styles["image-box"]}
                      onClick={handleClickImage}
                    >
                      {isCreate ? (
                        file ? (
                          <img src={URL.createObjectURL(file)} alt="product" />
                        ) : (
                          <></>
                        )
                      ) : (
                        <img
                          src={
                            file
                              ? URL.createObjectURL(file)
                              : `${SERVICE_API}/${product?.thumbnail}`
                          }
                          alt="product"
                          className="w-full block h-[170px]"
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      hidden
                      ref={inputUploadRef}
                      onChange={handleFileChange}
                    />
                  </Col>
                  <Col span={12}>
                    <div className={`${styles["input-box"]} mb-4`}>
                      <Form.Item
                        name="name"
                        label="Food Name"
                        rules={[{ required: true, max: 50 }]}
                      >
                        <Input placeholder="Food Name" />
                      </Form.Item>
                      {listCategory && (
                        <Form.Item
                          name="categoryId"
                          label="Category Name"
                          rules={[{ required: true }]}
                        >
                          <Select allowClear={true}>
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
                        </Form.Item>
                      )}
                      <Form.Item name="priority" label="Priority">
                        <Input />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className={styles["input-box"]}>
                      <Form.Item
                        name="newPrice"
                        label="New Price"
                        rules={[
                          { required: true, min: 1, max: 100, type: "number" },
                        ]}
                      >
                        <InputNumber addonAfter="$" min={1} max={100} />
                      </Form.Item>
                      <Form.Item
                        name="oldPrice"
                        label="Old Price"
                        rules={[{ min: 1, max: 100, type: "number" }]}
                      >
                        <InputNumber addonAfter="$" min={1} max={100} />
                      </Form.Item>
                      <Form.Item
                        name="isStock"
                        label="Is Stock"
                        className="mb-3"
                      >
                        <Radio.Group options={["yes", "no"]} />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={14}>
                    <div className={styles["input-box"]}>
                      <Form.Item
                        name="decription"
                        label="Decription"
                        rules={[{ required: true }]}
                      >
                        <TextArea rows={6} />
                      </Form.Item>
                    </div>
                    <Form.Item
                      wrapperCol={{ offset: 8, span: 16 }}
                      className="mt-5"
                    >
                      <Space>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="text-black"
                        >
                          Save
                        </Button>
                        <Button
                          className="text-orange-900"
                          danger
                          onClick={handleClickCancel}
                        >
                          Cancel
                        </Button>
                      </Space>
                    </Form.Item>
                  </Col>
                  <Col span={10}></Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </>
  );
};

export default ProductAdminForm;
