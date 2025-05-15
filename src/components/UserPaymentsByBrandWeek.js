import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

function UserPaymentsByBrandWeek() {
  const { brand, weekKey } = useParams(); // example: "week2-5-2025"
  const [days, setDays] = useState({});

  useEffect(() => {
    const [weekLabel, monthStr, yearStr] = weekKey.replace("week", "").split("-");
    const weekOfMonth = parseInt(weekLabel, 10);
    const targetMonth = parseInt(monthStr, 10); // 1-based
    const targetYear = parseInt(yearStr, 10);

    fetch("https://api.malidag.com/api/orders")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((order) => {
          if (order.brand?.toLowerCase() !== brand.toLowerCase()) return false;

          const date = new Date(order.timestamp);
          const orderWeek = Math.ceil(date.getDate() / 7);
          const orderMonth = date.getMonth() + 1;
          const orderYear = date.getFullYear();

          return (
            orderWeek === weekOfMonth &&
            orderMonth === targetMonth &&
            orderYear === targetYear
          );
        });

        const groupedByDay = {};
        filtered.forEach((order) => {
          const dayKey = format(new Date(order.timestamp), "yyyy-MM-dd");
          if (!groupedByDay[dayKey]) groupedByDay[dayKey] = [];
          groupedByDay[dayKey].push(order);
        });

        setDays(groupedByDay);
      });
  }, [brand, weekKey]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📅 Week View: {weekKey} — Brand: {brand}</h2>

      {Object.entries(days).map(([dayKey, orders]) => {
        const total = orders.reduce((sum, o) => sum + parseFloat(o.brandPrice || "0"), 0);
       const brandName = orders[0]?.brand || "Unknown";

        const malidag = orders.reduce(
          (sum, o) =>
            sum + (parseFloat(o.price || "0") - parseFloat(o.brandPrice || "0")),
          0
        );

        return (
          <div key={dayKey} style={{ marginBottom: "1rem", padding: "1rem", background: "#f9f9f9", borderRadius: "6px" }}>
            <h4>{dayKey}</h4>
            <p>
              Total:{brandName} ${total.toFixed(2)}{" "}
              <span style={{ color: "#555", fontStyle: "italic" }}>
                (Malidag: ${malidag.toFixed(2)})
              </span>
            </p>
            <Link
              to={`/user-payments/brand/${brand}/day/${dayKey}`}
              style={{ textDecoration: "underline", color: "#007bff", fontWeight: "bold" }}
            >
              View Orders
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default UserPaymentsByBrandWeek;
