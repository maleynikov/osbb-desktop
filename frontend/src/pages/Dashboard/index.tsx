import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  WidgetPayments,
  WidgetReceipt,
} from "../../components/widgets";

export default () => {
  const { t } = useTranslation();

  return (
    <Grid container
      direction="column"
      sx={{
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Grid size={12}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Typography variant="h5" gutterBottom>
            {t('dashboard.widgets')}
          </Typography>
        </Box>
      </Grid>
      <Grid container
        direction="row"
        size={12}
        spacing={2}
      >
        <Grid size={6}>
          <WidgetPayments period={{to: new Date()}}/>
        </Grid>
        <Grid size={6}>
          <WidgetReceipt />
        </Grid>
      </Grid>
    </Grid>
  );
}
