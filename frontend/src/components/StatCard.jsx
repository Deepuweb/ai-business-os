import React from "react";

// Ek reusable card - dashboard par "Today's Sales", "Orders" etc dikhane ke liye.
// Isse baar baar same CSS nahi likhni padti, bas props change karo.
const StatCard = ({ label, value, icon, color = "indigo" }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className={`text-2xl font-bold text-${color}-600 mt-2`}>{value}</p>
    </div>
  );
};

export default StatCard;
