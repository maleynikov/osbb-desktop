import { Container, Typography, Link, Grid } from "@mui/material";
import { Outlet } from "react-router";


const Copyright = (props: any) => {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/maleynikov/osbb-desktop/">
          OSBB. Desktop App
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
        💖 <Link color="inherit" href="https://wails.io/">Wails</Link>
      </Typography>
    </>
  );
}

const AuthLayout = () => {
  return (
    <Container component="main">
      <Outlet />
      <Copyright sx={{ mt: 2, mb: 2}} />
    </Container>
  );
}

export default AuthLayout;
