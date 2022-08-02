import OrderReview from "modules/app/cart/OrderReview";
import ShippingInfo from "modules/app/cart/ShippingInfo";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PATH_APP_ORDER } from "routes/routes.paths";

import { RootState } from "store";

const OrderCheckOut = () => {
  const { cartsCheckOut } = useSelector((state: RootState) => state.carts);
  if (cartsCheckOut.length === 0) {
    return <Navigate to={PATH_APP_ORDER} />;
  }
  return (
    <div>
      <OrderReview />
      <ShippingInfo />
    </div>
  );
};

export default OrderCheckOut;
