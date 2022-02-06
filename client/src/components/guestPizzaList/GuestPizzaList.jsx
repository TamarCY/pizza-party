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
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LocalPizza from '@mui/icons-material/LocalPizza';
import DeleteIcon from '@mui/icons-material/Delete';


// const pizzaArray = [{ topping: "olives", amount: 3, id: 134 }, { topping: "corn", amount: 1, id: 183 }]


function generate(pizzasSelected, handleDelete) {
    // const handleDelete = (id) => {
    //     console.log(id);
    // }

    return pizzasSelected.map((value) =>
        <ListItem
         sx={{m:5}}
            secondaryAction={
                <div  onClick={() => (handleDelete (value.id))}>
                <IconButton edge="end" aria-label="delete" >
                    <DeleteIcon />
                </IconButton>
                </div>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <LocalPizza />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={value.toppings}
                secondary = {`${value.amount} pizza`}
            />
        </ListItem>

    );
}

// const Demo = styled('div')(({ theme }) => ({
//     backgroundColor: theme.palette.background.paper,
// }));

export default function GuestPizzaList({handleDelete, pizzasSelected}) {

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 2000 }}>
            <Grid container spacing={2} direction="column"
                alignItems="center"
                justifyContent="center">
                <Grid item xs={12}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        {/* Ordered Pizza */}
                    </Typography>
                    <List >
                        {generate(pizzasSelected, handleDelete)}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}
