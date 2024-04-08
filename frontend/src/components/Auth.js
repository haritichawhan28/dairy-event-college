import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const Auth = () => {

  const [inputs, setInputs] = useState({
    name: "", email: "", password: ""
  })

  const [isSignup, setIsSignup] = useState(false)

  const handleChange = (e) => {
    setInputs((prevState)=> ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box display='flex'
           maxWidth={400}
           flexDirection={'column'} 
           alignItems='center' 
           justifyContent={'center'} 
           boxShadow='10px 10px 20px #ccc' 
           padding={3} margin='auto' 
           marginTop={5} 
           borderRadius={5}
      >
        <Typography variant='h3' padding={3} textAlign='center'>
          {isSignup ? 'Signup' : 'Login'}
        </Typography>

        { isSignup && 
          <TextField name="name" onChange={handleChange} value={inputs.name} placeholder="Name" margin='normal' />
        }

        <TextField 
          name="email"
          onChange={handleChange} 
          value={inputs.email} 
          placeholder="Email" 
          type={'email'} 
          margin='normal' 
        />

        <TextField 
        name="password"
        onChange={handleChange} 
        value={inputs.password} 
        placeholder="Password" 
        type={'password'} 
        margin='normal' 
      />

        <Button 
          type='submit'
          variant='contained' 
          sx={{borderRadius:3, marginTop:3}} 
          color='warning'
          >Submit
        </Button>

        <Button 
          onClick={()=> setIsSignup(!isSignup)} 
          sx={{borderRadius:3, marginTop:3}}
        >
          go to {isSignup ? 'Login' : 'Signup'}
        </Button>
      </Box>
    </form>
  )
}

export default Auth
