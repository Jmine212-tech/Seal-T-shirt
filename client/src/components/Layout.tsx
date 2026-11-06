import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Cart from "./Cart";

interface Props {}

function Layout(props: Props) {
  const {} = props;

  const [opCart, setOpCart] = useState(false)

  return (
    <div>
      <Outlet context={{opCart, setOpCart}} />

      <Cart props={{opCart, setOpCart}} />
    </div>
  );
}

export default Layout;
