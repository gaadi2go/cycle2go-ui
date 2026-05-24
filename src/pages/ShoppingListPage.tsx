import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CircularProgress,
  Box,
  Switch,
  FormControlLabel,
  TextField,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useAuth } from '../contexts/AuthContext';
import {
  subscribeToShoppingList,
  deleteShoppingItem,
} from '../services/shoppingListService';
import { placeOrder } from '../services/orderService';
import { createOrder } from '../services/paymentService';
import { countDays, calculatePrice } from '../services/utilService';
import { Cycle } from '../models/Cycle';
import { Order } from '../models/Order';
import { RAZORPAY_KEY_ID } from '../services/firebase';
import PaymentDialog from '../components/PaymentDialog';

declare global {
  interface Window {
    Razorpay: new (options: unknown) => { open: () => void };
  }
}

const ShoppingListPage: React.FC = () => {
  const { startDate: startParam, endDate: endParam } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const startDate = new Date(startParam || new Date());
  const endDate = new Date(endParam || new Date());
  const days = countDays(startDate, endDate);

  const [items, setItems] = useState<Cycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTransportation, setShowTransportation] = useState(days >= 3);
  const [shippingAddress, setShippingAddress] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    const unsub = subscribeToShoppingList(user.uid, (data) => {
      setItems(data);
      setLoading(false);
    });
    return unsub;
  }, [user, navigate]);

  const handleDelete = async (itemId: string) => {
    if (!user) return;
    await deleteShoppingItem(user.uid, itemId);
  };

  const subTotal = items.reduce(
    (sum, item) => sum + calculatePrice(days, item),
    0
  );

  const getTransportCost = () => {
    if (days >= 3 && showTransportation) {
      let cost = 299;
      for (let i = 1; i < items.length; i++) {
        cost += 99;
      }
      return cost;
    }
    return 0;
  };

  const totalAmt = subTotal + getTransportCost();

  const handleSearch = () => {
    navigate(
      `/search/${startDate.toDateString()}/${endDate.toDateString()}`
    );
  };

  const handleProceedToPay = async () => {
    if (!user) return;

    const receiptNumber = `Receipt#${Math.floor(Math.random() * 5123 * 43) + 10}`;
    const orderDetails = {
      amount: totalAmt * 100,
      receipt: receiptNumber,
    };

    try {
      const order = await createOrder(orderDetails);

      const o: Omit<Order, 'id'> = {
        customerId: user.uid,
        customerName: user.displayName || '',
        customerContact: user.phoneNumber || '',
        customerEmail: user.email || '',
        totalAmt: totalAmt,
        orderDate: new Date().toDateString(),
        status: 'New',
        delivery: showTransportation ? 'Yes' : 'No',
        pickup: showTransportation ? 'Yes' : 'No',
        discount: '0',
        start: startDate.toDateString(),
        end: endDate.toDateString(),
        paidAmt: String(totalAmt),
        paymentMode: 'Online Payment',
        paymentRef: 'Razorpay',
        shippingAddress: shippingAddress,
      };

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: totalAmt * 100,
        name: 'Cycle2Go',
        currency: 'INR',
        order_id: order.id,
        image:
          'https://firebasestorage.googleapis.com/v0/b/gaadi2go-stg.appspot.com/o/Logo.jpg?alt=media&token=6ac883a9-7afb-40d2-9dd1-e893b6ada6f5',
        handler: async () => {
          await placeOrder(user.uid, o);
          setDialogOpen(true);
        },
        prefill: {
          name: user.displayName || '',
          email: user.email || '',
          contact: user.phoneNumber || '',
        },
        theme: {
          color: '#73d700',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate('/home');
  };

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
        <h3>
          <b>Your Ride Plans</b>
        </h3>
        <p>
          Booking from {startDate.toDateString()} to {endDate.toDateString()} (
          {days} days)
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                style={{ borderBottom: '1px solid #eee' }}
              >
                <td style={{ padding: '12px 8px' }}>
                  <h4 style={{ margin: 0 }}>
                    {item.brand} {item.model}
                  </h4>
                </td>
                <td style={{ textAlign: 'right', padding: '12px 8px' }}>
                  <b>Rs. {calculatePrice(days, item)}.00</b>
                </td>
                <td style={{ width: 50, padding: '12px 8px' }}>
                  <IconButton onClick={() => handleDelete(item.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}

            {days >= 3 && showTransportation && (
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 8px' }}>Transportation:</td>
                <td style={{ textAlign: 'right', padding: '12px 8px' }}>
                  <b>Rs. {getTransportCost()}.00</b>
                </td>
                <td />
              </tr>
            )}

            <tr>
              <td style={{ padding: '12px 8px' }} colSpan={3}>
                {days >= 3 && (
                  <Card sx={{ p: 2, mb: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={showTransportation}
                          onChange={(e) =>
                            setShowTransportation(e.target.checked)
                          }
                        />
                      }
                      label={<b>Doorstep Delivery &amp; Pickup</b>}
                    />
                    <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>
                      Rs. 299/- for one cycle
                      <br />
                      Rs. 99/cycle for additional cycles
                    </p>
                  </Card>
                )}

                {days >= 3 && showTransportation && (
                  <Card sx={{ p: 2, mb: 2 }}>
                    <TextField
                      label="Shipping Address"
                      multiline
                      fullWidth
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField label="Landmark" fullWidth sx={{ mb: 1 }} />
                    <TextField
                      label="Bangalore"
                      disabled
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <TextField label="Pin Code" fullWidth />
                  </Card>
                )}

                {days < 3 && (
                  <Card sx={{ p: 2, mb: 2 }}>
                    <b>Pickup &amp; Drop Address:</b>
                    <p style={{ margin: '8px 0' }}>
                      #461, Sai Sobagu, Basement, Outer Ring Road, Teachers
                      Colony, HSR Layout, Bengaluru, Karnataka 560034
                      <br />
                      Landmark: Near Silk Board
                    </p>
                    <p>
                      <b>Location: </b>
                      <a
                        href="https://g.page/cycle2go?share"
                        target="_blank"
                        rel="noreferrer"
                      >
                        https://g.page/cycle2go?share
                      </a>
                    </p>
                    <small>
                      <i>
                        (Note: Delivery &amp; Pickup available for more than 3
                        days of booking)
                      </i>
                    </small>
                  </Card>
                )}
              </td>
            </tr>

            <tr style={{ borderTop: '2px solid #333' }}>
              <td style={{ padding: '12px 8px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ArrowLeftIcon />}
                  onClick={handleSearch}
                >
                  Add More Bicycles
                </Button>
              </td>
              <td
                style={{ textAlign: 'right', padding: '12px 8px' }}
                colSpan={2}
              >
                <Button
                  variant="contained"
                  color="error"
                  endIcon={<ArrowRightIcon />}
                  onClick={handleProceedToPay}
                >
                  Proceed to pay Rs. {totalAmt}.00
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      <PaymentDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        name={user?.displayName || 'User'}
      />
    </div>
  );
};

export default ShoppingListPage;
