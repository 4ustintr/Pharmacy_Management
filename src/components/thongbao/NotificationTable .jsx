import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./notificationTable.scss";
import Them from "../tableUser/Them.jsx"
import { Link } from "react-router-dom";

const NotificationTable = () => {
  const [medications, setMedications] = useState([]);
  const [expiredMedications, setExpiredMedications] = useState([]);
  const [expiringSoonMedications, setExpiringSoonMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Hàm kiểm tra thuốc hết hạn
  const isExpired = (expDate) => {
    const today = new Date();
    const expiry = new Date(expDate);
    return expiry < today;
  };

  // Hàm kiểm tra thuốc sắp hết hạn (trong vòng 30 ngày)
  const isExpiringSoon = (expDate) => {
    const today = new Date();
    const expiry = new Date(expDate);
    const diffTime = expiry - today;
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays <= 30 && diffDays > 0;
  };
  const handleDelete = (medicineId) => {
    setData(data.filter((item) => item.medicineId !== medicineId));
    setFilteredData(filteredData.filter((item) => item.medicineId !== medicineId));
    toast.success("Đã xóa thuốc thành công!");
  };

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/medicines"); // Thay bằng URL API thực tế
        const fetchedMedications = response.data;

        // Phân loại thuốc hết hạn và sắp hết hạn
        const expired = fetchedMedications.filter((medication) =>
          isExpired(medication.expDate)
        );
        const expiringSoon = fetchedMedications.filter((medication) =>
          isExpiringSoon(medication.expDate)
        );

        // Cập nhật danh sách thuốc
        setMedications(fetchedMedications);
        setExpiredMedications(expired);
        setExpiringSoonMedications(expiringSoon);
        setFilteredMedications([...expired, ...expiringSoon]);

        // Hiển thị thông báo
        if (expired.length > 0) {
          toast.error(`⚠️ Có ${expired.length} thuốc đã hết hạn!`);
        }
        if (expiringSoon.length > 0) {
          toast.warning(`⏳ Có ${expiringSoon.length} thuốc sắp hết hạn!`);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thuốc:", error);
        toast.error("Không thể lấy dữ liệu thuốc từ máy chủ!");
      }
    };
    fetchData();
  }, []);

  // Hàm xử lý bộ lọc
  const handleFilter = () => {
    const filtered = [...expiredMedications, ...expiringSoonMedications].filter(
      (medication) =>
        medication.medicineName.toLowerCase().includes(keyword.toLowerCase()) ||
        medication.medicineType.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredMedications(filtered);
  };

  return (
    <div className="notificationTable">
      {/* Khung hiển thị thông báo */}
      <div className="notificationCard">
        <div className="card expired">
          <h4>Thuốc đã hết hạn</h4>
          <p>{expiredMedications.length}</p>
        </div>
        <div className="card expiringSoon">
          <h4>Thuốc sắp hết hạn</h4>
          <p>{expiringSoonMedications.length}</p>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="filterSection">
        <div className="filterContainer">
          <input
            type="text"
            placeholder="Tìm kiếm thuốc..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={handleFilter}>Lọc</button>
        </div>
      </div>


      {/* Bảng thuốc */}
      <div className="medicationTable">
        <h3>Danh sách thuốc</h3>
        <table>
          <thead>
            <tr>
              <th>TT</th>
              <th>Tên thuốc</th>
              <th>Loại thuốc</th>
              <th>Số lượng</th>
              <th>Hạn sử dụng</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedications.map((medication, index) => (
              <tr
                key={medication.id}
                style={{
                  backgroundColor: isExpired(medication.expDate)
                    ? "red"
                    : "yellow",
                }}
              >
                <td>{index + 1}</td>
                <td>{medication.medicineName}</td>
                <td>{medication.medicineType}</td>
                <td>{medication.quantity}</td>
                <td>{medication.expDate}</td>
                <td>
                  {isExpired(medication.expDate)
                    ? "Hết hạn"
                    : "Sắp hết hạn"}
                </td>
                <td>
                <Link to={`/khothuoc/`}>
                <button className="viewButton">Chi tiết</button>
              </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Them
        patient={selectedPatient}
        onClose={() => setSelectedPatient(null)}
        onDelete={handleDelete}
      />
      </div>
    </div>
  );
};

export default NotificationTable;
