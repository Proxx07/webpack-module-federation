import classes from "./App.module.scss";
import {Link, Outlet} from "react-router-dom";

export const App = () => {
  return (
    <div className={classes.app}>
      <nav className={classes.navigation}>
        <Link to={'/admin'}> Admin </Link>
        <Link to={'/shop'}> Shop </Link>
      </nav>
      <Outlet/>
    </div>
  )
};