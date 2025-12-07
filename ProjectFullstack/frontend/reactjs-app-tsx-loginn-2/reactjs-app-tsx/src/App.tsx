
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import './components/bootstrap/App.css';
import AccountPage from './pages/account/AccountPage';
import DepartmentPage from './pages/department/DepartmentPage';
import LoginPage from './components/LoginPage';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';
import MainLayout from './components/MainLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  return (
    <AuthProvider>
      < BrowserRouter >
        <Routes>

          {/* Default redirect - Khi truy cập "/", chuyển về /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public page - Trang login không cần JWT */}
          <Route path="/login" element={<LoginPage />} />

          {/* Các trang bên dưới cần JWT */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <MainLayout />
              </RequireAuth>
            }
          >
            <Route path="accounts" element={<AccountPage />} />
            <Route path="departments" element={<DepartmentPage />} />
          </Route>

        </Routes >
      </BrowserRouter >
    </AuthProvider>

  );
}

export default App;
