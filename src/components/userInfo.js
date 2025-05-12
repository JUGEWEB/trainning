import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserInfo() {
  const { transactionHash } = useParams();
  const [order, setOrder] = useState(null);
  const [itemInfo, setItemInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch order data first
    fetch("https://api.malidag.com/api/orders")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.transactionHash === transactionHash);
        if (found) {
          setOrder(found);
          fetch(`https://api.malidag.com/info/${found.items}`)
            .then((res) => res.json())
            .then(setItemInfo)
            .catch(() => setItemInfo(null));
        } else {
          setError("Order not found.");
        }
      })
      .catch(() => setError("Failed to fetch order data."));
  }, [transactionHash]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!order) return <p>Loading order...</p>;

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
      {/* Left: User Info */}
      <div style={{ flex: 1 }}>
        <h2>User Order Details</h2>
        <p><strong>Name:</strong> {order.fullName}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Amount Paid:</strong> {order.amount} {order.cryptoSymbol}</p>
        <p><strong>Transaction:</strong> <a href={`https://bscscan.com/tx/${order.transactionHash}`} target="_blank" rel="noreferrer">{order.transactionHash}</a></p>
        <p><strong>Address:</strong> {order.streetAddress}, {order.town}, {order.country}</p>
        <p><strong>Company:</strong> {order.companyName}</p>
        <p><strong>Wallet:</strong> {order.userAddress}</p>
        <p><strong>Color:</strong> {order.color}</p>
        <p><strong>Size:</strong> {order.size}</p>
        <p><strong>Date:</strong> {new Date(order.timestamp || Date.now()).toLocaleString()}</p>
      </div>

      {/* Right: Item Info */}
<div style={{ flex: 1 }}>
  <h2>Item Information</h2>
  {!itemInfo ? (
    <p>Loading item info...</p>
  ) : (
    <>
      <p><strong>Name:</strong> {itemInfo.textFields.itemName}</p>
      <p><strong>Category:</strong> {itemInfo.textFields.category}</p>
      <p><strong>Price:</strong> ${itemInfo.textFields.usdText}</p>
      <p><strong>Sold:</strong> {itemInfo.textFields.soldText}</p>
      <p><strong>Rating:</strong> {itemInfo.textFields.rating}</p>
      <p><strong>Link:</strong> <a href={itemInfo.textFields.link} target="_blank" rel="noreferrer">View Product</a></p>

      {/* Sizes (if available) */}
      {itemInfo.textFields.sizes && (
        <div>
          <h4>Sizes:</h4>
          <ul>
            {Object.entries(itemInfo.textFields.sizes).map(([variant, sizes]) => (
              <li key={variant}><strong>{variant}</strong>: {sizes.join(", ")}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Images */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
        {itemInfo.images.map((img, idx) => (
          <img
            key={idx}
            src={`https://api.malidag.com${img}`}
            alt={`item-${idx}`}
            style={{ width: "100px", borderRadius: "8px" }}
          />
        ))}
      </div>

      {/* Videos */}
      {itemInfo.videos?.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Video:</h4>
          <video width="300" controls>
            <source src={`https://api.malidag.com${itemInfo.videos[0]}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  )}
</div>

</div>

  );
}

export default UserInfo;
