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
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );

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

  const brandOptions = ['Atlas', 'Hero', 'Trek', 'BTWIN', 'Scott', 'Firefox'];

  return (
    <>
      {/* Hero unit */}
      <div className="hero">
        <div className="hero__inner">
          <div className="container">
            <div className="hero__content">
              <div id="navConverter">
                <br />
                <Box sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
                  <Tabs
                    value={tabIndex}
                    onChange={(_, v) => setTabIndex(v)}
                    centered
                  >
                    <Tab
                      label={
                        <h3>
                          <b>Bicycles on Rent</b>
                        </h3>
                      }
                    />
                    <Tab
                      label={
                        <h3>
                          <b>Bicycle Servicing</b>
                        </h3>
                      }
                    />
                  </Tabs>

                  {tabIndex === 0 && (
                    <Box className="tab-content-box">
                      <TextField
                        label="Start Date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          min: new Date().toISOString().split('T')[0],
                        }}
                        sx={{ m: 1 }}
                      />
                      <TextField
                        label="End Date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: startDate }}
                        sx={{ m: 1 }}
                      />
                      <Button
                        variant="contained"
                        onClick={handleSearch}
                        startIcon={<SearchIcon />}
                        sx={{ m: 1, bgcolor: 'orange', ':hover': { bgcolor: '#e69500' } }}
                      >
                        Search
                      </Button>
                    </Box>
                  )}

                  {tabIndex === 1 && (
                    <Box className="tab-content-box">
                      <Autocomplete
                        options={brandOptions}
                        value={brand || null}
                        onChange={(_, val) => setBrand(val || '')}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Your Bicycle Brand"
                            sx={{ width: 150, m: 1 }}
                          />
                        )}
                        freeSolo
                        onInputChange={(_, val) => setBrand(val)}
                      />
                      <TextField
                        label="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        sx={{ width: 150, m: 1 }}
                      />
                      <RadioGroup
                        row
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                        sx={{ m: 1 }}
                      >
                        <FormControlLabel
                          value="Non-Gear"
                          control={<Radio />}
                          label="Non-Gear (Rs. 700/-)"
                        />
                        <FormControlLabel
                          value="Gear"
                          control={<Radio />}
                          label="Gear (Rs. 1200/-)"
                        />
                      </RadioGroup>
                      <Button
                        variant="contained"
                        onClick={handleBookServicing}
                        startIcon={<BuildIcon />}
                        sx={{ m: 1, bgcolor: 'orange', ':hover': { bgcolor: '#e69500' } }}
                      >
                        Book Servicing
                      </Button>
                    </Box>
                  )}
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="steps landing__section">
        <div className="container">
          <h2>How it works?</h2>
          <p>For Bulk Booking Please Contact Us On +91 8884170822</p>
        </div>
        <div className="container">
          <div className="steps__inner">
            <div className="step">
              <div className="step__media">
                <img
                  src="/images/undraw_browsing_urt9.svg"
                  className="step__image"
                  alt="Book"
                />
              </div>
              <h4>Book the Cycle</h4>
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{ bgcolor: 'orange', ':hover': { bgcolor: '#e69500' } }}
              >
                Click here to Book
              </Button>
            </div>
            <div className="step">
              <div className="step__media">
                <img
                  src="/images/Ride_a_bicycle_2yok.svg"
                  className="step__image"
                  alt="Pickup"
                />
              </div>
              <h4>Pickup from our Location</h4>
              <small>
                <i>
                  (Delivery &amp; Pickup available for minimum 3 days of
                  booking)
                </i>
              </small>
            </div>
            <div className="step">
              <div className="step__media">
                <img
                  src="/images/biking_kc4f.svg"
                  className="step__image"
                  alt="Drop"
                />
              </div>
              <h4>Drop at our Location</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
