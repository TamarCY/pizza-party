import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LocalPizza from '@mui/icons-material/LocalPizza';
import DeleteIcon from '@mui/icons-material/Delete';

const pizzaArray = [{topping:"olives", amount:3, id: 134},{topping:"corn", amount:1, id: 183}]

function generate(element) {
  return pizzaArray.map((value) =>
  <ListItem
  secondaryAction={
    <IconButton edge="end" aria-label="delete">
      <DeleteIcon />
    </IconButton>
  }
>
  <ListItemAvatar>
    <Avatar>
      <LocalPizza/>
    </Avatar>
  </ListItemAvatar>
  <ListItemText
    primary={`${value.topping} ${value.amount}`}
  />
</ListItem>

  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function GuestPizzaList() {

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Ordered Pizza
          </Typography>
          <Demo>
            <List >
              {generate()}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
