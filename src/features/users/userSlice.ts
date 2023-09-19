import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface Transaction {
  type: string;
  amount: number;
  updatedBalance: number;
  remark?: string;
  date: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  accountNo: string;
  balance: number;
  transactions: Array<Transaction>;
}

const initialState: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@test.com',
  accountNo: '42209348332',
  balance: 500000,
  transactions: [
    {
      type: 'DEPOSIT',
      amount: 340.54,
      updatedBalance: 4500030.34,
      remark: 'ddd',
      date: '2023-08-23'
    }
  ]
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createTransaction: (state, action: PayloadAction<Transaction>) => {
      const depositePayload = action.payload;
      state.balance = depositePayload.updatedBalance;
      state.transactions.push(depositePayload);
    }
  }
});

export const { createTransaction } = userSlice.actions;

export const userSelector = (state: RootState) => state.userReducer;

export default userSlice.reducer;
