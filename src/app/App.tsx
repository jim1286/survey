import { Outlet } from "react-router-dom";
import { Container } from "./styles";

function App() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default App;
