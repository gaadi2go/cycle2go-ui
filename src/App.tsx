import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TariffsPage from './pages/TariffsPage';
import AuthPage from './pages/AuthPage';
import SearchPage from './pages/SearchPage';
import CycleDetailsPage from './pages/CycleDetailsPage';
import ShoppingListPage from './pages/ShoppingListPage';
import MyBookingsPage from './pages/MyBookingsPage';
import FaqPage from './pages/FaqPage';
import ServicingPage from './pages/ServicingPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    secondary: {
      main: '#ffad00',
      dark: '#e69500',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica Neue", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' as const },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/tariffs" element={<TariffsPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/search/:startDate/:endDate" element={<SearchPage />} />
              <Route path="/cycle-details/:id" element={<CycleDetailsPage />} />
              <Route path="/shopping-list/:startDate/:endDate" element={<ShoppingListPage />} />
              <Route path="/my-bookings" element={<MyBookingsPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/servicing/:brand/:model/:speed" element={<ServicingPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
