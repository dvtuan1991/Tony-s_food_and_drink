import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";


import ProductContainer from "components/Product/ProductContainer";
import ProductSlide from "components/Slide/ProductSlide";
import SelectSort from "components/SelectCategory/SelectSort";
import MainHeading from "components/Main/MainHeading";
import SelectFilter from "components/SelectCategory/SelectFilter";

const { Title } = Typography;
const HomePageContent = () => {
  return (
    <>
      <MainHeading />
      <div className="mt-12">
        <Row gutter={16}>
          <Col span={6}>
            <div className="mt-5">
              <Title level={5}>Order: </Title>
              <SelectSort />
            </div>
            <div className="mt-5 pr-1">
              <ProductSlide />
            </div>
            <div className="mt-5 pr-1">
              <Title level={5}>Category: </Title>
              <SelectFilter />
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
