import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {faMoneyBill1} from "@fortawesome/free-solid-svg-icons";

import Container from "components/Layout/Container";
import "./App.less";


library.add(fab, faMoneyBill1);
function App() {
  return <Container />;
}
export default App;
