import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Transaction {
  type: string;
  amount: number;
  remainingBalance: number;
}
export interface User {
  id: string;
  name: string;
  email: string;
  accountNo: string;
  balance: number;
  transactions: Array<Transaction>;
}

const initialState: User =
{
  id: '1',
  name: 'John Doe',
  email: 'john@test.com',
  accountNo: "42209348332",
  balance: 500000,
  transactions: []
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
    makeDeposit: (state, action: PayloadAction<number>) => {
      const remainingBalance = state.balance + action.payload;
      const depositeData: Transaction = {
        type: "DEPOSIT",
        amount: action.payload,
        remainingBalance: remainingBalance
      }
      state.transactions.push(depositeData);
      state.balance = state.balance + action.payload;
    },
    makeWithdrawal: (state, action: PayloadAction<number>) => {
      const remainingBalance = state.balance - action.payload;
      const withdrawalData: Transaction = {
        type: "WITHDRAWAL",
        amount: action.payload,
        remainingBalance: remainingBalance
      }
      state.transactions.push(withdrawalData);
      state.balance = remainingBalance;
    },
  }
});

export const { addUser, makeDeposit, makeWithdrawal } =
  userSlice.actions;

export const userSelector = (state: RootState) => state.userReducer;

export default userSlice.reducer;