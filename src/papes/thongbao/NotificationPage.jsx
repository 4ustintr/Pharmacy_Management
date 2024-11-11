import React from "react";
import Sidebar from "../../components/siderbar/Siderbar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import NotificationTable from "../../components/thongbao/NotificationTable .jsx";
import "./notificationPage.scss";

const NotificationPage = () => {
  return (
    <div className="notificationPage">
      <Sidebar />
      <div className="notificationContainer">
        <Navbar />
        <div className="content">
          <h1 className="pageTitle">Thông báo</h1>
          <NotificationTable />
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
