import { Box, Button, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import TenantService from '../../servises/Tenant';

const defColumnOptions = {
  sortable: true,
  disableColumnMenu: true,
}

const paginationModel = { page: 0, pageSize: 10 };

const columns: GridColDef[] = [
  { 
    field: 'id',
    headerName: 'ID',
    ...defColumnOptions,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 300,
    ...defColumnOptions,
  },
  {
    field: 'account_num',
    headerName: 'Account Number',
    ...defColumnOptions,
  },
  {
    field: 'square',
    headerName: 'Square',
    type: 'number',
    ...defColumnOptions,
  },
  {
    field: 'tarif',
    headerName: 'Tarif',
    type: 'number',
    ...defColumnOptions,
  },
];

const TenantListPage = () => {
  const [rows, setRows] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await TenantService.getAll()
        setRows(res.data);
      } catch (error) {
        console.error('error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
        marginBottom: 2,
      }}>
        <Typography variant="h5" gutterBottom>
          {t('tenants.list')}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
        >{t('tenants.add')}</Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10]}
        sx={{maxHeight: 'calc(100vh - 200px)'}}
      />
    </Box>
  );
}

export default TenantListPage;
