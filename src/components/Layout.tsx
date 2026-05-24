import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { CircularProgress, Box } from '@mui/material';

const Layout: React.FC = () => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <section style={{ minHeight: '60vh' }}>
        {showSpinner && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default Layout;
