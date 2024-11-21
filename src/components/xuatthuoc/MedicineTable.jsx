import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./styles.scss";

const MedicineTable = () => {
  const [medicines, setMedicines] = useState([]);
  const [latestMedicine, setLatestMedicine] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const medicinesPerPage = 14;

  // Fetch dữ liệu từ API
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/invoice-details")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setMedicines(data);
          setLatestMedicine(data[0]); // Lấy đơn thuốc gần nhất
        } else {
          toast.error("Dữ liệu không hợp lệ!");
        }
      })
      .catch(() => {
        toast.error("Lỗi khi lấy dữ liệu!");
      });
  }, []);

  // Xử lý tìm kiếm
  // Xử lý tìm kiếm
const handleSearch = (e) => {
  setSearchTerm(e.target.value.toLowerCase());
};

const filteredMedicines = medicines.filter((medicine) => {
  const invoiceDetailsId = medicine?.invoiceDetailsId?.toString() || "";
  const patientName = medicine?.patientName?.toLowerCase() || "";
  
  return (
    invoiceDetailsId.includes(searchTerm) || patientName.includes(searchTerm)
  );
});


  // Phân trang
  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const currentMedicines = filteredMedicines.slice(
    indexOfFirstMedicine,
    indexOfLastMedicine
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Xử lý xóa thuốc
  const handleDelete = (invoiceDetailsId) => {
    axios
      .delete(`http://localhost:8080/api/invoice-details/${invoiceDetailsId}`)
      .then(() => {
        setMedicines(medicines.filter((med) => med.invoicedetailsid !== invoiceDetailsId));
        toast.success("Đã xóa đơn thuốc thành công!");
      })
      .catch(() => {
        toast.error("Không thể xóa đơn thuốc. Vui lòng thử lại!");
      });
  };

  return (
    <div className="medicine-container">
      {/* Biểu đồ và đơn thuốc gần nhất */}
      <div className="dashboard">
        {latestMedicine && (
          <div className="latest-medicine">
            <h3>Đơn thuốc gần nhất</h3>
            <div className="medicine-details">
              <p>
                Bệnh nhân: <span>{latestMedicine?.patientName || "Không có tên"}</span>
              </p>
              <p>
                SĐT: <span>{latestMedicine?.patientPhone || "Không có số điện thoại"}</span>
              </p>
              <p>
                Thuốc: <span>{latestMedicine?.medicineName || "Chưa có thuốc"}</span>
              </p>
              <p>
                Số lượng: <span>{latestMedicine?.quanlityDetails || "Chưa có số lượng"}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Thanh tìm kiếm */}
      <div className="actions">
        <input
          type="text"
          placeholder="Tìm theo ID hoặc tên bệnh nhân..."
          onChange={handleSearch}
        />
      </div>

      {/* Bảng danh sách thuốc */}
      <div className="medicine-table">
        <h3>Danh sách xuất thuốc</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Bệnh nhân</th>
              <th>SĐT</th>
              <th>Thuốc</th>
              <th>Loại</th>
              <th>Số lượng</th>
              <th>Ngày</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentMedicines.map((medicine) => (
              <tr key={medicine?.invoiceDetailsId}>
                <td>{medicine?.invoiceDetailsId || "N/A"}</td>
                <td>{medicine?.patientName || "Chưa có tên"}</td>
                <td>{medicine?.patientPhone || "Chưa có số điện thoại"}</td>
                <td>{medicine?.medicineName || "Chưa có thuốc"}</td>
                <td>{medicine?.medicineType || "Chưa có loại thuốc"}</td>
                <td>{medicine?.quantityDetails || "Chưa có số lượng"}</td>
                <td>{medicine?.dateOfTrans || "Chưa có ngày"}</td>
                <td>
                  <button onClick={() => setSelectedMedicine(medicine)}>
                    Thông tin
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      {/* Phân trang */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        <span>
          Trang {currentPage} / {Math.ceil(filteredMedicines.length / medicinesPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredMedicines.length / medicinesPerPage)}
        >
          Sau
        </button>
      </div>


      {/* Modal chi tiết */}
      {selectedMedicine && (
        <div className="modal">
          <div className="modal-content">
            <h2>Thông tin chi tiết</h2>
            <div className="modal-info">
              <p><strong>ID:</strong> {selectedMedicine?.invoiceDetailsId || "N/A"}</p>
              <p><strong>Bệnh nhân:</strong> {selectedMedicine?.patientName || "Chưa có tên"}</p>
              <p><strong>SĐT:</strong> {selectedMedicine?.patientPhone || "Chưa có số điện thoại"}</p>
              <p><strong>Thuốc:</strong> {selectedMedicine?.medicineName || "Chưa có thuốc"}</p>
              <p><strong>Loại:</strong> {selectedMedicine?.medicineType || "Chưa có loại thuốc"}</p>
              <p><strong>Số lượng:</strong> {selectedMedicine?.quantityDetails || "Chưa có số lượng"}</p>
              <p><strong>Ngày giao dịch:</strong> {selectedMedicine?.dateOfTrans || "Chưa có ngày"}</p>
            </div>
            <div className="modal-actions">
              <button
                className="delete-btn"
                onClick={() => handleDelete(selectedMedicine.invoiceDetailsId)}
              >
                Xóa
              </button>
              <button
                className="edit-btn"
                onClick={() => handleEdit(selectedMedicine)}
              >
                Sửa
              </button>
              <button onClick={() => setSelectedMedicine(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MedicineTable;
