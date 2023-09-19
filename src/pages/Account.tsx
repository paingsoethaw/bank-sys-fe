import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useAppDispatch, useAppSelector } from '../hooks';
import { User, Transaction, createTransaction, userSelector } from '../features/users/userSlice';
import TransactionsTable from '../components/TransactionsTable';

function Account() {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(userSelector);

  const [userDetails, setUserDetails] = useState<User>();

  const [userTransactions, setUserTransactions] = useState<Array<Transaction>>();
  const [balance, setBalance] = useState<number>(0);
  const [transactionType, setTransactionType] = useState<string>('DEPOSIT');
  const [transactionAmount, setTransactionAmount] = useState<number>(0);
  const [remark, setRemark] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setUserDetails(selectedUser);
    setUserTransactions(selectedUser.transactions);
    setBalance(selectedUser.balance);
    return () => {};
  }, [selectedUser]);

  const handleFormSubmit = () => {
    if (!balance) return;

    let updatedBalance: number = 0;

    if (transactionType == 'DEPOSIT') {
      updatedBalance = balance + transactionAmount;
    }
    if (transactionType == 'WITHDRAWAL') {
      updatedBalance = balance - transactionAmount;
    }
    const transactionDate = new Date();
    const transactionPayload: Transaction = {
      type: transactionType,
      amount: transactionAmount,
      updatedBalance: updatedBalance,
      date: transactionDate.toString(),
      remark: remark
    };

    dispatch(createTransaction(transactionPayload));
    clearForm();
    setIsFormOpen(false);
  };

  const clearForm = () => {
    setTransactionAmount(0);
    setRemark('');
  };

  const handleFormClose = () => {
    clearForm();
    setIsFormOpen(false);
  };

  return (
    <div>
      <div>
        <h4>Hi {userDetails?.name}!</h4>
        Account No: <strong>{userDetails?.accountNo}</strong>
        <br />
        Email: <strong>{userDetails?.email}</strong>
        <br />
        Balance: <strong> SGD {balance}</strong>
      </div>

      <br />
      <div>
        <Button
          variant="contained"
          onClick={() => {
            setTransactionType('DEPOSIT');
            setIsFormOpen(true);
          }}
        >
          Deposit
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          onClick={() => {
            setTransactionType('WITHDRAWAL');
            setIsFormOpen(true);
          }}
        >
          Withdraw
        </Button>
      </div>
      <br />
      <br />
      <br />

      <div>
        <h4>Transactions</h4>
        {userTransactions && userTransactions.length > 0 && <TransactionsTable transactions={userDetails?.transactions} />}
        
        {!userTransactions || userTransactions.length < 1 && <span>No Transaction</span>}
      </div>

      <Dialog open={isFormOpen} onClose={handleFormClose}>
        <DialogTitle>{transactionType}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="transactionAmount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={transactionAmount}
            onChange={(e) => {
              if (!e.target.value) return;
              setTransactionAmount(parseInt(e.target.value));
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="remark"
            label="Remark"
            type="text"
            fullWidth
            variant="standard"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>
            {transactionType == 'DEPOSIT' ? 'Deposit' : 'Withdraw'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Account;
