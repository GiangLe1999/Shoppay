import React from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

import styled from "./styles.module.scss";

const AdminLayout = ({ children }) => {
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const showSidebar = expandSidebar.expandSidebar;

  return (
    <div className={styled.layout}>
      <Sidebar />
      <div
        //Khi Side bar được expanded, main cách lề trai 1 khoảng bằng width của expanded sidebar
        //Khi Side bar được minimize, main cách lề trai 1 khoảng bằng width của minimized sidebar
        style={{ marginLeft: showSidebar ? "260px" : "100px" }}
        className={styled.layout__main}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
