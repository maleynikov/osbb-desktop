import { Box, Button, Card, CardActions, CardContent, Grid, Input, InputAdornment, TextField, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import TenantService from "../../servises/Tenant";
import Toastr from "../../components/widgets/Toastr";
import { useState } from "react";
import { FormikHelpers } from 'formik';

const TenantEditPage = () => {
  const params = useParams();
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const initialValues = {
    name: '',
    account_num: '',
    square: 0,
    tarif: '0.00',
  }
  const onSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    const preparedValues = {
      ...values,
      tarif: parseFloat(values.tarif),
    };
    console.log('preparedValues', preparedValues);
    const res = await TenantService.create(preparedValues);
    if (res.status === 'OK') {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      // clear form
      resetForm();
    }

    if (res.status === 'FAIL') {
      setErr(true);
      setTimeout(() => setErr(false), 3000);
    }
  }

  return (
    <Grid
      container
      direction="column"
      sx={{
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Grid size={12}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 2,
        }}>
          <Typography variant="h5" gutterBottom>
            {(params.tid && params.tid !== '0') ? t('tenants.item.edit', { id: params.tid }) : t('tenants.item.new')}
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={(values) => {
            const errors: any = {};
            if (isNaN(Number(values.tarif)) || Number(values.tarif) <= 0) {
              errors.tarif = t('err.tarif_invalid');
            }
            if (!values.name) {
              errors.name = t('err.name_required');
            }
            if (!values.account_num) {
              errors.account_num = t('err.account_num_required');
            }
            if (!values.square) {
              errors.square = t('err.square_required');
            }
            return errors;
          }}
        >
           {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              isSubmitting,
              errors,
              resetForm,
           }) => (
            <>
              <Card
                component="form"
                onSubmit={handleSubmit}
                variant="outlined"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: 2,
              }}>
                <Box sx={{ width: '400px' }}>
                  <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                  }}>
                    <TextField
                      name="name"
                      size="small"
                      variant="outlined"
                      label={t('tenant.name')}
                      value={values.name}
                      error={Boolean(errors.name)}
                      onChange={handleChange}
                    />
                    <TextField
                      name="account_num"
                      size="small"
                      variant="outlined"
                      label={t('tenant.account_num')}
                      value={values.account_num}
                      error={Boolean(errors.account_num)}
                      onChange={handleChange}
                    />
                    <TextField
                      name="square"
                      size="small"
                      variant="outlined"
                      label={t('tenant.square')}
                      value={values.square}
                      error={Boolean(errors.square)}
                      onChange={(e) => {
                        const intValue = parseInt(e.target.value, 10);
                        setFieldValue('square', isNaN(intValue) ? '' : intValue);
                      }}
                      slotProps={{
                        input: {
                          endAdornment: <InputAdornment position="start">m2</InputAdornment>,
                        },
                      }}
                    />
                    <TextField
                      name="tarif"
                      size="small"
                      variant="outlined"
                      label={t('tenant.tarif')}
                      value={values.tarif}
                      error={Boolean(errors.tarif)}
                      onChange={handleChange}
                      slotProps={{
                        input: {
                          endAdornment: <InputAdornment position="start">rub</InputAdornment>,
                        },
                      }}
                    />
                  </CardContent>
                  <CardActions sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    width: '100%',
                    padding: 2,
                  }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {t('btn.save')}
                    </Button>
                    <Button
                      variant="contained"
                      color="inherit"
                      size="small"
                      onClick={() => resetForm()}
                    >
                      {t('btn.cancel')}
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </>
           )}
        </Formik>
      </Grid>
      {success && (<Toastr message={t('created')} type="success" />)}
      {err && (<Toastr message={t('error')} type="error" />)}
    </Grid>
  );
}

export default TenantEditPage;
