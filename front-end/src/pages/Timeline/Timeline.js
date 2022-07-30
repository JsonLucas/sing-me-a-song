import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";

export default function Timeline() {
  return (
    <Fragment>
      <Header />
      <Menu />
      <Outlet />
    </Fragment>
  );
}
