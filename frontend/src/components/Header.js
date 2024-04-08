import React, { useState } from 'react'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {
  const isLoggedIn = useSelector(state=> state.isLoggedIn);
  console.log(isLoggedIn)
  const [value, setValue] = useState()

  return (
    <AppBar 
      position='sticky'
      sx={{background: 'white'}}
    >
      <Toolbar>
        <Typography sx={{color: '#C14800', fontWeight: 'bold'}} variant='h4'>CollegeEvent Dairy</Typography>
        { isLoggedIn && <Box display='flex' marginLeft={'auto'} marginRight={'auto'}>
          <Tabs value={value} onChange={(e, val) => setValue(val)}>
           <Tab LinkComponent={Link} to='/Events' label='All events' /> 
           <Tab LinkComponent={Link} to='/myEvents' label='My events' /> 
          </Tabs>
        </Box>}
        <Box display='flex' marginLeft='auto'>
          { !isLoggedIn && <>
            <Button LinkComponent={Link} to='/auth' variant='contained' sx={{margin:1, borderRadius: 10}} color='warning'>
            Login
          </Button>
          <Button LinkComponent={Link} to='/auth' variant='contained' sx={{margin:1, borderRadius: 10}} color='warning'>
            Signup
          </Button>
          </>}
          { isLoggedIn && <Button LinkComponent={Link} to='/auth' variant='contained' sx={{margin:1, borderRadius: 10}} color='warning'>
            Logout
          </Button>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
