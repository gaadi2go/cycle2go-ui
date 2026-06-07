import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Tabs,
  Tab,
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BuildIcon from '@mui/icons-material/Build';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SecurityIcon from '@mui/icons-material/Security';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StarIcon from '@mui/icons-material/Star';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './HomePage.css';

const brandOptions = ['Atlas', 'Hero', 'Trek', 'BTWIN', 'Scott', 'Firefox'];

const stats = [
  { number: '500+', label: 'Happy Customers' },
  { number: '50+', label: 'Bicycles Available' },
  { number: '5+', label: 'Years of Service' },
  { number: '4.8★', label: 'Avg. Rating' },
];

const services = [
  {
    icon: <DirectionsBikeIcon sx={{ fontSize: 48 }} />,
    title: 'Bicycle Rental',
    description:
      'Choose from our well-maintained fleet of gear and non-gear bicycles for daily, weekly, or monthly rentals at the most affordable rates in Bengaluru.',
    cta: 'Browse Cycles',
    link: '/tariffs',
    color: '#e8f5e9',
    iconColor: '#2e7d32',
  },
  {
    icon: <BuildIcon sx={{ fontSize: 48 }} />,
    title: 'Bicycle Servicing',
    description:
      'Expert bicycle servicing for all brands — from a basic tune-up to a full overhaul. Free pickup & drop facility included. Starting at just ₹700.',
    cta: 'Book Servicing',
    link: null,
    action: 'service',
    color: '#fff3e0',
    iconColor: '#e65100',
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 48 }} />,
    title: 'Corporate & Events',
    description:
      'Plan corporate cycling events, CSR rides, cycling marathons, and team-building outings. We handle the logistics — you enjoy the ride.',
    cta: 'Enquire Now',
    link: null,
    action: 'contact',
    color: '#e3f2fd',
    iconColor: '#1565c0',
  },
];

const features = [
  {
    icon: <SecurityIcon />,
    title: 'No Security Deposit',
    desc: 'Pay only for the rental duration. No hidden charges or security deposits required.',
  },
  {
    icon: <LocalOfferIcon />,
    title: 'Best Price Guarantee',
    desc: 'We offer the most competitive rates with discounts for longer rental periods.',
  },
  {
    icon: <CheckCircleOutlineIcon />,
    title: 'Free Accessories',
    desc: 'Every rental includes a bell, bottle holder, lock, and helmet at no extra cost.',
  },
  {
    icon: <DeliveryDiningIcon />,
    title: 'Home Delivery',
    desc: 'We deliver and pick up the cycle from your doorstep for rentals of 3+ days.',
  },
  {
    icon: <ThumbUpAltIcon />,
    title: 'Well-Maintained Fleet',
    desc: 'Every cycle is serviced and quality-checked before every rental for a smooth ride.',
  },
  {
    icon: <HeadsetMicIcon />,
    title: '7-Day Support',
    desc: 'Our team is available every day of the week to assist you with any queries.',
  },
];

const testimonials = [
  {
    name: 'Rahul M.',
    location: 'Koramangala',
    rating: 5,
    text: 'Absolutely fantastic service! The cycle was clean and well-maintained. Booked for a week and the home delivery made it super convenient. Will definitely rent again.',
  },
  {
    name: 'Priya S.',
    location: 'HSR Layout',
    rating: 5,
    text: 'Got my cycle serviced here and it feels like new. The pickup and drop facility is a game-changer. Very professional team and reasonable pricing.',
  },
  {
    name: 'Aditya K.',
    location: 'Bellandur',
    rating: 5,
    text: 'Used Cycle2Go for our company cycling event. They arranged 30 cycles for us seamlessly. The team was proactive and the whole experience was smooth.',
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [speed, setSpeed] = useState('Non-Gear');

  const handleSearch = () => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (s.getTime() > e.getTime()) {
      alert('Please select the correct date!');
      return;
    }
    navigate(`/search/${s.toDateString()}/${e.toDateString()}`);
  };

  const handleBookServicing = () => {
    navigate(`/servicing/${brand}/${model}/${speed}`);
  };

  return (
    <div className="homepage">
      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <div className="hero__text">
            <span className="hero__badge">Bengaluru's #1 Bicycle Rental</span>
            <h1 className="hero__title">
              Rent a Bicycle,<br />
              <span className="hero__title--accent">Explore the City</span>
            </h1>
            <p className="hero__subtitle">
              Affordable bicycle rentals &amp; expert servicing near Silk Board, Koramangala.
              Gear or non-gear — we've got the perfect ride for you.
            </p>
            <div className="hero__trust-badges">
              <span>✓ No security deposit</span>
              <span>✓ Free accessories</span>
              <span>✓ Home delivery</span>
            </div>
          </div>

          <div className="hero__widget">
            <Box sx={{ bgcolor: '#fff', borderRadius: 3, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
              <Tabs
                value={tabIndex}
                onChange={(_, v) => setTabIndex(v)}
                centered
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  '& .MuiTab-root': { py: 2, fontWeight: 600, fontSize: '0.95rem' },
                  '& .Mui-selected': { color: '#2e7d32 !important' },
                  '& .MuiTabs-indicator': { bgcolor: '#2e7d32' },
                }}
              >
                <Tab icon={<DirectionsBikeIcon />} iconPosition="start" label="Rent a Cycle" />
                <Tab icon={<BuildIcon />} iconPosition="start" label="Book Servicing" />
              </Tabs>

              {tabIndex === 0 && (
                <Box className="widget-body">
                  <p className="widget-hint">Select your rental dates to see available cycles</p>
                  <div className="widget-row">
                    <TextField
                      label="Start Date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: new Date().toISOString().split('T')[0] }}
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label="End Date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: startDate }}
                      size="small"
                      fullWidth
                    />
                  </div>
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    startIcon={<SearchIcon />}
                    fullWidth
                    sx={{
                      bgcolor: '#2e7d32',
                      py: 1.5,
                      fontSize: '1rem',
                      ':hover': { bgcolor: '#1b5e20' },
                    }}
                  >
                    Search Available Cycles
                  </Button>
                  <p className="widget-note">
                    📞 For bulk bookings call us at{' '}
                    <a href="tel:+918884170822">+91 88841 70822</a>
                  </p>
                </Box>
              )}

              {tabIndex === 1 && (
                <Box className="widget-body">
                  <p className="widget-hint">Tell us about your bicycle for a service quote</p>
                  <div className="widget-row">
                    <Autocomplete
                      options={brandOptions}
                      value={brand || null}
                      onChange={(_, val) => setBrand(val || '')}
                      onInputChange={(_, val) => setBrand(val)}
                      freeSolo
                      size="small"
                      fullWidth
                      renderInput={(params) => (
                        <TextField {...params} label="Brand (e.g. Hero, Trek)" />
                      )}
                    />
                    <TextField
                      label="Model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      size="small"
                      fullWidth
                    />
                  </div>
                  <RadioGroup
                    row
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    sx={{ mb: 1.5 }}
                  >
                    <FormControlLabel
                      value="Non-Gear"
                      control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#2e7d32' } }} />}
                      label="Non-Gear (₹700)"
                    />
                    <FormControlLabel
                      value="Gear"
                      control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#2e7d32' } }} />}
                      label="Gear (₹1200)"
                    />
                  </RadioGroup>
                  <Button
                    variant="contained"
                    onClick={handleBookServicing}
                    startIcon={<BuildIcon />}
                    fullWidth
                    sx={{
                      bgcolor: '#e65100',
                      py: 1.5,
                      fontSize: '1rem',
                      ':hover': { bgcolor: '#bf360c' },
                    }}
                  >
                    Book Servicing
                  </Button>
                  <p className="widget-note">
                    🔧 Free pickup &amp; drop &nbsp;|&nbsp; Spare parts charged at MRP
                  </p>
                </Box>
              )}
            </Box>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="stats-bar">
        <div className="page-container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-number">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="section section--light">
        <div className="page-container">
          <div className="section-header">
            <span className="section-badge">What We Offer</span>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              From short city rides to corporate events — we have everything you need to get rolling.
            </p>
          </div>
          <div className="services-grid">
            {services.map((svc) => (
              <div key={svc.title} className="service-card" style={{ '--card-bg': svc.color } as React.CSSProperties}>
                <div className="service-card__icon" style={{ color: svc.iconColor }}>
                  {svc.icon}
                </div>
                <h3 className="service-card__title">{svc.title}</h3>
                <p className="service-card__desc">{svc.description}</p>
                <button
                  className="service-card__cta"
                  style={{ color: svc.iconColor }}
                  onClick={() => {
                    if (svc.link) navigate(svc.link);
                    else if (svc.action === 'service') setTabIndex(1);
                    else window.location.href = 'tel:+918884170822';
                  }}
                >
                  {svc.cta} <ArrowForwardIcon fontSize="small" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section section--green">
        <div className="page-container">
          <div className="section-header section-header--light">
            <span className="section-badge section-badge--light">Simple Process</span>
            <h2 className="section-title section-title--light">How It Works</h2>
            <p className="section-subtitle section-subtitle--light">
              Getting started with Cycle2Go is quick and easy. Three simple steps and you're on the road.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-card__number">01</div>
              <div className="step-card__image">
                <img src="/images/undraw_browsing_urt9.svg" alt="Book online" />
              </div>
              <h3>Book Online</h3>
              <p>Choose your dates, pick your cycle, and complete the booking in minutes — right from your phone.</p>
              <Button
                variant="outlined"
                onClick={handleSearch}
                sx={{ borderColor: '#fff', color: '#fff', ':hover': { borderColor: '#ffad00', color: '#ffad00', bgcolor: 'transparent' } }}
              >
                Book Now
              </Button>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-card__number">02</div>
              <div className="step-card__image">
                <img src="/images/Ride_a_bicycle_2yok.svg" alt="Pickup" />
              </div>
              <h3>Pickup or Get Delivery</h3>
              <p>
                Collect the cycle from our store near Silk Board, or opt for home delivery (available for 3+ day rentals).
              </p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-card__number">03</div>
              <div className="step-card__image">
                <img src="/images/biking_kc4f.svg" alt="Ride" />
              </div>
              <h3>Ride &amp; Return</h3>
              <p>Enjoy your ride! Drop the cycle back at our store at the end of your rental period. Simple as that.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section section--light">
        <div className="page-container">
          <div className="section-header">
            <span className="section-badge">Our Promise</span>
            <h2 className="section-title">Why Choose Cycle2Go?</h2>
            <p className="section-subtitle">
              We go beyond just renting bicycles — we deliver an experience that keeps our customers coming back.
            </p>
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <div>
                  <h4 className="feature-card__title">{f.title}</h4>
                  <p className="feature-card__desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section section--grey">
        <div className="page-container">
          <div className="section-header">
            <span className="section-badge">Customer Stories</span>
            <h2 className="section-title">What Our Riders Say</h2>
            <p className="section-subtitle">
              Don't just take our word for it — hear from the cycling community that trusts us every day.
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} sx={{ color: '#ffad00', fontSize: 18 }} />
                  ))}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta-section">
        <div className="page-container">
          <div className="cta-inner">
            <div className="cta-text">
              <h2>Ready to Start Your Ride?</h2>
              <p>
                Join 500+ happy cyclists who trust Cycle2Go for their daily commute,
                weekend adventures, and more.
              </p>
            </div>
            <div className="cta-actions">
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/tariffs')}
                startIcon={<DirectionsBikeIcon />}
                sx={{
                  bgcolor: '#ffad00',
                  color: '#1b5e20',
                  fontWeight: 700,
                  fontSize: '1rem',
                  py: 1.5,
                  px: 3.5,
                  ':hover': { bgcolor: '#e69500' },
                }}
              >
                Browse All Cycles
              </Button>
              <a href="tel:+918884170822" className="cta-call-btn">
                <PhoneIcon /> +91 88841 70822
              </a>
              <a
                href="https://wa.me/918884170822"
                target="_blank"
                rel="noreferrer"
                className="cta-whatsapp-btn"
              >
                <WhatsAppIcon /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
