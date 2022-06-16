
import Container from "components/Layout/Container";
import { library } from '@fortawesome/fontawesome-svg-core'
import  {fab}  from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faHouse } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faCheckSquare, faCoffee, faHouse)

function App() {
  return (
    <>
      <Container />
    </>
  );
}

export default App;
