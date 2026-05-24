import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CircularProgress,
  Box,
  Grid,
} from '@mui/material';
import { getCycleById } from '../services/cycleService';
import { Cycle } from '../models/Cycle';

const CycleDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cycle, setCycle] = useState<Cycle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getCycleById(id).then((data) => {
      setCycle(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!cycle) {
    return <p style={{ padding: 20 }}>Cycle not found</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={`${cycle.brand} ${cycle.model}`}
              subheader={cycle.description}
            />
            <CardMedia
              component="img"
              image={`https://firebasestorage.googleapis.com/v0/b/gaadi2go-22.appspot.com/o/cycles%2F${cycle.productID}.jpg?alt=media&token=c55239e6-90c4-450f-9f60-07b40f0ac843`}
              alt={cycle.description}
              sx={{ objectFit: 'contain', maxHeight: 400 }}
            />
            <CardContent>
              <p>
                Rs. {cycle.dailyPrice}/Day
                <br />
                Rs. {cycle.weekPlus}/Day for 7+ Days
                <br />
                Rs. {cycle.twoWeekPlus}/Day for 15+ Days
                <br />
                Rs. {cycle.monthPlus}/Day for 30+ Days
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CycleDetailsPage;
