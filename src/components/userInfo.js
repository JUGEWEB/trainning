import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserInfo() {
  const { transactionHash } = useParams();
  const [orders, setOrders] = useState([]);
  const [itemInfos, setItemInfos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ You forgot to define this

  useEffect(() => {
    fetch("https://api.malidag.com/api/orders")
      .then(res => res.json())
      .then(async (data) => {
        const foundOrders = data.filter(order => order.transactionHash === transactionHash);
        if (foundOrders.length) {
          setOrders(foundOrders);
          const itemFetches = await Promise.all(
            foundOrders.map(order =>
              fetch(`https://api.malidag.com/info/${order.items}`).then(res => res.json())
            )
          );
          setItemInfos(itemFetches);
        } else {
          setError("No orders found for this transaction.");
        }
      })
      .catch(() => setError("Failed to fetch order data."))
      .finally(() => setLoading(false));
  }, [transactionHash]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (loading || orders.length === 0 || itemInfos.length === 0) return <p>Loading order...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>User Purchase Details</h2>
      <p><strong>Name:</strong> {orders[0]?.fullName}</p>
      <p><strong>Email:</strong> {orders[0]?.email}</p>
      <p><strong>Wallet:</strong> {orders[0]?.userAddress}</p>
      <p><strong>Company:</strong> {orders[0]?.companyName}</p>
      <p><strong>Address:</strong> {orders[0]?.streetAddress}, {orders[0]?.town}, {orders[0]?.country}</p>
      <p><strong>Transaction:</strong> <a href={`https://bscscan.com/tx/${transactionHash}`} target="_blank" rel="noreferrer">{transactionHash}</a></p>
      <p><strong>Date:</strong> {new Date(orders[0]?.timestamp).toLocaleString()}</p>

      <h3>Items:</h3>
      {orders.map((order, index) => {
        const item = itemInfos[index];
        return (
          <div key={index} style={{ borderTop: "1px solid #ccc", marginTop: "1rem", paddingTop: "1rem" }}>
            <p><strong>Item ID:</strong> {order.items}</p>
            <p><strong>Amount:</strong> {order.amount} {order.cryptoSymbol}</p>
            <p><strong>Color:</strong> {order.color}</p>
            <p><strong>Size:</strong> {order.size}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>

            {item && (
              <>
                <p><strong>Item Name:</strong> {item.textFields?.itemName}</p>
                <p><strong>Category:</strong> {item.textFields?.category}</p>
                <p><strong>Price:</strong> ${item.textFields?.usdText}</p>
                <p><strong>Link:</strong> <a href={item.textFields?.link} target="_blank" rel="noreferrer">View Product</a></p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {item.images?.map((img, idx) => (
                    <img key={idx} src={`https://api.malidag.com${img}`} alt={`item-${idx}`} style={{ width: "100px" }} />
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default UserInfo;
