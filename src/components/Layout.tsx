import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { CircularProgress, Box } from '@mui/material';

const Layout: React.FC = () => {
  const [showSpinner, setShowSpinner] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setShowSpinner(true);
    const timer = setTimeout(() => setShowSpinner(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/home' || location.pathname === '/';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: isHomePage ? 0 : '64px' }}>
        {showSpinner ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress sx={{ color: '#2e7d32' }} />
          </Box>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
