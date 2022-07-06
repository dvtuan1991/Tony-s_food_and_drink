import Button from "antd/lib/button";
import Col from "antd/lib/col";
import Row from "antd/lib/row";

import ProductContainer from "components/Product/ProductContainer";
import SearchBox from "components/SearchBox/SearchBox";
import ProductSlide from "components/Slide/ProductSlide";
import SelectSort from "components/SelectCategory/SelectSort";
import MainHeading from "../../components/Main/MainHeading";


const HomePageContent = () => {
  return (
    <>
      <MainHeading />
      <SearchBox />
      <div className="mt-12">
        <Row gutter={8}>
          <Col span={6}>
            <div >
              <SelectSort />
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
