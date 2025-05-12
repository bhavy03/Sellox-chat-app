import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const NotificationPanel = ({ isOpen }) => {
  const [notifications, setNotifications] = useState([]);

  const sellerId = localStorage.getItem("userId");
  // console.log(sellerId)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/notifications/${sellerId}`);
        const data = await response.json();
        console.log(data)
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [isOpen, sellerId]);

  // console.log(notifications)
  return (
    <div className={`fixed top-0 right-0 h-screen w-80 bg-cyan-50 shadow-2xl transition-transform duration-300 ${isOpen ? "show" : "hide"}`}>
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #ccc" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>Notifications</h2>
      </div>
      <div className="notifications-list" style={{ padding: "10px", maxHeight: "calc(100% - 50px)", overflowY: "auto" }}>
        {notifications?.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", marginTop: "20px" }}>You&apos;re all caught up!</p>
        ) : (
          notifications.map((note) => (
            <div
              key={note._id}
              className="notification-item bg-gray-200 rounded h-20 px-2 font-bold"
              style={{
                borderBottom: "1px solid #eee",
                padding: "4px 0px",
                marginBottom: "10px",
              }}
            >
              <h3 className="ml-2 font-black" style={{ margin: "0 0 5px", fontSize: "16px", fontWeight: "bold" }} >{note.title}</h3>
              <p className="ml-2" style={{ margin: "2 2 5px", fontSize: "14px", color: "#555" }}>{note.message}</p>
              <span className = "ml-2 pb-1 font-semibold" style={{ fontSize: "12px", color: "#999" }}>Buyer: {note.buyer.name}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default NotificationPanel;
