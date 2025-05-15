import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

function UserPaymentsByDay() {
  const { brand, dayKey } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const total = orders.reduce((sum, o) => sum + parseFloat(o.brandPrice || "0"), 0);
const malidag = orders.reduce((sum, o) => sum + (parseFloat(o.price || "0") - parseFloat(o.brandPrice || "0")), 0);



  useEffect(() => {
    fetch("https://api.malidag.com/api/orders")
      .then((res) => res.json())
      .then((data) => {
  const filtered = data.filter((order) => {
  if (!order.timestamp || !order.brand) return false; // Skip if missing

  const parsedDate = new Date(order.timestamp);
  if (isNaN(parsedDate)) return false; // Skip if invalid

  const orderDate = format(parsedDate, "yyyy-MM-dd");
  return (
    order.brand.toLowerCase() === brand.toLowerCase() &&
    orderDate === dayKey
  );
});

  setOrders(filtered);
  console.log("Filtered:", filtered);
console.log("Brand:", brand, "DayKey:", dayKey);

})
      .catch((err) => console.error("Failed to fetch orders:", err))
      .finally(() => setLoading(false));
  }, [brand, dayKey]);

  if (loading) return <p>Loading day data...</p>;
  if (!orders.length) return <p>No orders found for {dayKey}.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>
  {brand.toUpperCase()} Orders for {dayKey}
</h2>
<p>
  Total: ${total.toFixed(2)}{" "}
  <span style={{ color: "#555", fontStyle: "italic" }}>
    (Malidag: ${malidag.toFixed(2)})
  </span>
</p>
<p>🧾 {orders.length} orders</p>

      <ul>
        {orders.map((order, index) => {
          const time = new Date(order.timestamp).toLocaleTimeString();
          return (
            <li key={index}>
              <strong>{order.fullName}</strong> ({order.email}) at <em>{time}</em> paid {order.amount} {order.cryptoSymbol} — Tx:{" "}
              <a
                href={`https://bscscan.com/tx/${order.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {order.transactionHash.slice(0, 12)}...
              </a>
              <Link
                to={`/user-informationtx-by-brand/${order.transactionHash}/${order.items}`}
                style={{ marginLeft: "10px", textDecoration: "underline", color: "blue" }}
              >
                View Item Info
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UserPaymentsByDay;
