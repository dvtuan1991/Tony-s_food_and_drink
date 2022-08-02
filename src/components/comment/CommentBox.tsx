import { FC, useEffect, useState } from "react";
import Typography from "antd/lib/typography";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Pagination from "antd/lib/pagination";
import { useSelector, useDispatch } from "react-redux";
import Spin from "antd/lib/spin";

import { RootState, AppDispatch } from "store";
import { changePageIndex, getListComment } from "store/comment.slice";
import { PAGE_SIZE, SERVICE_API } from "constants/configs";
import { fetchApi, handleStaticResult } from "helpers/function";
import { IStatisticComment } from "types/statistic.comment.model";
import StatisticComment from "./StatisticComment";
import CommentItem from "./CommentItem";

const { Title } = Typography;
const CommentBox: FC<{ productId: number }> = ({ productId }) => {
  const {
    listComment,
    filterComment,
    sortType,
    isCommentLoading,
    totalLeng,
    pageIndex
  } = useSelector((state: RootState) => state.comments);
  const dispatch = useDispatch<AppDispatch>();
  const [total, setTotal] = useState<number>(0);
  const [listStatistics, setListStatistics] = useState<IStatisticComment[]>();

  const handleChangePagi = (value: number) => {
    dispatch(changePageIndex(value));
  };
  useEffect(() => {
    const url = `${SERVICE_API}/comment/${productId}/product?index=${pageIndex}&limit=${PAGE_SIZE}&point=${filterComment}&sort=${sortType}`;
    dispatch(getListComment(url));
  }, [dispatch, productId, filterComment, pageIndex]);

  useEffect(() => {
    (async () => {
      const getListStatic: {
        leng: number;
        statistic: { ratingPoint: number; total: number }[];
      } = await fetchApi(`${SERVICE_API}/comment/${productId}/product/static`);

      setListStatistics(handleStaticResult(getListStatic));
      setTotal(getListStatic.leng);
    })();
  }, [productId]);
  return (
    <div className="p-5">
      {listStatistics && listComment && (
        <div className="p-5 border">
          <Row>
            <Col span={24}>
              <StatisticComment leng={total} statistics={listStatistics} />
            </Col>

            <Col span={24}>
              <Spin spinning={isCommentLoading}>
                <div>
                  <Title level={3}>Reviews</Title>
                </div>
                {listComment &&
                  listComment.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}
                <Pagination
                  current={pageIndex}
                  showSizeChanger={false}
                  onChange={handleChangePagi}
                  total={totalLeng}
                  pageSize={PAGE_SIZE}
                  hideOnSinglePage
                />
              </Spin>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default CommentBox;
