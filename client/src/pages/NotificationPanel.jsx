import React from "react";
import { MdNotificationsActive } from "react-icons/md";

const notifications = [
  {
    id: 1,
    title: "Order Confirmed",
    message: "Your order #12345 has been confirmed.",
    time: "2 mins ago",
  },
  {
    id: 2,
    title: "Shipped",
    message: "Your order #12345 has been shipped.",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Delivery Update",
    message: "Your order is out for delivery.",
    time: "Today, 11:00 AM",
  },
];

const NotificationPanel = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-0 right-0 h-screen w-80 bg-gray-100 shadow-2xl transition-transform duration-300 ${isOpen ? "show" : "hide"}`}>
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #ccc" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>Notifications</h2>
        {/* <button 
          onClick={() => {
            if (onClose) onClose();
          }} 
          style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }} 
          aria-label="Close Notification Panel"
        > */}
          {/* &times;
        </button> */}
        {/* <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }} aria-label="Close Notification Panel">&times;</button> */}
      </div>
    <div className="notifications-list" style={{ padding: "10px", maxHeight: "calc(100% - 50px)", overflowY: "auto" }}>
      {notifications.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888", marginTop: "20px" }}>You're all caught up!</p>
      ) : (
        notifications.map((note) => (
      <div
        key={note.id}
        className="notification-item"
        style={{
          borderBottom: "1px solid #eee",
          padding: "10px 0",
          marginBottom: "10px",
        }}
      >
        <h3 style={{ margin: "0 0 5px", fontSize: "16px", fontWeight: "bold" }}>{note.title}</h3>
        <p style={{ margin: "0 0 5px", fontSize: "14px", color: "#555" }}>{note.message}</p>
        <span style={{ fontSize: "12px", color: "#999" }}>{note.time}</span>
      </div>
        ))
      )}
    </div>
     
    </div>
  );
};

export default NotificationPanel;
