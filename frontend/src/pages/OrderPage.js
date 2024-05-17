import React, { useEffect, useState } from 'react';
import { fetchTrendyolOrders, getOrders } from '../api/orderApi';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const handleFetchTrendyolOrders = async () => {
    try {
      const response = await fetchTrendyolOrders();
      setOrders(response);
    } catch (error) {
      console.error('Error fetching Trendyol orders:', error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <button onClick={handleFetchTrendyolOrders}>Fetch Orders from Trendyol</button>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderNumber}</td>
                <td>{order.customerName}</td>
                <td>{order.totalPrice}</td>
                <td>{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderPage;
