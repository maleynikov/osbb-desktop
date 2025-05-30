import { Box, Button, Container, Typography } from "@mui/material";
import { ReceiptOrigin } from "./components/ReceiptOrigin";
import { useTranslation } from "react-i18next";
import PrintIcon from '@mui/icons-material/Print';
import { useRef } from 'react';
import { useReactToPrint } from "react-to-print";

const printTest = true;

const ReceiptPage = () => {
  const { t } = useTranslation();
  const componentRef = useRef<HTMLDivElement>(null);

  const data =  {
    name: 'Чернышева Елена Георгиевна',
    accountNum: 47,
    appNum: 47,
    square: 82.3,
    tarif: 4.80,
  };

  const printHandle = useReactToPrint({
    content: () => componentRef.current as HTMLDivElement,
    documentTitle: t('receipt.title_example'),
  });

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
        <Button
          onClick={printHandle}
          color="inherit"
          disabled={!printTest}>
          <PrintIcon />
        </Button>
      </Box>
      <Box ref={componentRef}>
        <ReceiptOrigin data={data}/>
      </Box>
    </Box>
  );
}

export default ReceiptPage;
