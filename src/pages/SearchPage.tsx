import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Button,
  TextField,
  LinearProgress,
  Drawer,
  Box,
} from '@mui/material';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import { addItemToShoppingList } from '../services/shoppingListService';
import { countDays, calculatePrice } from '../services/utilService';
import { Cycle } from '../models/Cycle';
import './SearchPage.css';

const SearchPage: React.FC = () => {
  const { startDate: startParam, endDate: endParam } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [startDate, setStartDate] = useState(new Date(startParam || new Date()));
  const [endDate, setEndDate] = useState(new Date(endParam || new Date()));
  const [days, setDays] = useState(1);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDays(countDays(startDate, endDate));
  }, [startDate, endDate]);

  useEffect(() => {
    const colRef = collection(db, 'cycle2go/products/cycles');
    const q = query(colRef, where('available', '==', 'Yes'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data: Cycle[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Cycle[];
      setCycles(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleAddToRidePlan = async (cycle: Cycle) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    await addItemToShoppingList(user.uid, cycle);
    navigate(
      `/shopping-list/${startDate.toDateString()}/${endDate.toDateString()}`
    );
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    const d = new Date(value);
    if (type === 'start') setStartDate(d);
    else setEndDate(d);
  };

  const toInputDate = (d: Date) => {
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offset * 60 * 1000);
    return local.toISOString().split('T')[0];
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: 1 }}>
        {loading && <LinearProgress />}

        {!loading && cycles.length === 0 && (
          <p style={{ padding: 20 }}>No results, try clearing filters</p>
        )}

        {cycles.map((cycle) => (
          <Card key={cycle.id} className="bicycle-card" sx={{ m: 2 }}>
            <div className="bicycle-card-layout">
              <div>
                <img
                  className="bicycle-image"
                  src={`https://firebasestorage.googleapis.com/v0/b/gaadi2go-22.appspot.com/o/cycles%2F${cycle.productID}.jpg?alt=media&token=c55239e6-90c4-450f-9f60-07b40f0ac843`}
                  alt={`${cycle.brand} ${cycle.model}`}
                />
              </div>
              <CardContent className="bicycle-card-details">
                <h4>
                  {cycle.brand} {cycle.model}
                </h4>
                <h5>{cycle.description}</h5>
                <div className="divider" />
                <div className="features">
                  <span>
                    <b>Accessories: </b>
                  </span>
                  <span>Bell, </span>
                  <span>Bottle Holder</span>
                  <span> | </span>
                  <span>Lock, </span>
                  <span>Helmet</span>
                </div>
              </CardContent>
              <div className="bicycle-card-price">
                <h3>Rs. {calculatePrice(days, cycle)}.00</h3>
                <h6>For {days} days</h6>
                <Button
                  variant="contained"
                  onClick={() => handleAddToRidePlan(cycle)}
                  sx={{ bgcolor: 'orange', ':hover': { bgcolor: '#e69500' } }}
                >
                  Add To Ride Plan
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Box>

      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: 300, position: 'relative' },
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            label="Start Date"
            type="date"
            value={toInputDate(startDate)}
            onChange={(e) => handleDateChange('start', e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="End Date"
            type="date"
            value={toInputDate(endDate)}
            onChange={(e) => handleDateChange('end', e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="No. of Days"
            value={days}
            disabled
            fullWidth
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default SearchPage;
