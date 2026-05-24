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
      main: '#3f51b5', // indigo
    },
    secondary: {
      main: '#ff4081', // pink
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
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
