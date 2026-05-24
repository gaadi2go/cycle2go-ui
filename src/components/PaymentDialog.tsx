import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  name: string;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onClose,
  name,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Payment Successful</DialogTitle>
      <DialogContent>
        <h3>Hi {name}</h3>
        <p>
          Your booking has been Confirmed. Please carry the ID proof while
          picking the cycle/s
        </p>
        <p>
          Pickup Location:{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://goo.gl/maps/Frjx9wDEfKK2"
          >
            https://goo.gl/maps/Frjx9wDEfKK2
          </a>
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;
