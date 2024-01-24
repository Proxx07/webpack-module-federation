import {Link, Outlet} from "react-router-dom";
import {Container} from "@packages/shared/src/components";
import classNames from "./App.module.scss";
export const App = () => {
  return (
    <>
      <h1>Shop module</h1>

      <nav className={classNames.navigation}>
        <Link to={'/shop/categories'}> Categories </Link>
        <Link to={'/shop/product'}> Product </Link>
      </nav>

      <Container>
        <Outlet/>
      </Container>
    </>
  )
};