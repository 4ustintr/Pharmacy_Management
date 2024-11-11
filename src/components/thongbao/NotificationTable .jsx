// src/components/notificationTable/NotificationTable.jsx
import React, { useState } from "react";
import "./notificationTable.scss";

const notifications = [
  { id: 1, sender: "Phan Quang Thành", title: "Code mẫu Modal, Table components", description: "Đã có mẫu code cho các thành phần Modal và Table.", sentTime: "15:04 06/11/2024" },
  { id: 2, sender: "Phòng Công tác sinh viên", title: "TB về việc nhận đơn thắc mắc/kiếu nại của sinh viên", description: "Thông báo về việc tiếp nhận đơn thắc mắc cho kỳ HK2 (2023-2024).", sentTime: "11:41 06/11/2024" },
  { id: 3, sender: "Nguyễn Việt Dũng", title: "Thay đổi lịch học chiều ngày 30/10/2024", description: "Lịch học chiều ngày 30/10/2024 đã được thay đổi.", sentTime: "08:15 30/10/2024" },
  // Thêm các thông báo khác ở đây
];

const NotificationTable = () => {
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const [senderFilter, setSenderFilter] = useState("");
  const [keywordFilter, setKeywordFilter] = useState("");

  // Bộ lọc thông báo theo người gửi và từ khóa
  const handleFilter = () => {
    const filtered = notifications.filter(notification => {
      return (
        (senderFilter === "" || notification.sender.includes(senderFilter)) &&
        (keywordFilter === "" || notification.title.includes(keywordFilter) || notification.description.includes(keywordFilter))
      );
    });
    setFilteredNotifications(filtered);
  };

  // Cập nhật bộ lọc khi thay đổi
  const handleSenderChange = (e) => setSenderFilter(e.target.value);
  const handleKeywordChange = (e) => setKeywordFilter(e.target.value);

  return (
    <div className="notificationTable">
      <div className="filterSection">
        <input
          type="text"
          placeholder="Lọc theo người gửi"
          value={senderFilter}
          onChange={handleSenderChange}
        />
        <input
          type="text"
          placeholder="Tìm kiếm theo từ khóa"
          value={keywordFilter}
          onChange={handleKeywordChange}
        />
        <button onClick={handleFilter}>Lọc</button>
      </div>
      <div className="summarySection">
        <p>Tổng số thông báo: {filteredNotifications.length}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>TT</th>
            <th>Người gửi</th>
            <th>Tiêu đề</th>
            <th>Mô tả</th>
            <th>Thời gian gửi</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotifications.map((notification, index) => (
            <tr key={notification.id}>
              <td>{index + 1}</td>
              <td>{notification.sender}</td>
              <td>{notification.title}</td>
              <td>{notification.description}</td>
              <td>{notification.sentTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTable;
