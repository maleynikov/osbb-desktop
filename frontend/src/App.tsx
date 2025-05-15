import { ThemeProvider, createTheme } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { Route, Routes, Navigate } from 'react-router';
import AuthLayout from './layouts/Auth';
import LoginPage from './pages/Login';


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
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route index element={<Navigate to="login" />} />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
