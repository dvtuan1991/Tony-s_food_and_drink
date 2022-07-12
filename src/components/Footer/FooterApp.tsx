import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import PhoneOutlined from "@ant-design/icons/PhoneOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import banner from "assets/footer-banner.jpg";
import styles from "./footer.module.css";

const { Title, Text } = Typography;
const FooterApp = () => {
  return (
    <div className={styles.footer}>
      <div className={styles["footer-content"]}>
        <Row className={styles.banner}>
          <Col
            xs={0}
            sm={0}
            lg={12}
            style={{
              backgroundImage: `url(${banner})`,
              backgroundSize: "cover",
              backgroundPosition: "50%",
              borderRadius: "18px 0 0 18px"
            }}
          />
          <Col
            xs={24}
            sm={24}
            lg={12}
            className="bg-primary xs:rounded-l-[18px] sm:rounded-l-[18px] lg:rounded-l-[0px]  rounded-r-[18px]"
          >
            <div className={styles.content}>
              <Title level={3}>Call us to make order now</Title>
              <Title level={3} style={{ marginTop: 0 }}>
                +84-932-345-456
              </Title>
            </div>
          </Col>
          <div className={styles["icon-box"]}>
            <div className="p-5 bg-white">
              <PhoneOutlined className="text-[36px] text-primary" />
            </div>
          </div>
        </Row>
        <Row justify="center">
          <Col span={"auto"}>
            <nav className="mt-16">
              <ul className={styles["list-solical"]}>
                <li>
                  <a href={"https://www.facebook.com"}>
                    <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                  </a>
                </li>
                <li>
                  <a href={"https://www.twitter.com/"}>
                    <FontAwesomeIcon icon={["fab", "twitter"]} />
                  </a>
                </li>
                <li>
                  <a href={"https://www.instagram.com/"}>
                    <FontAwesomeIcon icon={["fab", "instagram"]} />
                  </a>
                </li>
                <li>
                  <a href={"https://vn.linkedin.com/"}>
                    <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
                  </a>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={"auto"} className="mt-5 mb-11">
            <Text>© 2022 - Tony's Restaurant. All rights reserved</Text>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FooterApp;
