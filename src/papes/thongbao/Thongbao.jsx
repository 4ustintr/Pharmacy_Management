import "./thongbao.scss";
import Siderbar from "../../components/siderbar/Siderbar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Datatable from "../../components/thongbao/NotificationTable .jsx";

const Thongbao = () => {
  return (
    <div className="list">
      {/* Sidebar cố định */}
      <Siderbar />
      
      <div className="listContainer">
        {/* Navbar cố định */}
        <Navbar />
        
        {/* Nội dung chính của trang */}
        <Datatable />
      </div>
    </div>
  );
};

export default Thongbao;
