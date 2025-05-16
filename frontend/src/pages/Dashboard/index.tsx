import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";


const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('greeting', { name: 'User' })}
      </Typography>
    </Box>
  );
}

export default DashboardPage;
