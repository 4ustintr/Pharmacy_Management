import "./tableUser.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Them from "./Them.jsx";
import * as XLSX from "xlsx";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend,BarElement } from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);
import { Line } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TableUser = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filters, setFilters] = useState({ medicineId: "", medicineName: "" });
  const [error, setError] = useState(null);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(14);

  // Thống kê tổng quan
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalTypes, setTotalTypes] = useState(0);
  const [maxStock, setMaxStock] = useState(0);
  const [minStock, setMinStock] = useState(0);
  const imageList = [
    "public/avatar.jpg",
    "public/avatar.jpg",
  
  ];

  // Gọi API để lấy dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/medicines");
        setData(response.data);
        setFilteredData(response.data);
        // Cập nhật thống kê tổng quan
        const totalQuantity = response.data.reduce((sum, item) => sum + item.quantity, 0);
        const uniqueTypes = new Set(response.data.map((item) => item.medicineName)).size;
        const maxQuantity = Math.max(...response.data.map((item) => item.quantity));
        const minQuantity = Math.min(...response.data.map((item) => item.quantity));

        setTotalProducts(totalQuantity);
        setTotalTypes(uniqueTypes);
        setMaxStock(maxQuantity);
        setMinStock(minQuantity);
      } catch (error) {
        console.error("Chi tiết lỗi:", error);
        setError("Không thể tải dữ liệu từ API. Vui lòng kiểm tra lại.");
        toast.error("Không thể tải dữ liệu từ API.");
      }
    };
    fetchData();
  }, []);

  const handleDelete = (medicineId) => {
    setData(data.filter((item) => item.medicineId !== medicineId));
    setFilteredData(filteredData.filter((item) => item.medicineId !== medicineId));
    toast.success("Đã xóa thuốc thành công!");
  };
  

  const handleFilterChange = (e, field) => {
    const { value } = e.target;
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);

    if (value === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        (item.medicineId &&
          item.medicineId.toString().toLowerCase().includes(value.toLowerCase())) ||
        (item.medicineName &&
          item.medicineName.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  };

  const handleCheckboxChange = (medicineId) => {
    if (selectedPatients.includes(medicineId)) {
      setSelectedPatients(selectedPatients.filter((id) => id !== medicineId));
    } else {
      setSelectedPatients([...selectedPatients, medicineId]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportToExcel = () => {
    const selectedRows = filteredData.filter((row) =>
      selectedPatients.includes(row.medicineId)
    );
    const ws = XLSX.utils.json_to_sheet(selectedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Medicines");
    XLSX.writeFile(wb, "selected_medicines.xlsx");
  };

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredData.slice(indexOfFirstPatient, indexOfLastPatient);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / patientsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Biểu đồ thống kê
  const chartData = {
    labels: filteredData.map((item) => item.medicineName), // Xác định các nhãn trục X (Tên thuốc)
    datasets: [
      {
        label: "Số lượng thuốc", // Đặt tên cho dòng
        data: filteredData.map((item) => item.quantity), // Dữ liệu cho trục Y (Số lượng thuốc)
        fill: false, // Không tô màu dưới đường
        borderColor: "rgba(75,192,192,1)", // Màu đường
        tension: 0.1, // Làm mượt đường biểu đồ (tăng giá trị để tạo độ cong)
        pointRadius: 5, // Tăng kích thước các điểm trên đường
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Tên thuốc",
        },
      },
      y: {
        title: {
          display: true,
          text: "Số lượng",
        },
      },
    },
  };
  
  

  return (
    <div className="datatable">
      <h2>Tủ thuốc</h2>
      <div className="dashboard">
        {/* Biểu đồ thống kê */}
        <div className="chartSection">
          <h3>Biểu đồ thống kê số lượng thuốc</h3>
          <Line data={chartData} options={{ responsive: true }} />
        </div>
        {/* Phần Tổng quan */}
        <div className="summarySection">
          <div className="summaryItem">
            <div className="icon">📦</div>
            <strong>Tổng số sản phẩm:</strong>
            <span>{totalProducts}</span>
          </div>
          <div className="summaryItem">
            <div className="icon">💊</div>
            <strong>Tổng số loại thuốc:</strong>
            <span>{totalTypes}</span>
          </div>
          <div className="summaryItem">
            <div className="icon">⬆️</div>
            <strong>Thuốc tồn kho lớn nhất:</strong>
            <span>{maxStock}</span>
          </div>
          <div className="summaryItem">
            <div className="icon">⬇️</div>
            <strong>Thuốc tồn kho thấp nhất:</strong>
            <span>{minStock}</span>
          </div>
        </div>
      </div>

      {/* Bộ lọc tìm kiếm */}
      <div className="filters">
        <input
          type="text"
          placeholder="Tìm Mã thuốc hoặc Tên thuốc"
          value={filters.medicineId}
          onChange={(e) => handleFilterChange(e, "medicineId")}
        />
      </div>

      {/* Nút In và Xuất Excel */}
      <div className="actions1">
        <button onClick={handlePrint} className="printButton">
          In báo cáo
        </button>
        <button onClick={handleExportToExcel} className="exportButton">
          Xuất Excel
        </button>
      </div>

      
      {/* Hiển thị bảng dữ liệu */}
      <div className="tableSection">
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <table className="datatableTable">
          <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedPatients(
                        e.target.checked ? data.map((item) => item.medicineId) : []
                      )
                    }
                  />
                </th>
                <th>Số thứ tự</th>
                <th>Mã số thuốc</th>
                <th>Tên thuốc</th>
                <th>Số lượng</th>
                <th>Loại thuốc</th> {/* Thêm cột hình ảnh */}
                <th>Ngày sản xuất</th>
                <th>Ngày hết hạn</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((row, index) => (
                <tr key={row.medicineId}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPatients.includes(row.medicineId)}
                      onChange={() => handleCheckboxChange(row.medicineId)}
                    />
                  </td>
                  <td>{index + 1 + indexOfFirstPatient}</td>
                  <td>{row.medicineId}</td>
                  <td>{row.medicineName}</td>
                  <td>{row.quantity}</td>
                  <td>{row.medicineType}</td>
                  <td>{row.entryDate}</td>
                  <td>{row.expDate}</td>
                  <td>
                    <button
                      className="viewButton"
                      onClick={() => setSelectedPatient(row)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

        </table>
      )}
      </div>

       
        {/* Phân trang */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        
        {/* Hiển thị số trang hiện tại trên tổng số trang */}
        <span className="page-info">
          Trang {currentPage} / {pageNumbers.length}
        </span>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        >
          Trang sau
        </button>
      </div>

        
        {/* Hiển thị chi tiết */}
      <Them
        patient={selectedPatient}
        onClose={() => setSelectedPatient(null)}
        onDelete={handleDelete}
      />

    </div>
  );
};

export default TableUser;








