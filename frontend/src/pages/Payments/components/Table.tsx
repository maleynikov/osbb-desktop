import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import i18n from '../../../i18n';

export interface PaymentsTableProps {
  rows: any;
  onRowSelection: (selection: GridRowSelectionModel) => void;
}

const defColumnOptions = {
  sortable: true,
  disableColumnMenu: true,
  flex: 1,
}

const columns: GridColDef[] = [
  { 
    field: 'id',
    headerName: i18n.t('payments.tbl_header.id'),
    ...defColumnOptions,
  },
  {
    field: 'tenant_name',
    headerName: i18n.t('payments.tbl_header.tenant_name'),
    ...defColumnOptions,
  },
  {
    field: 'tenant_acc',
    headerName: i18n.t('payments.tbl_header.tenant_acc'),
    ...defColumnOptions,
  },
  {
    field: 'period',
    headerName: i18n.t('payments.tbl_header.period'),
    ...defColumnOptions,
  },
  {
    field: 'amount',
    headerName: i18n.t('payments.tbl_header.amount'),
    ...defColumnOptions,
  },
  {
    field: 'created_at',
    headerName: i18n.t('payments.tbl_header.created_at'),
    ...defColumnOptions,
  },
];

export default (props: PaymentsTableProps) => {
  return (
    <>
      <DataGrid
        rows={props.rows}
        columns={columns}
        checkboxSelection
        pageSizeOptions={[10, 25, 50, 100]}
        sx={{maxHeight: 'calc(100vh - 200px)'}}
        onRowSelectionModelChange={props.onRowSelection}
      />
    </>
  );
}
