import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Box, Button, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { authActions } from '../store';

const Header = ({ onLoginClick }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = React.useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <AppBar
      sx={{ background: "black" }}
      position='sticky'
    >
      <Toolbar>
        <Typography variant='h4'>Post App</Typography>
        {isLoggedIn && (
          <Box display='flex' marginLeft={'auto'} marginRight={'auto'}>
             <Tabs textColor="inherit" value={value} onChange={(e,val)=>setValue(val)}>
               <Tab LinkComponent={Link} to="/posts" label = "All Posts" />
               <Tab LinkComponent={Link} to="/myPosts" label = "My Posts" />
               <Tab LinkComponent={Link} to="/posts/add" label = "Add Posts" />
             </Tabs>
          </Box>
        )}
        <Box
          display='flex'
          marginLeft="auto"
        >
          {!isLoggedIn && (
            <Button onClick={onLoginClick} sx={{ margin: 1 }} color='warning'>
              Login
            </Button>
          )}

          {isLoggedIn && (
            <Button onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link} to="/auth"
              sx={{ margin: 1 }}
              color='warning'>Logout</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;


