import "./tableUser.scss";
import "./them.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Import thư viện thông báo

const Them = ({ patient, onClose, onUpdate, onDelete }) => {
  if (!patient) return null; // Không hiển thị nếu không có dữ liệu

  const [formData, setFormData] = useState({ ...patient });
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa

  // Cập nhật dữ liệu khi `patient` thay đổi
  useEffect(() => {
    setFormData({ ...patient });
  }, [patient]);

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Lưu thay đổi
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/medicines/${formData.medicineId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Cập nhật thất bại!");

      const updatedData = await response.json();
      onUpdate(updatedData); // Cập nhật dữ liệu lên cấp cha
      setIsEditing(false); // Thoát chế độ chỉnh sửa
      toast.success("Cập nhật thành công!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Thay đổi ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result, // Lưu ảnh vào formData
        }));
      };
      reader.readAsDataURL(file); // Đọc file ảnh dưới dạng URL
    }
  };

  // Xóa thuốc
  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa thuốc này không?")) return;

    try {
      const response = await fetch(`/api/medicines/${patient.medicineId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Xóa thất bại!");

      onDelete(patient.medicineId); // Gọi callback để cập nhật danh sách
      onClose(); // Đóng modal
      toast.success("Xóa thành công!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Thông tin thuốc</h3>
        <table>
          <tbody>
            {[
              { label: "Tên thuốc", key: "medicineName", type: "text" },
              { label: "Mã thuốc", key: "medicineId", type: "text" },
              { label: "Số lượng", key: "quantity", type: "number" },
              { label: "Ngày sản xuất", key: "entryDate", type: "date" },
              { label: "Ngày hết hạn", key: "expDate", type: "date" },
            ].map(({ label, key, type }) => (
              <tr key={key}>
                <td>{label}:</td>
                <td>
                  {isEditing ? (
                    <input
                      type={type}
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{formData[key]}</span>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td>Ảnh thuốc:</td>
              <td>
                <img
                  src={formData.imageUrl || `/avatar.png`} // Hiển thị ảnh từ formData nếu có, nếu không thì dùng ảnh mặc định
                  alt="Medicine"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <input
                  type="file"
                  id="image-upload"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <button 
                  type="button" 
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  Tải ảnh lên
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="modal-actions">
          {isEditing ? (
            <>
              <button className="update" onClick={handleSave}>
                Lưu
              </button>
              <button className="cancel" onClick={() => setIsEditing(false)}>
                Hủy
              </button>
            </>
          ) : (
            <>
              <button className="editButton" onClick={() => setIsEditing(true)}>
                Chỉnh sửa
              </button>
              <button className="deleteButton" onClick={handleDelete}>
                Xóa
              </button>
            </>
          )}
          <button className="close" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Them;
