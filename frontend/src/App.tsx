import './App.css';
import { useTranslation } from 'react-i18next';
import Auth from './servises/Auth';
import Button from '@mui/material/Button';
import { Box, TextField, Typography } from '@mui/material';

function App() {
  const { t } = useTranslation();
  function login() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    if (name) {
      Auth.login(name).then((data: any) => {
        console.log(data);
      });
    }
  }

  return (
    <div id="app">
      <div id="login-box">
        <Typography variant="h4" component="div" sx={{
          textAlign: 'center',
          marginBottom: 6,
          fontWeight: 'bold'
        }}>
          {t('welcome')}
        </Typography>
        <Typography component="p" sx={{
          textAlign: 'center',
          marginBottom: 2,
        }}>
          {t('prompt_name')}
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
          }}
        >
          <TextField
            id="name"
            name="name"
            label={t('your_name')}
            size="small"
            variant="outlined"
            sx={{ width: '200px' }}
            autoFocus
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={login}
            sx={{ marginLeft: 2 }}
          >
            {t('login')}
          </Button>
        </Box>
      </div>
    </div>
  )
}

export default App
