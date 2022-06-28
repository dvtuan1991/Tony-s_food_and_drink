import OrderReview from "modules/app/cart/OrderReview";
import ShippingInfo from "modules/app/cart/ShippingInfo";

const OrderCheckOut = () => {
  return (
    <div>
      <OrderReview />
      <ShippingInfo />
    </div>
  );
};

export default OrderCheckOut;
