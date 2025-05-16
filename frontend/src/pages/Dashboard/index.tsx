import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";


const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t('dashboard')}
      </Typography>
      <Typography variant="body1">
        {t('dashboard_title')}
      </Typography>
    </Box>
  );
}

export default DashboardPage;
