import React from "react";
import Header from "./Header";
import LwsSnackbar from "./LwsSnackbar";
const Layout = ({ children }) => {
  return (
    <>
      <Header />

      {children}
      <LwsSnackbar />
    </>
  );
};

export default Layout;
