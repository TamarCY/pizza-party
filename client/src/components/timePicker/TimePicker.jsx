import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';


export default function TimePicker() {
  const partyObject = useRecoilValue(partyState);
  const setPartyObject = useSetRecoilState(partyState);

  const handleDateChange = (newValue) => {
    setPartyObject({ ...partyObject, date: newValue });
    console.log(partyObject.date)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Time"
        value={partyObject.date}
        onChange={(newValue) => handleDateChange(newValue)}
      />
    </LocalizationProvider>
  );
}
