import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import LocalPizza from '@mui/icons-material/LocalPizza';
import DeleteIcon from '@mui/icons-material/Delete';

function generate(pizzasSelected, handleDelete) {
    return pizzasSelected.map((value) =>
        <div key={value.id}>
            <ListItem
                secondaryAction={
                    <div onClick={() => (handleDelete(value.id))}>
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
                    secondary={`${value.amount} pizza`}
                />
            </ListItem>
        </div>

    );
}

export default function GuestPizzaList({ handleDelete, pizzasSelected }) {
    return (
        <Box sx={{ flexGrow: 1, maxWidth: 2000 }}>
            <Grid container spacing={10} direction="column"
                alignItems="center"
                justifyContent="center">
                <Grid item xs={12}>
                    <List >
                        {generate(pizzasSelected, handleDelete)}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}
