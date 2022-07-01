import OrderReview from "modules/app/cart/OrderReview";
import ShippingInfo from "modules/app/cart/ShippingInfo";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "store";

const OrderCheckOut = () => {
  const { cartsCheckOut } = useSelector((state: RootState) => state.carts);
  if (cartsCheckOut.length === 0) {
    return <Navigate to={"/cart"} />;
  }
  return (
    <div>
      <OrderReview />
      <ShippingInfo />
    </div>
  );
};

export default OrderCheckOut;
