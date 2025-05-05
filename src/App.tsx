import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './context/authProvider';
import AddPaymentMethod from './pages/AddPaymentMethod';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Layout from './pages/Layout';
import PaymentMethods from './pages/PaymentMethods';
import ProtectedRoute from './shared/component/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/payment-methods" element={<PaymentMethods />} />
            <Route path="/dashboard/add-payment-method" element={<AddPaymentMethod />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
