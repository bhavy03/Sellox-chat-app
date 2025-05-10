import React from "react";
import { MdNotificationsActive } from "react-icons/md";
import Profile from "./Profile";

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

const NotificationPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <Profile/>
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <MdNotificationsActive className="text-blue-500 text-3xl" />
          Notifications
        </h1>

        {notifications.length === 0 ? (
          <p className="text-gray-500">You're all caught up!</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((note) => (
              <li
                key={note.id}
                className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-md shadow-sm"
              >
                <h2 className="font-semibold text-lg">{note.title}</h2>
                <p className="text-sm text-gray-700">{note.message}</p>
                <span className="text-xs text-gray-500 block mt-1">{note.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;