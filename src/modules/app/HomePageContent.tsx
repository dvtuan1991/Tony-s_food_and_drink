import Col from "antd/lib/col";
import Row from "antd/lib/row";
import CategoryCheckBox from "components/CheckBox/CategoryCheckBox";
import ProductContainer from "components/Product/ProductContainer";

import SearchBox from "components/SearchBox/SearchBox";
import ProductSlide from "components/Slide/ProductSlide";
import MainHeading from "../../components/Main/MainHeading";

const HomePageContent = () => {
  return (
    <>
      <MainHeading />
      <SearchBox />
      <div className="mt-12">
        <Row gutter={8}>
          <Col span={6}>
            <div className="pr-1">
              <CategoryCheckBox />
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
