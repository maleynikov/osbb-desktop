import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router";
import ProfileMenu from "../components/widgets/ProfileMenu";
import { useAuth } from "../hooks/useAuth";
import pages, { Page } from "../pages";
import { hash } from "../utils/hash";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router';


const MainLayout = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const { t } = useTranslation()

  if (!auth?.isLogged()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <Typography
            variant="h6"  
            noWrap
            component={Link}
            to="/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >OSBB</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page: Page) => (
              <Button
                key={hash(page.path)}
                onClick={() => nav(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >{t(page.name)}</Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ProfileMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default MainLayout;
