import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CloseOutlined from "@ant-design/icons/CloseOutlined";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import Pagination from "antd/lib/pagination";
import Typography from "antd/lib/typography";
import Button from "antd/lib/button";

import { RootState } from "store";
import {
  getListProductApp,
  changeProductPageSize,
  changeFilerByName,
  resetFilter
} from "store/product.slice";
import { APP_PAGE_SIZE, SERVICE_API } from "constants/configs";
import ProductItem from "./ProductItem";

const { Title, Text } = Typography;
const ProductContainer = () => {
  const {
    productList,
    sortType,
    minPrice,
    maxPrice,
    totalProduct,
    filterCategory,
    filterProductName,
    productpageSize
  } = useSelector((state: RootState) => state.products);
  const dispatch: Dispatch<any> = useDispatch();

  const handleClickPagi = (index: number) => {
    dispatch(changeProductPageSize(index));
  };

  const handleClickRemoveSearchName = () => {
    dispatch(changeFilerByName(""));
  };

  const handleClickReturn = () => {
    dispatch(resetFilter());
  };
  useEffect(() => {
    const url = `${SERVICE_API}/product/list?index=${productpageSize}&limit=${APP_PAGE_SIZE}&sort=${sortType}&min=${minPrice}&max=${maxPrice}&name=${filterProductName}&categoryId=${filterCategory}`;
    dispatch(getListProductApp(url));
  }, [
    sortType,
    dispatch,
    minPrice,
    maxPrice,
    filterCategory,
    productpageSize,
    filterProductName
  ]);
  return (
    <div className="flex flex-col">
      <div className="px-5">
        {filterProductName !== "" && (
          <Row align="middle">
            <Col span={24}>
              <Title level={4}>Search By Product Name:</Title>
            </Col>
            <Col span="auto">
              <Text className="text-lg text-primary">
                {filterProductName}
              </Text>
            </Col>
            <Col span="auto">
              <Button
                type="text"
                icon={<CloseOutlined />}
                className="ml-8 hover:bg-white"
                onClick={handleClickRemoveSearchName}
                danger
              />
            </Col>
          </Row>
        )}
      </div>
      <div >
        <Row gutter={16}>
          {productList.length > 0 && (
            <>
              {productList.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
              <Col span={24} className="mt-5">
                <div className="mb-5">
                  <Pagination
                    current={productpageSize}
                    showSizeChanger={false}
                    pageSize={APP_PAGE_SIZE}
                    total={totalProduct}
                    onChange={handleClickPagi}
                  />
                </div>
              </Col>
            </>
          )}
        </Row>
        {productList.length === 0 && (
         <Row gutter={16}>
            <Col span={24}>
              <div className="p-5 border border-solid border-t-4 border-t-[#009bbe] rounded-t">
                <Text className="capitalize">No ReSult Match</Text>
              </div>
            </Col>
            <Col>
              <Button
                className="mt-5 bg-[#009bbe] rounded-[5px]"
                type="primary"
                size="large"
                onClick={handleClickReturn}
              >
                Reset filter
              </Button>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default ProductContainer;
