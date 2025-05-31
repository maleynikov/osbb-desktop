import { Autocomplete, Button, Card, CardContent, Container, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Tenant } from "../../pages/Tenant/interfaces/tenant";
import DatePicker from "../DatePicker";
import { useState, useRef, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import Receipt from "../Receipt";
import CloseIcon from '@mui/icons-material/Close';
import TenantService from "../../servises/Tenant";
import CreateIcon from '@mui/icons-material/Create';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import { useReactToPrint } from "react-to-print";
import { useReceipts } from "../../hooks/widgets/useReceipts";
import dayjs from "dayjs";

interface ReceiptData {
  ids: Array<number>
  dt: Date
}

interface PopUpProps {
  data: ReceiptData
  onClose: () => void
}

const PopUp = ({ data , onClose }: PopUpProps) => {
  const { t } = useTranslation();
  const { data: receipts = [] } = useReceipts(data);
  const componentRef = useRef<HTMLDivElement>(null);

  const printHandle = useReactToPrint({
    content: () => componentRef.current as HTMLDivElement,
    documentTitle: t('receipt.title'),
  });

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
          {receipts.map((data: any) => (
            <Receipt key={data.id} tenant={data} dt={data.dt} />
          ))}
          {receipts.length === 0 && (
            <center>{t('no_records')}</center>
          )}
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
                defaultValue={dayjs()}
              />
            </Grid>
            <Grid size={12} sx={{paddingTop: 2}}>
              <Button
                variant="contained"
                size="small"
                onClick={handleOpen}
                startIcon={<CreateIcon />}
                disabled={ids.length === 0}
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
