import { Autocomplete, Button, Card, CardContent, Container, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Tenant } from "../../pages/Tenant/interfaces/tenant";
import DatePicker from "../DatePicker";
import { useState, useRef, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import Receipt from "../Receipt";
import CloseIcon from '@mui/icons-material/Close';
import TenantService from "../../servises/Tenant";
import ReceiptsService from "../../servises/WidgetReceipts";
import dayjs from "dayjs";
import CreateIcon from '@mui/icons-material/Create';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import { useReactToPrint } from "react-to-print";

interface ReceiptData {
  ids: Array<Number>
  dt: Date
}

interface PopUpProps {
  data: ReceiptData
  onClose: () => void
}

const receipts2: Array<any> = [
  {
    id: 1,
  name: 'Чернышева Елена Георгиевна',
  accNum: 47,
  square: 82.3,
  tarif: 4.80,
  dept: 0.00,
  accrued: 999.00,
  paid: 0.0,
  total: 0.0,
},
{
  id: 2,
  name: 'Чернышева Елена Георгиевна',
  accNum: 47,
  square: 82.3,
  tarif: 4.80,
  dept: 0.00,
  accrued: 1000.00,
  paid: 0.0,
  total: 0.0,
},
{
  id: 3,
  name: 'Чернышева Елена Георгиевна',
  accNum: 47,
  square: 82.3,
  tarif: 4.80,
  dept: 0.00,
  accrued: 230.00,
  paid: 0.0,
  total: 0.0,
},
{
  id: 4,
  name: 'Чернышева Елена Георгиевна',
  accNum: 47,
  square: 82.3,
  tarif: 4.80,
  dept: 0.00,
  accrued: 100.00,
  paid: 0.0,
  total: 0.0,
}
];

const PopUp = ({ data, onClose }: PopUpProps) => {
  const { t } = useTranslation();
  const [receipts, setReceipts] = useState([]);
  const componentRef = useRef<HTMLDivElement>(null);

  const printHandle = useReactToPrint({
    content: () => componentRef.current as HTMLDivElement,
    documentTitle: t('receipt.title'),
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await ReceiptsService.getData({
        ...data,
        dt: dayjs(data.dt).format('YYYY-MM-DD'),
      });
      if (res.status === 'OK') {
        setReceipts(res.data);
      }
      if (res.status === 'FAIL') {
        onClose();
      }
    }
    fetchData();
  }, []);

  return (
    <Dialog
      fullScreen
      open={true}
      onClose={onClose}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>{t('widgets.receipt.dialog.title')}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 12,
          color: "grey",
        }}
       >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Container className="receipts" maxWidth="lg" ref={componentRef}>
          {receipts2.map((data: any) => (
            <Receipt tenant={data} dt={data.dt} />
          ))}
        </Container>
       </DialogContent>
       <DialogActions>
         <Button
          variant="contained"
          size="small"
          color="inherit"
          disabled={true}
          startIcon={<DownloadIcon />}
         >{t('btn.download')}</Button>
        <Button
          variant="contained"
          size="small"
          onClick={printHandle}
          startIcon={<PrintIcon />}
        >{t('btn.print')}</Button>
       </DialogActions>
    </Dialog>
  )
}

export default () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [ ids, setIds ] = useState([]);
  const [ dt, setDt ] = useState(new Date);

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await TenantService.getAll();
      if (res.status === "OK") {
        setTenants(res.data);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{ color: 'text.secondary'}}>
            {t('widgets.receipt.title')}
          </Typography>
          <Grid container size={12}>
            <Grid size={12} sx={{paddingTop: 2}}>
              <Autocomplete
                multiple
                disableCloseOnSelect
                limitTags={2}
                options={tenants}
                getOptionLabel={(opt: Tenant) => opt.name}
                onChange={(event, newValue: any) => {
                  setIds(newValue.map((item: any) => item.id));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder={t('widgets.receipt.tenant')}
                  />
                )}
              />
            </Grid>
            <Grid size={12} sx={{paddingTop: 2}}>
              <DatePicker
                label={t('widgets.receipt.month')}
                views={['month', 'year']}
                onChange={(item: any) => setDt(item)}
              />
            </Grid>
            <Grid size={12} sx={{paddingTop: 2}}>
              <Button
                variant="contained"
                size="small"
                onClick={handleOpen}
                startIcon={<CreateIcon />}
              >{t('widgets.receipt.buttons.create')}</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {open && (
        <PopUp data={{ids, dt}} onClose={handleClose}></PopUp>
      )}
    </>
  )
}
