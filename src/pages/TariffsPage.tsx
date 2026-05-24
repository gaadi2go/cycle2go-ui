import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, LinearProgress } from '@mui/material';
import { subscribeToCycles } from '../services/cycleService';
import { Cycle } from '../models/Cycle';
import './TariffsPage.css';

const TariffsPage: React.FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = subscribeToCycles((data) => {
      setCycles(data);
      setLoading(false);
    });
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => {
      unsub();
      clearTimeout(timer);
    };
  }, []);

  const handleSelect = (cycle: Cycle) => {
    navigate(`/cycle-details/${cycle.id}`);
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (cycles.length === 0) {
    return (
      <div className="tariffs">
        <p>No results, try clearing filters</p>
      </div>
    );
  }

  return (
    <div className="tariffs">
      {cycles.map((cycle) => (
        <div key={cycle.id} onClick={() => handleSelect(cycle)} style={{ cursor: 'pointer' }}>
          <Card className="bicycle-card" sx={{ mb: 2 }}>
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
                <h5>
                  {cycle.category} | {cycle.description}
                </h5>
                <div className="divider" />
                <table className="tariff-table">
                  <thead>
                    <tr>
                      <th>Rs. {cycle.dailyPrice}/Day</th>
                      <th>Rs. {cycle.weekPlus}/Day</th>
                      <th>Rs. {cycle.twoWeekPlus}/Day</th>
                      <th>Rs. {cycle.monthPlus}/Day</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Daily Price</td>
                      <td>For 7+ Days</td>
                      <td>For 15+ Days</td>
                      <td>For 30+ Days</td>
                    </tr>
                  </tbody>
                </table>
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
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default TariffsPage;
