import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://easygenerator.com/">
        Easy Generation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp({setLoggedIn}) {
  let navigate = useNavigate();
  const [nameMessage, setNameMessage] = React.useState('')
  const [emailMessage, setEmailMessage] = React.useState('')
  const [passwordMessage, setPasswordMessage] = React.useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z|A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let escape = false;
    setNameMessage('');
    setEmailMessage('');
    setPasswordMessage('');
    if ( data.get('fname') === '' ) {
      setNameMessage('This field is required');
      escape = true;
    }
    if ( data.get('lname') === '' ) {
      setNameMessage('This field is required');
      escape = true;
    }
    if ( !emailRegex.test(data.get('email')) ) {
      setEmailMessage('Please input valid email address');
      escape = true;
    }
    if ( !passwordRegex.test(data.get('password')) ) {
      setPasswordMessage('true')
      escape = true;
    }
    if ( escape ) return
    const form = {
      fullname : data.get('fname') +' '+ data.get('lname'),
      email: data.get('email'),
      password: data.get('password')
    };

    const res = await axios.post("http://localhost:3001/api/v1/user/signup", form);
    if (res.status === parseInt('201')) {
      localStorage.setItem('token', res.data.token);
      setLoggedIn(true)
      navigate('/')
    }
    setLoggedIn(true)
    navigate('/')
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography component="p" variant="p" color="red">
                  {nameMessage}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography component="p" variant="p" color="red">
                  {emailMessage}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                {
                  passwordMessage && <>
                    <Typography component="p" variant='p' color='red'>• Minimum length of 8 characters</Typography>
                    <Typography component="p" variant='p' color='red'>• Contains at least 1 letter.</Typography>
                    <Typography component="p" variant='p' color='red'>• Contains at least 1 number.</Typography>
                    <Typography component="p" variant='p' color='red'>• Contains at least 1 special character.</Typography>
                  </>
                }
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}