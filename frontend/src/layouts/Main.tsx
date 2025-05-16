import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router";
import ProfileMenu from "../components/widgets/ProfileMenu";
import { useAuth } from "../hooks/useAuth";


const pages = [
  { name: "Tenants", path: "/tenants/list", enabled: true },
  { name: "Receipt", path: "/receipt", enabled: false },
];

const MainLayout = () => {
  const auth = useAuth();
  const nav = useNavigate();

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
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            OSBB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => nav(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
                disabled={page.enabled === false}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ProfileMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default MainLayout;
