import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useAppSelector } from '../hooks';
import { userSelector } from '../features/users/userSlice';

function CalculateSavings(
  amount: number,
  years: number,
  ratePercent: number,
  roundToPlaces: number
) {
  const interestRate = ratePercent / 100 + 1;
  return (amount * Math.pow(interestRate, years)).toFixed(roundToPlaces);
}

function Saving() {
  const [balance, setBalance] = useState<number>(0);
  const [calculatedSavingAmount, setCalculatedSavingAmount] = useState<string>();
  const [increasedSavingAmount, setIncreasedSavingAmount] = useState<string>();
  const [increasedPercentage, setIncreasedPercentage] = useState<string>();
  const [interestRate, setInterestRate] = useState<number>(0);
  const [noOfYears, setNoOfYears] = useState<number>(0);
  const selectedUser = useAppSelector(userSelector);

  useEffect(() => {
    setBalance(selectedUser.balance);
    return () => {};
  }, [selectedUser]);

  function handleCalculate() {
    if (!noOfYears || !interestRate) return;
    const totalSavings = CalculateSavings(balance || 0, noOfYears, interestRate, 2);
    const netIncreasement = parseFloat(totalSavings) - balance;
    const percent = ((netIncreasement / balance) * 100).toFixed(2);

    setIncreasedSavingAmount(netIncreasement.toFixed(2));
    setIncreasedPercentage(`${percent}%`);
    setCalculatedSavingAmount(totalSavings);
  }

  return (
    <>
      Balance: <strong>{balance}</strong>
      <br />
      {/* % Input */}
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="years"
          label="Years"
          type="number"
          fullWidth
          variant="standard"
          value={noOfYears}
          onChange={(e) => {
            if (!e.target.value) return;
            setNoOfYears(parseInt(e.target.value));
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="interestRate"
          label="Interest Rate"
          type="number"
          fullWidth
          variant="standard"
          value={interestRate}
          onChange={(e) => {
            if (!e.target.value) return;
            setInterestRate(parseFloat(e.target.value));
          }}
        />
        <br />
        <br />
        <Button variant="contained" onClick={handleCalculate}>
          Calculate
        </Button>
      </div>
      <br />
      <br />
      {/* comparison of saving amt and balance */}
      {calculatedSavingAmount && (
        <div>
          Total Savings: <strong>{calculatedSavingAmount}</strong>
          <br />
          Net Savings: <strong>{increasedSavingAmount}</strong>
          <br />
          Increasement Percentage: <strong>{increasedPercentage}</strong>
        </div>
      )}
    </>
  );
}

export default Saving;
