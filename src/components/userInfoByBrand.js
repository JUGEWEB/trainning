import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserInfoByBrand() {
  const { transactionHash, itemId } = useParams();
  const [order, setOrder] = useState(null);
  const [itemInfo, setItemInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.malidag.com/api/orders")
      .then(res => res.json())
      .then(async (data) => {
        const found = data.find(
          entry => entry.transactionHash === transactionHash && entry.items === itemId
        );

        if (found) {
          setOrder(found);

          try {
            const itemData = await fetch(`https://api.malidag.com/info/${found.items}`).then(res => res.json());
            setItemInfo(itemData);
          } catch (err) {
            console.error("Failed to fetch item info", err);
          }
        } else {
          setError("Item not found for this transaction.");
        }
      })
      .catch(() => setError("Failed to fetch order data."))
      .finally(() => setLoading(false));
  }, [transactionHash, itemId]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (loading || !order || !itemInfo) return <p>Loading order...</p>;

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
      {/* Left: User Info */}
      <div style={{ flex: 1 }}>
        <h2>User Order Details</h2>
        <p><strong>Name:</strong> {order.fullName}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Wallet:</strong> {order.userAddress}</p>
        <p><strong>Company:</strong> {order.companyName}</p>
        <p><strong>Address:</strong> {order.streetAddress}, {order.town}, {order.country}</p>
        <p><strong>Transaction:</strong> <a href={`https://bscscan.com/tx/${transactionHash}`} target="_blank" rel="noreferrer">{transactionHash}</a></p>
        <p><strong>Brand:</strong> {order.brand}</p>
        <p><strong>Color:</strong> {order.color}</p>
        <p><strong>Size:</strong> {order.size}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Amount Paid:</strong> {order.amount} {order.cryptoSymbol}</p>
        <p><strong>Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
      </div>

      {/* Right: Item Info */}
      <div style={{ flex: 1 }}>
        <h2>Item Details</h2>
        <p><strong>Name:</strong> {itemInfo.textFields?.itemName}</p>
        <p><strong>Category:</strong> {itemInfo.textFields?.category}</p>
        <p><strong>Price:</strong> ${itemInfo.textFields?.usdText}</p>
        <p><strong>Rating:</strong> {itemInfo.textFields?.rating}</p>
        <p><strong>Link:</strong> <a href={itemInfo.textFields?.link} target="_blank" rel="noreferrer">View Product</a></p>

        {itemInfo.images?.length > 0 && (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
            {itemInfo.images.map((img, idx) => (
              <img key={idx} src={`https://api.malidag.com${img}`} alt={`item-${idx}`} style={{ width: "100px" }} />
            ))}
          </div>
        )}

        {itemInfo.videos?.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <h4>Video:</h4>
            <video width="300" controls>
              <source src={`https://api.malidag.com${itemInfo.videos[0]}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfoByBrand;
