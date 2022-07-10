import { useCallback, useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Pagination from "antd/lib/pagination";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { SERVICE_API, PAGE_SIZE } from "constants/configs";
import SelectSort from "components/SelectCategory/SelectSort";
import ButtonAddNew from "components/Button/ButtonAddNew";
import { AppDispatch, RootState } from "store";
import { getListProductApp } from "store/product.slice";
import ProductTable from "./ProductTable";
import FilterProduct from "./FilterProduct";

const { Text } = Typography;
const ProductAdminLists = () => {
  const [searchQuerry, setSearchQuerry] = useSearchParams();
  const queryObj: any = {};
  const dispatch = useDispatch<AppDispatch>();
  const { productList, totalProduct } = useSelector(
    (state: RootState) => state.products
  );

  const [pageIndex, setPageIndex] = useState<number>(1);
  const navigate = useNavigate();
  const handleClickPagination = (index: number) => {
    setPageIndex(index);
    searchQuerry.forEach((value, key) => {
      queryObj[key] = value;
    });
    queryObj.index = index + "";
    setSearchQuerry(queryObj);
  };

  const getData = useCallback(
    async (index: number) => {
      searchQuerry.forEach((value, key) => {
        queryObj[key] = value;
      });
      const url = `${SERVICE_API}/product/list?${
        queryObj.index ? "" : `index=${index}`
      }
      
      &limit=${PAGE_SIZE}&${new URLSearchParams(queryObj)}`;
      if (queryObj.index) {
        setPageIndex(Number(queryObj.index));
      }
      dispatch(getListProductApp(url));
    },
    [dispatch, pageIndex, searchQuerry]
  );

  const handleClickDelete = async (id: number | string) => {
    const responseDelete = await fetch(`${SERVICE_API}/product/${id}/delete`, {
      method: "DELETE"
    });
    if (responseDelete.ok) {
      getData(pageIndex);
    }
  };

  const handleClickAdd = () => {
    navigate("/admin/product/create");
  };

  useEffect(() => {
    getData(pageIndex);
  }, [getData, pageIndex, searchQuerry]);

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col span={24}>
          <FilterProduct />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <ButtonAddNew onClick={handleClickAdd} />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Row align="middle" gutter={16}>
            <Col>
              <Text>Sort By: </Text>
            </Col>
            <Col className="flex-grow">
              <SelectSort pageSize={PAGE_SIZE} />
            </Col>
          </Row>
        </Col>
      </Row>

      <ProductTable data={productList} handleClickDelete={handleClickDelete} />

      <Pagination
        total={totalProduct}
        pageSize={PAGE_SIZE}
        current={pageIndex}
        showSizeChanger={false}
        onChange={handleClickPagination}
      />
    </>
  );
};

export default ProductAdminLists;
