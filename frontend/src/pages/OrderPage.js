import React, { useState, useEffect } from 'react';
import { fetchTrendyolOrders } from '../api/orderApi';
import { Button, Alert } from '@chakra-ui/react';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    const handleFetchTrendyolOrders = async () => {
        try {
            const data = await fetchTrendyolOrders();
            setOrders(data.orders);
            setError(null);
        } catch (error) {
            setError('Error fetching Trendyol orders');
        }
    };

    useEffect(() => {
        handleFetchTrendyolOrders();
    }, []);

    return (
        <div>
            <Button onClick={handleFetchTrendyolOrders}>Fetch Orders from Trendyol</Button>
            {error && <Alert status="error">{error}</Alert>}
            <div>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.id}>
                            <p>Order Number: {order.orderNumber}</p>
                            <p>Status: {order.status}</p>
                            <p>Total Price: {order.totalPrice}</p>
                        </div>
                    ))
                ) : (
                    <p>No orders found</p>
                )}
            </div>
        </div>
    );
};

export default OrderPage;
