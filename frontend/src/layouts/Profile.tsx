import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet, useNavigate } from "react-router";
import LanguageIcon from '@mui/icons-material/Language';
import type { Navigation } from '@toolpad/core';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PrintIcon from '@mui/icons-material/Print';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import CurrencyIcon from '@mui/icons-material/CurrencyBitcoin';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

const BRANDING = {
  title: 'Settings App',
};

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'page-0',
    title: 'General',
    icon: <DashboardIcon />,
  },
  {
    segment: 'page-1',
    title: 'Printable',
    icon: <PrintIcon />,
  },
  {
    segment: 'page-2',
    title: 'Language',
    icon: <LanguageIcon />,
  },
  {
    segment: 'page-3',
    title: 'Currency',
    icon: <CurrencyIcon />,
  },
];

const ToolbarActions = () => {
  const nav = useNavigate();

  return (
    <>
      <Button onClick={() => nav('/dashboard')}>
        <LogoutIcon />
      </Button>
    </>
  )
}

export default () => {
  return (
    <ReactRouterAppProvider branding={BRANDING} navigation={NAVIGATION}>
      <DashboardLayout slots={{
        toolbarActions: ToolbarActions,
      }} defaultSidebarCollapsed>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}
