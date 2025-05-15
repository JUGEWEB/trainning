import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { parseISO, getISOWeek, format } from "date-fns";

function UserPaymentsByBrandMonth() {
  const { brand, monthKey } = useParams(); // e.g. "5-2025"
  const [weeks, setWeeks] = useState({});

  useEffect(() => {
    fetch("https://api.malidag.com/api/orders")
      .then((res) => res.json())
      .then((data) => {
        const weekMap = {};

        data.forEach((order) => {
          if (order.brand !== brand) return;
          const date = new Date(order.timestamp);
          const mKey = `${date.getMonth() + 1}-${date.getFullYear()}`;
          if (mKey !== monthKey) return;

          const dayKey = format(date, "yyyy-MM-dd");
         const weekOfMonth = Math.ceil(date.getDate() / 7);
const weekKey = `week${weekOfMonth}-${date.getMonth() + 1}-${date.getFullYear()}`;


          if (!weekMap[weekKey]) weekMap[weekKey] = {};
          if (!weekMap[weekKey][dayKey]) weekMap[weekKey][dayKey] = [];
          weekMap[weekKey][dayKey].push(order);
        });

        setWeeks(weekMap);
      });
  }, [brand, monthKey]);

  return (
  <div style={{ padding: "1rem" }}>
    <h2>📅 Month View: {monthKey} — Brand: {brand}</h2>

    {Object.entries(weeks).map(([weekKey, days]) => {
      const allOrders = Object.values(days).flat();

      const total = allOrders.reduce(
        (sum, o) => sum + parseFloat(o.brandPrice || "0"),
        0
      );

      const malidag = allOrders.reduce(
        (sum, o) =>
          sum + (parseFloat(o.price || "0") - parseFloat(o.brandPrice || "0")),
        0
      );

     const brandName = allOrders[0]?.brand || "Unknown";


      return (
        <div
          key={weekKey}
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            backgroundColor: "#f1f1f1",
            borderRadius: "6px",
          }}
        >
          <h3 style={{ marginBottom: "0.5rem" }}>
            <Link
              to={`/user-payments/brand/${brand}/week/${weekKey}`}
              style={{ textDecoration: "underline", color: "#007bff" }}
            >
              {weekKey}
            </Link>
          </h3>
          <p>
            Total:{brandName} ${total.toFixed(2)}{" "}
            <span style={{ color: "#555", fontStyle: "italic" }}>
              (Malidag: ${malidag.toFixed(2)})
            </span>
          </p>
           <p style={{color: "black"}}>{allOrders.length} orders in {monthKey}</p>
        </div>
      );
    })}
  </div>
);

}

export default UserPaymentsByBrandMonth;
