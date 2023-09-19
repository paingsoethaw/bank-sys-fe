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
  const [transactionType, setTransactionType] = useState<string>('DEPOSIT');
  const [transactionAmount, setTransactionAmount] = useState<number>(0);
  const [remark, setRemark] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setUserDetails(selectedUser);
    return () => {};
  }, [selectedUser]);

  const handleFormSubmit = () => {
    if (!userDetails || !userDetails.balance) return;

    let updatedBalance: number = 0;

    if (transactionType == 'DEPOSIT') {
      updatedBalance = userDetails.balance + transactionAmount;
    }
    if (transactionType == 'WITHDRAWAL') {
      updatedBalance = userDetails.balance - transactionAmount;
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

  console.log('xxx', userDetails);
  return (
    <div>
      <div>
        <h4>Hi {userDetails?.name}!</h4>
        Account No: <strong>{userDetails?.accountNo}</strong>
        <br />
        Email: <strong>{userDetails?.email}</strong>
        <br />
        Balance: <strong> SGD {userDetails?.balance}</strong>
      </div>

      <br/>
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
        <br/>
        <br/>
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
        <TransactionsTable transactions={userDetails?.transactions} />
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
            onChange={(e) => setTransactionAmount(parseInt(e.target.value))}
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

// function Account() {
//   return (
//     <>
//       {/* Balance */}
//       <div>
//         <h5>Hi John!</h5>
//         Account No: xxxxxxxx
//         <br />
//         Balance: $50000 SGD
//       </div>

//       {/*
//       Transaction Form MODAL UI for deposit and withdraw
//       Fields
//       - Transaction type
//       - Amount
//       - Remark
//       - Timestamp
//       */}
//       <div></div>

//       {/* Transaction Table */}
//       <div></div>
//     </>
//   );
// }

// export default Account;
