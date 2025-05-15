import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Navigate, Outlet } from "react-router";
import ProfileMenu from "../components/widgets/ProfileMenu";
import { useAuth } from "../hooks/useAuth";

const MainLayout = () => {
  const auth = useAuth();

  if (!auth?.isLogged()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            OSBB <small>v0.0.1</small>
          </Typography>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default MainLayout;
