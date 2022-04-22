import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { removeAccessToken } from '../../redux/slices/tokenSlice';

export default function ButtonAppBar() {
  const accessToken = useSelector((state) => state.token.token);
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyMusic
          </Typography>
          {accessToken ? (
            <Button
              color="inherit"
              onClick={() => {
                dispatch(removeAccessToken());
              }}
            >
              Logout
            </Button>
          ) : (
            <p></p>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
