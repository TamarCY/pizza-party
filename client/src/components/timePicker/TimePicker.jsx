import * as React from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function TimePicker({partyObject, setPartyObject}) {
  const [value, setValue] = React.useState(new Date());
console.log(setPartyObject);
useEffect(()=> {
  setPartyObject({...partyObject, date: value})
// eslint-disable-next-line react-hooks/exhaustive-deps
},[value])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Enter time"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
