import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import './styles.css';
import { Formik } from 'formik';


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
      <Formik
        initialValues={{ username: ''}}
        validate={(values) => {
          const errors: any = {};
          if (!values.username) {
            errors.username = t('required');
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 2,
            }}
          >
            <TextField
              name="username"
              label={t('your_name')}
              size="small"
              variant="outlined"
              sx={{ width: '200px' }}
              autoComplete="off"
              error={Boolean(errors.username)}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              autoFocus
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              sx={{ marginLeft: 2 }}
            >
              {t('login')}
            </Button>
        </Box>
        )}
      </Formik>
  </div>
  );
};

export default LoginPage;
