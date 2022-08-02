import { Col, Row, Typography } from "antd";
import { FC } from "react";

import SearchBox from "components/SearchBox/SearchBox";
import Banner from "./Banner";

const { Text } = Typography;
const MainHeading: FC<{scroll: () => void}> = ({scroll}) => {
  return (
    <>
      <Row justify="space-around" align="middle">
        <Col span={12}>
          <p className="text-4xl font-bold">
            Order your <span className="text-[#009bbe]">favorites</span>
          </p>
          <Text>Quick & Delicious</Text>
        </Col>
        <Col span={12}>
          <SearchBox scroll={scroll} />
        </Col>
      </Row>
      <Banner />
    </>
  );
};

export default MainHeading;
