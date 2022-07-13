import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fab,
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";
import {
  faMoneyBill1,
  faCartShopping,
  faUser,
  faUtensils,
  faEye
} from "@fortawesome/free-solid-svg-icons";

import Container from "components/Layout/Container";
import "./App.less";

library.add(
  fab,
  faMoneyBill1,
  faCartShopping,
  faUser,
  faUtensils,
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faEye
);
function App() {
  return <Container />;
}
export default App;
