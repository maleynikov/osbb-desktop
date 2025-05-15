import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import './styles.css';
import { Formik, FormikHelpers } from 'formik';
import AuthService from "../../servises/Auth";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router";
import { useState } from "react";
import Toastr from "../../components/widgets/Toastr";

interface Err {
  msg: string;
}


interface LoginValues {
  username: string;
} 

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [error, setError] = useState<Err | null>(null);

  if (auth?.isLogged()) {
    return <Navigate to="/dashboard" replace />;
  }

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
        validate={(values: LoginValues) => {
          const errors: any = {};
          if (!values.username) {
            errors.username = t('required');
          }
          return errors;
        }}
        onSubmit={async (
          values: LoginValues,
          { setSubmitting }: FormikHelpers<LoginValues>,
        ) => {
          try {
            const { ssid } = await AuthService.login(values.username);
            if (ssid) {
              auth?.onLogin(ssid);
            } else {
              setError({msg: t('login_failed')});
              setTimeout(() => setError(null), 3000);
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          handleChange,
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
              error={Boolean(errors.username)}
              onChange={handleChange}
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
      {error && (<Toastr message={error.msg} type="error" />)}
  </div>
  );
}

export default LoginPage;
