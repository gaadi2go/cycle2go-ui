import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress, Chip } from '@mui/material';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
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
    return (
      <div className="tariffs-page">
        <div className="tariffs-header">
          <span className="section-badge">Our Fleet</span>
          <h1>Available Cycles</h1>
          <p>Loading our cycle collection for you...</p>
        </div>
        <LinearProgress sx={{ '& .MuiLinearProgress-bar': { bgcolor: '#2e7d32' } }} />
      </div>
    );
  }

  if (cycles.length === 0) {
    return (
      <div className="tariffs-page">
        <div className="tariffs-header">
          <h1>Our Cycles</h1>
        </div>
        <div className="tariffs-empty">
          <DirectionsBikeIcon sx={{ fontSize: 80, color: '#ccc' }} />
          <h3>No cycles available at the moment</h3>
          <p>Please check back soon or contact us for availability.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tariffs-page">
      <div className="tariffs-header">
        <span className="tariffs-badge">Our Fleet</span>
        <h1>Choose Your Perfect Ride</h1>
        <p>
          All cycles include accessories — bell, bottle holder, lock &amp; helmet.
          Prices drop for longer rentals.
        </p>
      </div>

      <div className="tariffs-container">
        <div className="cycles-grid">
          {cycles.map((cycle) => (
            <div
              key={cycle.id}
              className="cycle-card"
              onClick={() => handleSelect(cycle)}
            >
              <div className="cycle-card__image-wrap">
                <img
                  className="cycle-card__image"
                  src={`https://firebasestorage.googleapis.com/v0/b/gaadi2go-22.appspot.com/o/cycles%2F${cycle.productID}.jpg?alt=media&token=c55239e6-90c4-450f-9f60-07b40f0ac843`}
                  alt={`${cycle.brand} ${cycle.model}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/undraw_browsing_urt9.svg';
                  }}
                />
                <div className="cycle-card__category-badge">
                  {cycle.category}
                </div>
              </div>

              <div className="cycle-card__body">
                <div className="cycle-card__header">
                  <div>
                    <h3 className="cycle-card__name">
                      {cycle.brand} {cycle.model}
                    </h3>
                    <p className="cycle-card__desc">{cycle.description}</p>
                  </div>
                  <div className="cycle-card__price-hero">
                    <span className="price-from">from</span>
                    <span className="price-value">₹{cycle.dailyPrice}</span>
                    <span className="price-unit">/day</span>
                  </div>
                </div>

                <div className="cycle-card__pricing">
                  <div className="pricing-grid">
                    <div className="pricing-tier">
                      <span className="tier-label">Daily</span>
                      <span className="tier-price">₹{cycle.dailyPrice}</span>
                    </div>
                    <div className="pricing-tier">
                      <span className="tier-label">7+ Days</span>
                      <span className="tier-price">₹{cycle.weekPlus}</span>
                    </div>
                    <div className="pricing-tier">
                      <span className="tier-label">15+ Days</span>
                      <span className="tier-price">₹{cycle.twoWeekPlus}</span>
                    </div>
                    <div className="pricing-tier pricing-tier--best">
                      <span className="tier-label">30+ Days</span>
                      <span className="tier-price">₹{cycle.monthPlus}</span>
                      <span className="best-tag">Best Deal</span>
                    </div>
                  </div>
                </div>

                <div className="cycle-card__accessories">
                  {['Bell', 'Bottle Holder', 'Lock', 'Helmet'].map((acc) => (
                    <Chip
                      key={acc}
                      label={acc}
                      size="small"
                      icon={<CheckIcon />}
                      sx={{
                        bgcolor: '#e8f5e9',
                        color: '#2e7d32',
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        '& .MuiChip-icon': { color: '#2e7d32', fontSize: '0.85rem' },
                      }}
                    />
                  ))}
                </div>

                <button className="cycle-card__select-btn">
                  View Details &amp; Book
                  <ArrowForwardIcon fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="tariffs-note">
          <div className="tariffs-note__icon">📞</div>
          <div>
            <strong>Need more than 5 cycles?</strong> Contact us for bulk booking discounts
            and corporate rates.
            <br />
            <a href="tel:+918884170822">+91 88841 70822</a> &nbsp;|&nbsp;
            <a href="https://wa.me/918884170822" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TariffsPage;
