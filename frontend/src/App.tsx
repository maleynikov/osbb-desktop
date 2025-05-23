import { ThemeProvider, createTheme } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { Route, Routes, Navigate } from 'react-router';
import AuthLayout from './layouts/Auth';
import LoginPage from './pages/Login';
import MainLayout from './layouts/Main';
import DashboardPage from './pages/Dashboard';
import { AuthProvider } from './hooks/useAuth';
import ProfileLayout from './layouts/Profile';
import SettingsPage from './pages/Settings';
import ReceiptPage from './pages/Receipt';

import {
  TenantsListPage,
  TenantsEditPage,
  PaymentsListPage,
  PaymentsEditPage,
} from './pages';


const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[800],
    },
  },
});

function App() {
  return (
    <div id="app">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes>
              <Route element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
              </Route>
              <Route element={<MainLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="tenants">
                  <Route path="list" element={<TenantsListPage />} />
                  <Route path=":tid/edit" element={<TenantsEditPage />} />
                </Route>
                <Route path="payments">
                  <Route path="list" element={<PaymentsListPage />} />
                  <Route path=":pid/edit" element={<PaymentsEditPage />} />
                </Route>
                <Route path="receipt" element={<ReceiptPage />} />
              </Route>
              <Route element={<ProfileLayout />}>
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              <Route index element={<Navigate to="login" />} />
            </Routes>
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
