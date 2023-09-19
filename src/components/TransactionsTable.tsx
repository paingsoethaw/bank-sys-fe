import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Transaction } from '../features/users/userSlice';

interface ITransactionsProps {
  transactions?: Array<Transaction>;
}

export default function TransactionsTable(props: ITransactionsProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Transaction Type</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Amount</strong>
            </TableCell>
            <TableCell>
              <strong>Remark</strong>
            </TableCell>
            <TableCell>
              <strong>Date</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.transactions &&
            props.transactions.map((row: Transaction, index: number) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="right" style={{ color: row.type == 'DEPOSIT' ? 'green' : 'red' }}>
                  {row.amount}
                </TableCell>
                <TableCell>{row.remark}</TableCell>
                <TableCell>{dayjs(row.date).format('YYYY-MM-DD HH:mm:ss A')}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
