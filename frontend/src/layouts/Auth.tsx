import { Container, Typography, Link, Grid } from "@mui/material";
import { Outlet } from "react-router";


const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/maleynikov/osbb-desktop">
        OSBB. Desctop App
      </Link>{' 💖 '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const AuthLayout = () => {
  return (
    <Container component="main">
      <Outlet />
      <Copyright sx={{ mt: 2, mb: 2}} />
    </Container>
  );
};

export default AuthLayout;
