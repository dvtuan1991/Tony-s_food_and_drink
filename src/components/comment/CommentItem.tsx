import { FC } from "react";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Space from "antd/lib/space";
import UserOutlined from "@ant-design/icons/UserOutlined";

import { IComment } from "types/comment.model";
import Avatar from "antd/lib/avatar/avatar";
import { SERVICE_API } from "constants/configs";
import Typography from "antd/lib/typography";
import { changeDateOrderOutput } from "helpers/function";
import Rate from "antd/lib/rate";

const { Text } = Typography;
const CommentItem: FC<{ comment: IComment }> = ({ comment }) => {
  return (
    <Row className="pb-5 mb-3 border-b border-b-[#ccc] border-solid" >
      <Col className="pr-5">
        {comment.userAvatar ? (
          <Avatar size={32} src={`${SERVICE_API}/${comment.userAvatar}`} />
        ) : (
          <Avatar size={32} icon={<UserOutlined />} />
        )}
      </Col>
      <Col className="pl-3">
        <Row>
          <Col span={24}>
            <Text className="font-bold">
              {comment.isAnonymous ? "Anonymous" : comment.userName}
            </Text>
          </Col>
          <Col span={24}>
            <Rate allowClear={false} value={comment.rating} disabled />
          </Col>
          <Col span={24}>
            <Text className="text-[#ccc]">
              {changeDateOrderOutput(comment.createAt)}
            </Text>
          </Col>
          <Col>
            <Text>{comment.comment}</Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CommentItem;
