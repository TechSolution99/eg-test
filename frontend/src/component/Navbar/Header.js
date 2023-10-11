import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';

export default function SearchAppBar({isLoggedIn, setLoggedIn}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Easy Generation
          </Typography>
          {isLoggedIn &&
            <>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}/>
              <div>
                <Button variant="contained" onClick={() => setLoggedIn(false)}>Log out</Button>
              </div>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}