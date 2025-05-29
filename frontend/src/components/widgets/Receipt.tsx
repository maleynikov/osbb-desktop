import { Autocomplete, Button, Card, CardContent, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Tenant } from "../../pages/Tenant/interfaces/tenant";
import DatePicker from "../DatePicker";
import { useState, useRef, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import { ReceiptOrigin } from "../../pages/Receipt/components/ReceiptOrigin";
import CloseIcon from '@mui/icons-material/Close';
import TenantService from "../../servises/Tenant";
import ReceiptsService from "../../servises/WidgetReceipts";
import dayjs from "dayjs";

interface ReceiptData {
  ids: Array<Number>
  dt: Date
}

interface PopUpProps {
  data: ReceiptData
  onClose: () => void
}

// const data: Array<ReceiptData> = [
//   {
//     id: 1,
//   name: 'Чернышева Елена Георгиевна',
//   accountNum: 47,
//   appNum: 47,
//   square: 82.3,
//   tarif: 4.80,
// },
// {
//   id: 2,
//   name: 'Чернышева Елена Георгиевна',
//   accountNum: 47,
//   appNum: 47,
//   square: 82.3,
//   tarif: 4.80,
// },
// {
//   id: 3,
//   name: 'Чернышева Елена Георгиевна',
//   accountNum: 47,
//   appNum: 47,
//   square: 82.3,
//   tarif: 4.80,
// }
// ];

const PopUp = ({ data, onClose }: PopUpProps) => {
  const { t } = useTranslation();
  const [receipts, setReceipts] = useState([]);

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
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scr"
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
        <div className="receipts">
          {receipts.map((data: any) => (
            <ReceiptOrigin data={data}/>
          ))}
        </div>
       </DialogContent>
       <DialogActions>
         <Button
          variant="contained"
          size="small"
          color="inherit"
          onClick={onClose}
         >{t('btn.cancel')}</Button>
        <Button
          variant="contained"
          size="small"
          onClick={onClose}
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
