import Col from "antd/lib/col";
import Row from "antd/lib/row";
import CategoryCheckBox from "components/CheckBox/CategoryCheckBox";
import ProductContainer from "components/Product/ProductContainer";

import SearchBox from "components/SearchBox/SearchBox";
import MainHeading from "../components/Main/MainHeading";

const HomePageContent = () => {
  return (
    <>
      <MainHeading />
      <SearchBox />
      <div className="mt-12">
        <Row gutter={8}>
          <Col span={6}>
            <CategoryCheckBox />
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
