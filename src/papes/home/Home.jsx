import React, { useState, useEffect } from "react";
import Sidebar from "../../components/siderbar/Siderbar.jsx";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import "./home.scss";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000); // Giả lập thời gian loading 2.5 giây
  }, []);

  return (
    <div className="home">
      {loading ? (
        <div className="loadingContainer">
          <div className="pill">
            <div className="side"></div>
            <div className="side"></div>
          </div>
          <div className="loadingMessage">Xin đợi trong giây lát...</div>
          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      ) : (
        <>
          <Sidebar />
          <div className="homeContainer">
            <Navbar />
            <div className="widgets">
              <Widget type="user" />
              <Widget type="order" />
              <Widget type="earning" />
              <Widget type="balance" />
            </div>
            <div className="charts">
              <Featured />
              <Chart title="Doanh thu 6 tháng qua" aspect={2 / 1} />
            </div>
            <div className="listContainer">
              <div className="listTitle">Latest Transactions</div>
              <Table />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
