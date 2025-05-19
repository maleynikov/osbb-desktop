import { Box, Typography } from "@mui/material";
import { ReceiptOrigin } from "./components/ReceiptOrigin";
import { useTranslation } from "react-i18next";

const ReceiptPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{
      padding: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant="h5" gutterBottom>
          {t('receipt.title_example')}
        </Typography>
      </Box>
      <ReceiptOrigin />
    </Box>
  );
}

export default ReceiptPage;
