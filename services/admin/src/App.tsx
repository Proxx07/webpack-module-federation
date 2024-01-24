import {Outlet} from "react-router-dom";
import {Container} from "@packages/shared/src/components";
export const App = () => {
  return (
    <>
      <h1>Admin module</h1>
      <Container>
        <Outlet/>
      </Container>
    </>
  )
};