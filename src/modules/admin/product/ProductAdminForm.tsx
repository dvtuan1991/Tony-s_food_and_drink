import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Col from "antd/lib/col";
import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from "react";
import Input from "antd/lib/input/Input";
import Select from "antd/lib/select";
import TextArea from "antd/lib/input/TextArea";
import Radio from "antd/lib/radio";
import InputNumber from "antd/lib/input-number";
import _ from "lodash";
import Button from "antd/lib/button";
import { useNavigate } from "react-router-dom";
import Space from "antd/lib/space";
import Switch from "antd/lib/switch";
import Typography from "antd/lib/typography";
import UploadOutlined from "@ant-design/icons/UploadOutlined";

import { IProduct } from "types/product.model";
import { fetchApi, openNotification } from "helpers/function";
import { ICategory } from "types/category.model";
import { SERVICE_API } from "constants/configs";
import { defaultValidateMessages } from "helpers/common";
import styles from "./product.module.css";

interface FormProduct {
  name: string;
  decription: string;
  categoryId: number;
  newPrice: number;
  oldPrice?: number;
  isStock: string;
  priority: number;
  file?: File;
}

const { Text } = Typography;
const { Option } = Select;
const ProductAdminForm: FC<{ product?: IProduct; isCreate?: boolean }> = ({
  product,
  isCreate
}) => {
  const [listCategory, setListCategory] = useState<ICategory[]>();
  const inputUploadRef = useRef<any>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();

  const handleClickImage = () => {
    inputUploadRef.current && inputUploadRef.current.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files) {
      const isImageType =
        files[0].type === "image/jpeg" ||
        files[0].type === "image/jpg" ||
        files[0].type === "image/png";
      if (isImageType) {
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
        isStock: true,
        priority: 0
      };
    }
    if (product) {
      return {
        name: product.name,
        decription: product.decription,
        categoryId: product.categoryId,
        newPrice: product.newPrice,
        oldPrice: product.oldPrice,
        isStock: product.isStock,
        priority: product.priority
      };
    }
  }, [product, isCreate]);

  const handleClickCancel = () => {
    form.setFieldsValue(initFormValue);
    setFile(undefined);
  };

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
        body: formData
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
          body: formData
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
  useEffect(() => {
    (async () => {
      const responseListCategory: ICategory[] = await fetchApi(
        `${SERVICE_API}/category`
      );
      setListCategory(responseListCategory);
    })();
  }, []);
  return (
    <div className="mt-5">
      {initFormValue && listCategory && (
        <Form
          labelCol={{ span: "auto" }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          validateMessages={defaultValidateMessages}
          initialValues={initFormValue}
          form={form}
          
          onFinish={handleClickSubmitForm}
        >
          <Row gutter={16}>
            <Col sm={24} xs={24} lg={12}>
              <div className={`${styles.panel} p-5`}>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="name"
                      label="Food Name"
                      rules={[{ required: true, max: 50 }]}
                    >
                      <Input placeholder="Food Name" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={"Category Name"}
                      name="categoryId"
                      rules={[{ required: true }]}
                    >
                      <Select allowClear={true} style={{ width: "100%" }}>
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
                  </Col>
                  <Col span={24}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="newPrice"
                          label="New Price"
                          rules={[
                            { required: true, min: 1, max: 100, type: "number" }
                          ]}
                        >
                          <InputNumber
                            addonAfter="$"
                            min={1}
                            max={100}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="oldPrice"
                          label="Old Price"
                          rules={[{ min: 1, max: 100, type: "number" }]}
                        >
                          <InputNumber
                            addonAfter="$"
                            min={1}
                            max={100}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="decription"
                      label="Decription"
                      rules={[{ required: true }]}
                    >
                      <TextArea rows={6} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col sm={24} xs={24} lg={12}>
              <div className={`${styles.panel}`}>
                <Row>
                  <Col span={24}>
                    <div
                      className={styles["image-box"]}
                      onClick={handleClickImage}
                    >
                      {isCreate ? (
                        file ? (
                          <img src={URL.createObjectURL(file)} alt="product" />
                        ) : (
                          <div className="p-5 w-full min-h-[350px] relative">
                            <div className={styles["upload-box"]}>
                              <div className={styles["upload-box-label"]}>
                                <Text>Upload Image ...</Text>
                              </div>
                              <div className={styles["upload-box-icon"]}>
                                <UploadOutlined />
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <img
                          src={
                            file
                              ? URL.createObjectURL(file)
                              : `${SERVICE_API}/${product?.thumbnail}`
                          }
                          alt="product"
                          className="w-full "
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

                  <Col span={24}>
                    <Row
                      justify="space-between"
                      className="p-5 border-b border-b-[#ccc]"
                    >
                      <Col>
                        <Text>Stock</Text>
                      </Col>
                      <Col>
                        <Form.Item name="isStock" style={{ marginBottom: 0 }}>
                          <Switch defaultChecked={initFormValue.isStock} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row justify="space-between" className="p-5">
                      <Col span={4}>
                        <Button type="primary" htmlType="submit" block>
                          Save
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button
                          className="text-orange-900"
                          danger
                          block
                          onClick={handleClickCancel}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <div className="p-5 hidden">
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
                          <div />
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
                      <Form.Item
                        label={"Category Name"}
                        name="categoryId"
                        rules={[{ required: true }]}
                      >
                        <Select allowClear={true} style={{ width: "100%" }}>
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
                          { required: true, min: 1, max: 100, type: "number" }
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
                        <Button type="primary" htmlType="submit">
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
                </Row>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </div>
  );
};

ProductAdminForm.defaultProps = {
  product: {} as IProduct,
  isCreate: false
};

export default ProductAdminForm;
