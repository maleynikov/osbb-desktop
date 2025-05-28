import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';


const ProfileMenu = () => {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => auth?.onLogout();
  const { t } = useTranslation();
  const nav = useNavigate();

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          setAnchorEl(null);
          nav('/receipt')
        }}>{t('receipt.title_example')}</MenuItem>
        <MenuItem onClick={handleLogout}>{t('sign_out')}</MenuItem>
      </Menu>
    </Box>
  );
}

export default ProfileMenu;
