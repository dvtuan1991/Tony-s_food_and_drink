import { FC, useEffect } from "react";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import Rate from "antd/lib/rate";
import Progress from "antd/lib/progress";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import { useDispatch, useSelector } from "react-redux";
import StarTwoTone from "@ant-design/icons/StarTwoTone";

import { AppDispatch, RootState } from "store";
import { IStatisticComment } from "types/statistic.comment.model";
import { getAvgPoint } from "helpers/function";
import { changeFilterComment, changePageIndex } from "store/comment.slice";

interface StatisticCommentProp {
  leng: number;
  statistics: IStatisticComment[];
}

const { Text } = Typography;
const StatisticComment: FC<StatisticCommentProp> = ({ leng, statistics }) => {
  const { filterComment } = useSelector((state: RootState) => state.comments);
  const dispatch = useDispatch<AppDispatch>();
  const handleClickFilter = (e: RadioChangeEvent) => {
    dispatch(changeFilterComment(e.target.value));
    dispatch(changePageIndex(1));
  };
  useEffect(() => {
    dispatch(changeFilterComment(0));
  }, []);
  return (
    <div>
      <div className="mb-5">
        <Radio.Group onChange={handleClickFilter} value={filterComment}>
          <Radio.Button value={0} style={{ marginRight: 4 }}>
            All
          </Radio.Button>
          {statistics.map((item) => (
            <Radio.Button
              style={{ marginRight: 8 }}
              disabled={item.total === 0}
              key={item.ratingPoint}
              value={item.ratingPoint}
            >
              {`${item.ratingPoint} star(${item.total})`}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
      <div>
        <Row align="middle">
          <Col span={2} className="text-right">
            {leng > 0 ? (
              <Text className="text-3xl text-[#009bbe]">
                {getAvgPoint(leng, statistics).toFixed(1)}
              </Text>
            ) : (
              <Text />
            )}
          </Col>
          <Col>
            <Rate value={5} disabled className="mx-3 mb-[5px]" />
          </Col>
          <Col span={"auto"}>
            <Text>{leng} rating</Text>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          {statistics?.map((item) => (
            <Col span={24} key={item.ratingPoint}>
              <Row>
                <Col span={"auto"}>
                  <Text className="flex items-center">
                    {item.ratingPoint}{" "}
                    <StarTwoTone className="ml-1" twoToneColor="#fadb14" />
                  </Text>
                </Col>
                <Col span={18} push={1}>
                  <Progress percent={item.percent} />
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default StatisticComment;
