import Col from "antd/lib/col";
import Row from "antd/lib/row";

import { APP_PAGE_SIZE } from "constants/configs";
import ProductContainer from "components/Product/ProductContainer";
import SearchBox from "components/SearchBox/SearchBox";
import ProductSlide from "components/Slide/ProductSlide";
import SelectSort from "components/SelectCategory/SelectSort";
import MainHeading from "components/Main/MainHeading";

const HomePageContent = () => {
  return (
    <>
      <MainHeading />
      <SearchBox />
      <div className="mt-12">
        <Row gutter={8}>
          <Col span={6}>
            <div>
              <SelectSort pageSize={APP_PAGE_SIZE} />
            </div>
            <div className="mt-5 pr-1">
              <ProductSlide />
            </div>
          </Col>
          <Col span={18}>
            <ProductContainer />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePageContent;
