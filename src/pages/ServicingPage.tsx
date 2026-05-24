import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Drawer,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { ServicingCustomer } from '../models/ServicingCustomer';

const ServicingPage: React.FC = () => {
  const { brand: brandParam, model: modelParam, speed: speedParam } = useParams();
  const navigate = useNavigate();

  const [brand, setBrand] = useState(brandParam || '');
  const [model, setModel] = useState(modelParam || '');
  const [gearType, setGearType] = useState(speedParam || '');
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    setBrand(brandParam || '');
    setModel(modelParam || '');
    setGearType(speedParam || '');
  }, [brandParam, modelParam, speedParam]);

  const handleConfirm = async () => {
    const colRef = collection(db, 'cycle2go/servicing/enquiry');
    const cust: ServicingCustomer = {
      brand,
      model,
      gearType,
      name,
      contactNo,
      email,
      address,
      comment,
    };
    await addDoc(colRef, cust);
    alert('Thank You! Our Technician Will reach you for further assistance');
    navigate('/home');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: 1, p: 2 }}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <b>Contact Details:</b>
            <br />
            <TextField
              label="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              label="Phone No."
              required
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ m: 1 }}
            />
            <br />
            <TextField
              label="Pickup & Drop Address"
              multiline
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ m: 1, width: 400 }}
            />
            &nbsp;
            <small>
              <i>Note: Free Pickup and Drop Facility</i>
            </small>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <b>Cycle Details:</b>
            <br />
            <b>Brand: </b>
            {brand} &nbsp;&nbsp;&nbsp;
            <b>Model: </b>
            {model} &nbsp;&nbsp;&nbsp;
            <b>Gear Type: </b>
            {gearType}
            <br />
            <TextField
              label="Mention Any Other Issues or Requirements"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ m: 1, width: 400 }}
            />
            &nbsp;
            <small>
              <i>
                Note: If any spare parts required then it will cost extra as per
                MRP
              </i>
            </small>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color="error"
              endIcon={<ArrowRightIcon />}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </CardContent>
        </Card>
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
        <Card sx={{ m: 1 }}>
          <CardContent>
            <b>Servicing Includes:</b>
            <ul style={{ fontSize: '0.85rem', paddingLeft: 20 }}>
              <li>Gear Tune up</li>
              <li>Hubs Checkup</li>
              <li>Alignment of Headset</li>
              <li>Bottom Bracket Checkup</li>
              <li>Check and adjust brakes</li>
              <li>Check and Lube Chain</li>
              <li>Check and Lube Cables</li>
              <li>Wipe clean the bicycle</li>
              <li>Wheel Truing (Not wheel bend)</li>
              <li>Check tyres &amp; inflate to correct pressure</li>
              <li>Checking and Tightening all screws and bolts</li>
              <li>
                Dismantle of Hubs, Center Bracket and Headset.
              </li>
            </ul>
          </CardContent>
        </Card>
      </Drawer>
    </Box>
  );
};

export default ServicingPage;
