import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function DessertPicker({ options, inputValue, setInputValue, disabled, label }) {
  return (
    <div >
      <Autocomplete
        disabled={disabled}
        freeSolo
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
}
