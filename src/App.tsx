import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './context/authProvider';
import AddPaymentMethod from './pages/AddPaymentMethod';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Layout from './pages/Layout';
import PaymentMethodContainer from './pages/PaymentMethodContainer';
import ProtectedRoute from './shared/component/ProtectedRoute';
import CategoriesContainer from './pages/CategoriesContainer';
import AddCategory from './pages/AddCategory';
import BudgetGoalContainer from './pages/BudgetGoalsContainer';
import AddBudgetGoal from './pages/AddBudgetGoal';

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
            <Route path="/dashboard/category-list" element={<CategoriesContainer />} />
            <Route path="/dashboard/add-category" element={<AddCategory />} />
            <Route path="/dashboard/add-category/:categoryId" element={<AddCategory />} />
            <Route path="/dashboard/payment-methods" element={<PaymentMethodContainer />} />
            <Route path="/dashboard/add-payment-method" element={<AddPaymentMethod />} />
            <Route path="/dashboard/add-payment-method/:id" element={<AddPaymentMethod />} />
            <Route path="/dashboard/budget-goals" element={<BudgetGoalContainer />} />
            <Route path="/dashboard/add-budget-goal" element={<AddBudgetGoal />} />
            {/* add-budget-goal */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
