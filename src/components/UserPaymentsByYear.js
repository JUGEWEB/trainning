import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format, getMonth, getYear } from "date-fns";

function UserPaymentsByYear() {
  const { brand, year } = useParams();
  const [orders, setOrders] = useState([]);
  const [groupedByMonth, setGroupedByMonth] = useState({});

  useEffect(() => {
  fetch("https://api.malidag.com/api/orders")
    .then((res) => res.json())
    .then((data) => {
      const filtered = data.filter((order) => {
        const date = new Date(order.timestamp);
        if (isNaN(date)) return false;

        return (
          order.brand?.toLowerCase() === brand.toLowerCase() &&
          getYear(date) === parseInt(year)
        );
      });

      const grouped = {};
      filtered.forEach((order) => {
        const date = new Date(order.timestamp);
        const monthKey = `${getMonth(date) + 1}-${year}`;
        if (!grouped[monthKey]) grouped[monthKey] = [];
        grouped[monthKey].push(order);
      });

      setGroupedByMonth(grouped);
      console.log("Route brand:", brand);
console.log("Route year:", year);

    })
    .catch((err) => console.error("Error fetching orders:", err));
}, [brand, year]);


  return (
  <div style={{ padding: "1rem", color: "black" }}>
    <h2>
      Payments for <span style={{ textTransform: "uppercase" }}>{brand}</span> in {year}
    </h2>

    {Object.entries(groupedByMonth).map(([monthKey, orders]) => {
      const total = orders.reduce(
        (sum, o) => sum + parseFloat(o.brandPrice || "0"),
        0
      );

      const malidag = orders.reduce(
        (sum, o) => sum + (parseFloat(o.price || "0") - parseFloat(o.brandPrice || "0")),
        0
      );

      const brandName = orders[0]?.brand || "Unknown";

      return (
        <div key={monthKey} style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#f3f3f3", borderRadius: "6px" }}>
          <h4>{monthKey}</h4>
          <p>
            Total: {brandName} ${total.toFixed(2)}{" "}
            <span style={{ color: "#555", fontStyle: "italic" }}>
              (Malidag: ${malidag.toFixed(2)})
            </span>
          </p>
          <Link
            to={`/user-payments/brand/${brand}/month/${monthKey}`}
            style={{ textDecoration: "underline", color: "#007bff" }}
          >
            View Month Details
          </Link>
          <p style={{color: "black"}}>{orders.length} orders in {monthKey}</p>
        </div>
      );
    })}
  </div>
);

}

export default UserPaymentsByYear;
