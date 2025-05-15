import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isToday, isThisWeek, isThisMonth, isThisYear, format, getISOWeek } from "date-fns";


function UserPaymentByBrand() {
  const [orders, setOrders] = useState([]);

  const [grouped, setGrouped] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
 



useEffect(() => {
  (async () => {
    try {
      const res = await fetch("https://api.malidag.com/api/orders");
      const data = await res.json();
      setOrders(data);
      groupByBrandAndDate(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  })();
}, []);



const groupByBrandAndDate = (orders) => {
  const grouped = {};

  orders.forEach((order) => {
    const brand = order.brand || "Unknown";
    const date = new Date(order.timestamp || Date.now());
    const price = parseFloat(order.brandPrice || "0");

    const dayKey = format(date, "yyyy-MM-dd");
    const weekOfMonth = Math.ceil(date.getDate() / 7);
    const weekKey = `week${weekOfMonth}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const monthKey = `${date.getMonth() + 1}-${date.getFullYear()}`;
    const yearKey = `${date.getFullYear()}`;

    if (!grouped[brand]) {
      grouped[brand] = {
        today: { orders: [], total: 0 },
        week: {},
        month: {},
        year: {},
      };
    }

    // Today
    if (isToday(date)) {
      grouped[brand].today.orders.push(order);
      grouped[brand].today.total += price;
    }

    // Week
    if (!grouped[brand].week[weekKey]) {
      grouped[brand].week[weekKey] = { orders: [], total: 0 };
    }
    grouped[brand].week[weekKey].orders.push(order);
    grouped[brand].week[weekKey].total += price;

    // Month
    if (!grouped[brand].month[monthKey]) {
      grouped[brand].month[monthKey] = { orders: [], total: 0 };
    }
    grouped[brand].month[monthKey].orders.push(order);
    grouped[brand].month[monthKey].total += price;

    // Year
    if (!grouped[brand].year[yearKey]) {
      grouped[brand].year[yearKey] = { orders: [], total: 0 };
    }
    grouped[brand].year[yearKey].orders.push(order);
    grouped[brand].year[yearKey].total += price;
  });

  setGrouped(grouped);
};



  return (
    <div style={{ padding: "1rem" }}>
      <h2>User Payments Overview</h2>

   <div style={{ padding: "1rem", display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
  {Object.entries(grouped).map(([brand, data]) => (
    <div
      key={brand}
      style={{
        flex: "1 1 400px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textTransform: "uppercase", color: "#007bff" }}>{brand}</h2>

      {/* Show Today's Orders */}
      {data.today.length > 0 && (
        <>

          <h4>
  Today – Total: ${data.today.total.toFixed(2)} 
  {" "}
  (Malidag: $
    {data.today.orders
      .reduce((sum, o) => {
        const price = parseFloat(o.price || "0");
        const brandPrice = parseFloat(o.brandPrice || "0");
        return sum + (price - brandPrice);
      }, 0)
      .toFixed(2)}
  )
</h4>


         <Link
  to={`/user-payments/brand/${brand}/day/${format(new Date(), "yyyy-MM-dd")}`}
  style={{
    display: "inline-block",
    marginBottom: "0.5rem",
    color: "#007bff",
    textDecoration: "underline",
    fontWeight: "bold",
  }}
>
  View Today's Orders
</Link>

        </>
      )}

      {/* Older Orders: Links to Filtered Views */}
      {Object.entries(data.week).length > 0 && (
        <>
         <h4>Previous Weeks</h4>
{Object.entries(data.week).map(([weekKey, weekData]) => (
  <Link
    key={weekKey}
    to={`/user-payments/brand/${brand}/week/${weekKey}`}
    style={{ display: "block", color: "#ff8800", marginBottom: "0.5rem" }}
  >
    View Week {weekKey} – ${weekData.total.toFixed(2)} 
    {" "}
    (Malidag: $
      {weekData.orders.reduce((sum, o) => {
        const price = parseFloat(o.price || "0");
        const brandPrice = parseFloat(o.brandPrice || "0");
        return sum + (price - brandPrice);
      }, 0).toFixed(2)}
    )
  </Link>
))}


        </>
      )}

      {Object.entries(data.month).length > 0 && (
        <>
         <h4>Previous Months</h4>
{Object.entries(data.month).map(([monthKey, monthData]) => (
  <Link
    key={monthKey}
    to={`/user-payments/brand/${brand}/month/${monthKey}`}
    style={{ display: "block", color: "#888", marginBottom: "0.5rem" }}
  >
    View Month {monthKey} – ${monthData.total.toFixed(2)} 
    {" "}
    (Malidag: $
      {monthData.orders.reduce((sum, o) => {
        const price = parseFloat(o.price || "0");
        const brandPrice = parseFloat(o.brandPrice || "0");
        return sum + (price - brandPrice);
      }, 0).toFixed(2)}
    )
  </Link>
))}


        </>
      )}

      {Object.entries(data.year).length > 0 && (
        <>
         <h4>Previous Years</h4>
{Object.entries(data.year).map(([yearKey, yearData]) => (
  <Link
    key={yearKey}
    to={`/user-payments/brand/${brand}/year/${yearKey}`}
    style={{ display: "block", color: "#999", marginBottom: "0.5rem" }}
  >
    View Year {yearKey} – ${yearData.total.toFixed(2)} 
    {" "}
    (Malidag: $
      {yearData.orders.reduce((sum, o) => {
        const price = parseFloat(o.price || "0");
        const brandPrice = parseFloat(o.brandPrice || "0");
        return sum + (price - brandPrice);
      }, 0).toFixed(2)}
    )
  </Link>
))}


        </>
      )}
    </div>
  ))}
</div>


    </div>
  );
}

export default UserPaymentByBrand;
