import React, { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Orders() {
  const [Orderslist, setOrderslist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    getOrderData();
  }, []);

  const getOrderData = () => {
    axios
      .get("https://final-project-idzh.onrender.com/order")
      .then((response) => {
        setOrderslist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (orderId, status) => {
    axios
      .patch(`https://final-project-idzh.onrender.com/order/status/${orderId}`, { status })
      .then((response) => {
        toast.success(`Order status updated to ${status}`);
        getOrderData();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update order status");
      });
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="orders-container">
      <div className="orders-wrapper">
        <ToastContainer />
  
        <div className="orders-page-name">
          <h1 className="orders-title">Orders</h1>
        </div>
        <div className="orders-table-container">
          <div className="orders-search-table">
            <div className="orders-search">
              <input
                placeholder="Search By Order ID, Name, or Email"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
            </div>
            <table className="orders-table">
              <thead className="orders-head-table">
                <tr className="orders-table-head-row">
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>User Address</th>
                  <th>User Email</th>
                  <th>Total Bill</th>
                  <th>Items</th>
                  <th style={{ width: "100px" }}>Status</th>
                  <th style={{ width: "100px" }}>Update</th>
                </tr>
              </thead>
  
              <tbody className="orders-table-body">
                {Orderslist.filter((listOrders) => {
                  if (!searchTerm) {
                    return listOrders;
                  } else if (
                    listOrders._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (listOrders.firstName &&
                      listOrders.firstName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())) ||
                    (listOrders.lastName &&
                      listOrders.lastName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())) ||
                    (listOrders.email &&
                      listOrders.email.toLowerCase().includes(searchTerm.toLowerCase()))
                  ) {
                    return listOrders;
                  } else {
                    return null;
                  }
                }).map((listOrders, key) => (
                  <tr className="orders-table-row" key={key}>
                    <td className="orders-table-data">{listOrders._id}</td>
                    <td className="orders-table-data">
                      {listOrders.firstName + " " + listOrders.lastName}
                    </td>
                    <td className="orders-table-data">{listOrders.shippingAddress}</td>
                    <td className="orders-table-data">{listOrders.email}</td>
                    <td className="orders-table-data">{listOrders.totalBill}$</td>
                    <td
                      className="orders-table-data smallerfont clickable"
                      onClick={() => handleOrderClick(listOrders)}
                    >
                      {listOrders.products.map((product) => (
                        <span
                          className="orders-product-item"
                          key={product.productId}
                        >
                          {product.productName} ({product.quantity})
                        </span>
                      ))}
                    </td>
                    <td className="orders-table-data">{listOrders.status}</td>
                    <td className="orders-table-data">
                      <select
                        value={listOrders.status}
                        onChange={(event) =>
                          handleUpdate(listOrders._id, event.target.value)
                        }
                      >
                        {["Pending", "Confirmed", "Shipped", "Delivered"].map(
                          (option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      {selectedOrder && (
        <div className="orders-popup">
          <div className="orders-popup-content">
            <div className="orders-details-close">
              <h2>Order Details</h2>
              <button className="orders-close-btn" onClick={handleClosePopup}>
                Close
              </button>
            </div>
            <div>
              <h3>Order ID: {selectedOrder._id}</h3>
              <h3>
                User Name: {selectedOrder.firstName + " " + selectedOrder.lastName}
              </h3>
              <h3>User Address: {selectedOrder.shippingAddress}</h3>
              <h3>User Email: {selectedOrder.userId.email}</h3>
              <h3>Total Bill: {selectedOrder.totalBill}$</h3>
              <h3>Items:</h3>
              <ul>
                {selectedOrder.products.map((product) => (
                  <li className="orders-popup-item" key={product.productId}>
                    {product.productName} ({product.quantity})
                  </li>
                ))}
              </ul>
              <h3>Status: {selectedOrder.status}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
                }  

export default Orders;
