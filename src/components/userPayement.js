import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserPayment() {
  const [orders, setOrders] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);


  useEffect(() => {
    fetch("https://api.malidag.com/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        groupByDate(data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

 const groupByDate = (orders) => {
  const groups = {};

  orders.forEach((order) => {
    const txDate = new Date(order.timestamp || Date.now()); // fallback for legacy entries
    const day = txDate.toLocaleDateString();
    const month = `${txDate.getMonth() + 1}-${txDate.getFullYear()}`;
    const year = `${txDate.getFullYear()}`;

    if (!groups[year]) groups[year] = {};
    if (!groups[year][month]) groups[year][month] = {};
    if (!groups[year][month][day]) groups[year][month][day] = [];

   const existingTx = groups[year][month][day].find(o => o.transactionHash === order.transactionHash);
if (!existingTx) {
  groups[year][month][day].push(order);
}

  });

  setGrouped(groups);
};


  return (
    <div style={{ padding: "1rem" }}>
      <h2>User Payments Overview</h2>
      {Object.entries(grouped).map(([year, months]) => (
        <div key={year}>
          <h3>{year}</h3>
          {Object.entries(months).map(([month, days]) => (
            <div key={month} style={{ marginLeft: "1rem" }}>
              <h4>{month}</h4>
              {Object.entries(days).map(([day, orders]) => (
                <div key={day} style={{ marginLeft: "1.5rem" }}>
                  <h5>{day}</h5>
                  <ul>
                    {orders.map((order, index) => (
                        
                      <li key={index}>
                        {(() => {
  const date = new Date(order.timestamp || Date.now());
  const time = date.toLocaleTimeString(); // ⏱ formatted time
  return (
    <>
      <strong>{order.fullName}</strong> ({order.email}) at <em>{time}</em> paid {order.amount} {order.cryptoSymbol} — Tx:{" "}
      <a
        href={`https://bscscan.com/tx/${order.transactionHash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {order.transactionHash.slice(0, 12)}...
      </a>
     <Link
  to={`/user-informationtx/${order.transactionHash}`}
  style={{ marginLeft: "10px", textDecoration: "underline", color: "blue" }}
>
  View User Information
</Link>
    </>
  );
})()}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default UserPayment;
