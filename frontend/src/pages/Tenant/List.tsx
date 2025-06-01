import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import TenantService from '../../servises/Tenant';
import { useNavigate } from 'react-router';
import DelRecordsBtn from './components/DelRecordsBtn';
import i18n from '../../i18n';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

const defColumnOptions = {
  sortable: true,
  disableColumnMenu: true,
  flex: 1,
}

const paginationModel = { page: 0, pageSize: 10 };

export default () => {
  const [rows, setRows] = useState([]);
  const { t } = useTranslation();
  const nav = useNavigate();
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);
  const [trigger, setTrigger] = useState(0);

  const onRefetch = () => {
    setTrigger(prev => prev + 1);
  };

  const onSubmit = async (ids: Array<Number>) => {
    return await TenantService.delete(ids);
  }

  const columns: GridColDef[] = [
    { 
      field: 'id',
      headerName: i18n.t('tenants.tbl_header.id'),
      ...defColumnOptions,
    },
    {
      field: 'name',
      headerName: i18n.t('tenants.tbl_header.name'),
      ...defColumnOptions,
    },
    {
      field: 'account_num',
      headerName: i18n.t('tenants.tbl_header.acc'),
      ...defColumnOptions,
    },
    {
      field: 'square',
      headerName: i18n.t('tenants.tbl_header.square'),
      type: 'number',
      ...defColumnOptions,
    },
    {
      field: 'tarif',
      headerName: i18n.t('tenants.tbl_header.tarif'),
      type: 'number',
      ...defColumnOptions,
    },
    {
      field: 'dept',
      headerName: i18n.t('tenants.tbl_header.dept'),
      type: 'number',
      ...defColumnOptions,
    },
    {
      field: 'actions',
      headerName: i18n.t('tenants.tbl_header.actions'),
      type: 'actions',
      ...defColumnOptions,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label={i18n.t('common.edit')}
          onClick={() => nav(`/tenants/${params.id}/edit`)}
          showInMenu={false}
        />
      ],
    },
  ];

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
        marginBottom: 2,
      }}>
        <Typography variant="h5" gutterBottom>
          {t('tenants.list')}
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
              onClick={() => nav('/tenants/0/edit')}
            >{t('tenants.add')}</Button>
        </div>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10]}
        sx={{maxHeight: 'calc(100vh - 200px)'}}
        onRowSelectionModelChange={(selection: GridRowSelectionModel) => {
          setSelectedIds(Array.from(selection.ids));
        }}
      />
    </Box>
  );
}
