import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";


const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} sx={{
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 64px)',
    }}>
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('greeting', { name: 'admin' })}
        </Typography>
      </Box>
    </Grid>
  );
}

export default DashboardPage;
