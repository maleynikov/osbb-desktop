import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Tenant } from '../interfaces/tenant';
import { t } from 'i18next';

const TenantTable = ({ tenants }: { tenants: Array<Tenant> }) => {
  return (
    <Box>
      <TableContainer component={Paper}>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">{t('id2')}</TableCell>
              <TableCell align="right" component="th">Name</TableCell>
              <TableCell align="right" component="th">Account Num</TableCell>
              <TableCell align="right" component="th">Squere</TableCell>
              <TableCell align="right" component="th">Tarif</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {tenants.map((tenant: Tenant) => (
            <TableRow
              key={tenant.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{tenant.id}</TableCell>
              <TableCell align="right">{tenant.name}</TableCell>
              <TableCell align="right">{tenant.account_num}</TableCell>
              <TableCell align="right">{tenant.square}</TableCell>
              <TableCell align="right">{tenant.tarif}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tenants.length}
        rowsPerPage={5}
        page={0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Box>
  );
}

export { TenantTable };
