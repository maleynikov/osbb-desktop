import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';


interface Tenant {
  id: string;
  name: string;
  account_num: string;
  square: string;
  tarif: string;
}

const TenantListPage = () => {
  const tenats: Array<Tenant> = [
    {
      id: "1",
      name: "Tenant 1",
      account_num: "1234567890",
      square: "100",
      tarif: "1000",
    },
    {
      id: "2",
      name: "Tenant 2",
      account_num: "0987654321",
      square: "200",
      tarif: "2000",
    },
  ];

  const TenantList = tenats.map((tenant) => (
    <div key={tenant.id}>
      <h2>{tenant.name}</h2>
      <p>Account Number: {tenant.account_num}</p>
      <p>Square: {tenant.square}</p>
      <p>Tarif: {tenant.tarif}</p>
    </div>
  ));

  return (
    <Box sx={{ padding: 2, backgroundColor: '' }}>
      <Typography variant="h5" gutterBottom>
        Tenant List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Account Num</TableCell>
              <TableCell align="right">Squere</TableCell>
              <TableCell align="right">Tarif</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {tenats.map((tenant) => (
            <TableRow
              key={tenant.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{tenant.id}</TableCell>
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
        count={tenats.length}
        rowsPerPage={5}
        page={0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Box>
  );
}

export default TenantListPage;
