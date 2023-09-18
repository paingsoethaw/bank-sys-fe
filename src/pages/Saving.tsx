import { useEffect, useState } from 'react';
import {
  // useAppDispatch,
  useAppSelector
} from '../hooks';
import {
  User,
  // Transaction,
  // addUser,
  // makeDeposit,
  // makeWithdrawal,
  userSelector
} from '../features/users/userSlice';

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
  const [userDetails, setUserDetails] = useState<User>();
  const [calculatedSavingAmount, setCalculatedSavingAmount] = useState<string>();
  const [interestRate, setInterestRate] = useState<number>(0);
  const [noOfYears, setNoOfYears] = useState<number>(0);
  const selectedUser = useAppSelector(userSelector);

  useEffect(() => {
    setUserDetails(selectedUser);
    return () => {};
  }, [selectedUser]);

  function handleCalculate() {
    setCalculatedSavingAmount(
      CalculateSavings(userDetails?.balance || 0, noOfYears, interestRate, 2)
    );
  }

  return (
    <>
      {/* % Input */}
      <div>
        Years
        <input
          type="number"
          placeholder="Years"
          aria-label="years"
          value={noOfYears}
          onChange={(e) => setNoOfYears(parseInt(e.target.value))}
        />
        <br />
        Interest Rate
        <input
          type="number"
          placeholder="Interest Rate"
          aria-label="interest-rate"
          value={interestRate}
          onChange={(e) => setInterestRate(parseInt(e.target.value))}
        />
        <br />
        <button type="submit" className="btn" onClick={handleCalculate}>
          Calculate
        </button>
      </div>

      <br />
      <br />
      {/* comparison of saving amt and balance */}
      <div>
        Balance: {userDetails?.balance}
        <br />
        Number of Years: {noOfYears}
        <br />
        Total Savings of {noOfYears} Years: {calculatedSavingAmount}
      </div>
    </>
  );
}

export default Saving;
