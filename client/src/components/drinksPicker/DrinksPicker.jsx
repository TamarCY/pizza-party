import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const cocktails = ["Old Fashioned", "Margarita", "Cosmopolitan", "Negroni", "Moscow Mule", "Martini", "Mojito", "Whiskey Sour", "Manhattan", "Spritz", "Gimlet", "Vesper", "Mimosa", "Daiquiri"]

const drinks = ["Orange juice", "Apple juice", "Lemonade", "Sparkling water", "Iced tea", "Beer", "White wine", "Red wine", "Coke", "Coke light", "Cider alcoholic", "Sprite", "Diet Sprite"]


function getStyles(drink, drinkState, theme) {
  return {
    fontWeight:
      drinkState.indexOf(drink) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DrinksPicker({list, placeholder, handleChange, drinkState}) {
  const theme = useTheme();
//   const [persondrink, setPersondrink] = React.usedrinkState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersondrink(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );
//   };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={drinkState}
          onChange={(e)=>handleChange(e, )}
          input={<OutlinedInput id="select-multiple-chip" label={placeholder} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {list.map((drink) => (
            <MenuItem
              key={drink}
              value={drink}
              style={getStyles(drink, drinkState, theme)}
            >
              {drink}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
