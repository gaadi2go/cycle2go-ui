import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Card } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToOrders } from '../services/orderService';
import { Order } from '../models/Order';

const MyBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const unsub = subscribeToOrders(user.uid, (data) => {
      setOrders(data);
      setLoading(false);
    });
    return unsub;
  }, [user]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
      <Card sx={{ p: 2 }}>
        <h3>Your Bookings</h3>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Booking ID</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Status</th>
              <th style={{ textAlign: 'right', padding: '8px' }}>Amt</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                style={{ borderBottom: '1px solid #eee' }}
              >
                <td style={{ padding: '8px' }}>{order.id}</td>
                <td style={{ padding: '8px' }}>{order.orderDate}</td>
                <td style={{ padding: '8px' }}>{order.status}</td>
                <td style={{ textAlign: 'right', padding: '8px' }}>
                  <b>Rs. {order.totalAmt}.00</b>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '16px', textAlign: 'center' }}>
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default MyBookingsPage;
