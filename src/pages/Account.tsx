import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  User,
  // Transaction,
  // addUser,
  // makeDeposit,
  makeWithdrawal,
  userSelector
} from '../features/users/userSlice';

function Account() {
  const dispatch = useAppDispatch();

  const [userDetails, setUserDetails] = useState<User>();
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const selectedUser = useAppSelector(userSelector);

  useEffect(() => {
    setUserDetails(selectedUser);
    return () => {};
  }, [selectedUser]);

  function handleDeposit() {
    // dispatch(makeDeposit(depositAmount));
    dispatch(makeWithdrawal(depositAmount));
  }

  console.log('xxx', userDetails);
  return (
    <div>
      <div>
        <h5>Hi {userDetails?.name}!</h5>
        Account No: {userDetails?.accountNo}
        <br />
        Email: {userDetails?.email}
        <br />
        Balance: SGD {userDetails?.balance}
      </div>

      <div>
        <input
          type="number"
          placeholder="Deposit Amount"
          aria-label="deposit-amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(parseInt(e.target.value))}
        />
        <button type="submit" className="btn" onClick={handleDeposit}>
          Deposit
        </button>
      </div>
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
//       Transaction Form MODAL UI for deposit and widthdraw
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
