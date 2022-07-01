import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";
import { FC, useCallback, useEffect, useState } from "react";
import { IComment } from "types/comment.model";

const CommentBox: FC<{ productId: number }> = ({ productId }) => {
  const [listComment, setListComment] = useState<IComment[]>();

  const getData = useCallback(async () => {
    const getListComment = await fetchApi(
      `${SERVICE_API}/comment/${productId}/product`
    );
    setListComment(getListComment);
  }, [productId]);

  useEffect(() => {
    getData();
  }, [getData]);
  return <div className="p-5">
    <div />
  </div>;
};

export default CommentBox;
