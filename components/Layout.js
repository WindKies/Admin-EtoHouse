import React from "react";
import Footer from "./Footer";
import MainNav from "./MainNav";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <>
      <MainNav />
      <div className="dashboard">
        <div className="dashboard__leftSide">
          <SideBar />
        </div>
        <div className="dashboard__rightSide">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
