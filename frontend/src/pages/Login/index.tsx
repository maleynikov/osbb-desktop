import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import './styles.css';


const LoginPage = () => {
  const handleSubmit = async (values: any) => {  
    console.log(values);
  };
  const { t } = useTranslation();

  return (
    <div id="login-page">
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
          onClick={handleSubmit}
          sx={{ marginLeft: 2 }}
        >
          {t('login')}
        </Button>
      </Box>
  </div>
  );
};

export default LoginPage;
