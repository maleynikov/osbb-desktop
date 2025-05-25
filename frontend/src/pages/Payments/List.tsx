import { Box, Button, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import PaymentsTable from './components/Table'
import PaymentsService from "../../servises/Payments";
import dayjs from 'dayjs';
import { GridRowId, GridRowSelectionModel } from "@mui/x-data-grid";
import DelRecordsBtn from "../Tenant/components/DelRecordsBtn";

export default () => {
  const [rows, setRows] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const { t } = useTranslation();
  const nav = useNavigate();
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);

  const onRefetch = () => {
    setTrigger(prev => prev + 1);
  }

  const onSubmit = async (ids: Array<Number>) => {
    return await PaymentsService.delete(ids);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await PaymentsService.getAll();
        if (res.status === 'OK') {
          if (res.data === null) {
            setRows([]);
            return;
          }
          setRows(res.data.map((item: any) => {
            return {
              ...item,
              created_at: dayjs(item.created_at).format('YYYY-MM-DD HH:mm'),
            }
          }));
        }
      } catch (error) {
        console.error('error fetching data:', error);
      }
    };
    fetchData();
  }, [trigger]);

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
          {t('payments.title')}
        </Typography>
        <div className="actions-area">
          {selectedIds.length > 0 && (
            <DelRecordsBtn
              ids={selectedIds.map(id => Number(id))}
              onRefresh={onRefetch}
              onSubmit={onSubmit}
            />
          )}
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => nav('/payments/0/edit')}
          >{t('payments.add')}</Button>
        </div>
      </Box>
      <PaymentsTable rows={rows} onRowSelection={(selection: GridRowSelectionModel) => {
        setSelectedIds(Array.from(selection.ids));
      }}/>
    </Box>
  );
}