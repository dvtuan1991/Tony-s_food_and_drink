import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CloseOutlined from "@ant-design/icons/CloseOutlined";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import Pagination, { PaginationProps } from "antd/lib/pagination";
import Tag from "antd/lib/tag";
import Typography from "antd/lib/typography";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import RightOutlined from "@ant-design/icons/RightOutlined";

import { RootState } from "store";
import { getListProductApp } from "store/product.slice";
import { APP_PAGE_SIZE, SERVICE_API } from "constants/configs";
import ProductItem from "./ProductItem";

const itemRender: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement
) => {
  if (type === "prev") {
    return (
      <a href="#product" className="scroll-smooth ant-pagination-item-link ">
        <LeftOutlined />
      </a>
    );
  }
  if (type === "next") {
    return (
      <a href="#product" className="scroll-smooth ant-pagination-item-link ">
        <RightOutlined />
      </a>
    );
  }
  return originalElement;
};
const { Title, Text } = Typography;
const ProductContainer = () => {
  const ref = useRef<any>(null);
  const [searchQuerry, setSearchQuerry] = useSearchParams();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const { productList, totalProduct, isProductLoading } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch: Dispatch<any> = useDispatch();
  const executeScroll = () => {
    ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleClickPagi = (index: number) => {
    executeScroll();
    setPageIndex(index);
    const queryObj: any = {};
    searchQuerry.forEach((value, key) => {
      queryObj[key] = value;
    });
    queryObj.index = index + "";
    setSearchQuerry(queryObj);
  };

  const handleClickRemoveSearchName = () => {
    const queryObj: any = {};
    searchQuerry.forEach((value, key) => {
      queryObj[key] = value;
    });
    delete queryObj.name;
    setSearchQuerry(queryObj);
  };

  const getData = useCallback(
    async (index: number) => {
      const queryObj: any = {};
      searchQuerry.forEach((value, key) => {
        queryObj[key] = value;
      });
      const url = `${SERVICE_API}/product/list?${
        queryObj.index ? "" : `index=${index}`
      }
      &limit=${APP_PAGE_SIZE}&${new URLSearchParams(queryObj)}`;
      if (queryObj.index) {
        setPageIndex(Number(queryObj.index));
      }
      dispatch(getListProductApp(url));
    },
    [dispatch, pageIndex, searchQuerry]
  );

  const handleClickReturn = () => {
    setSearchQuerry({});
  };
  useEffect(() => {
    getData(pageIndex);
  }, [getData, pageIndex, searchQuerry]);

  return (
    <div id="product" className="flex flex-col min-h-[600px]" ref={ref}>
      <div className="px-5 mb-5">
        {searchQuerry.get("name") && searchQuerry.get("name") !== "" && (
          <Row align="middle" gutter={16}>
            <Col span={"auto"}>
              <Title level={4}>Search By Product Name:</Title>
            </Col>
            <Col span="auto">
              <Tag
                color="blue"
                closable
                className="text-base"
                onClose={handleClickRemoveSearchName}
                closeIcon={<CloseOutlined className="inline-flex ml-3" />}
              >
                {searchQuerry.get("name")}
              </Tag>
            </Col>
          </Row>
        )}
      </div>
      <div>
        <Spin spinning={isProductLoading}>
          <Row gutter={16}>
            {productList.length > 0 && (
              <>
                {productList.map((product) => (
                  <ProductItem product={product} key={product.id} />
                ))}
                <Col span={24} className="mt-5">
                  <div className="mb-5" onClick={executeScroll}>
                    <Pagination
                      current={pageIndex}
                      showSizeChanger={false}
                      pageSize={APP_PAGE_SIZE}
                      total={totalProduct}
                      onChange={handleClickPagi}
                      itemRender={itemRender}
                    />
                  </div>
                </Col>
              </>
            )}
          </Row>
        </Spin>
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
