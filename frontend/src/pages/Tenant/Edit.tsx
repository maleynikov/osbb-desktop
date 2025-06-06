import { Box, Button, Card, CardActions, CardContent, Grid, Input, InputAdornment, TextField, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Formik, FormikHelpers } from "formik";
import TenantService from "../../servises/Tenant";
import Toastr from "../../components/widgets/Toastr";
import { useEffect, useState } from "react";

export default () => {
  const params = useParams();
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const isEdit = params.tid && params.tid !== '0';
  const [initVals, setVals] = useState({
    id: 0,
    name: '',
    account_num: '',
    square: '',
    tarif: '',
    dept: '',
  });

  useEffect(() => {
    const fetchData = async (tid: number) => {
      const res = await TenantService.getOne(tid);
      if (res.status === 'OK') {
        setVals(res.data);
      }
    }
    if (params.tid) fetchData(Number(params.tid));
  }, [params]);

  const onSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    const preparedValues = {
      ...values,
      square:  Number(parseFloat(values.square).toFixed(1)),
      tarif: Number(parseFloat(values.tarif).toFixed(2)),
      dept: Number(parseFloat(values.dept).toFixed(2)),
    };
    const res = await TenantService.upset(preparedValues);
    if (res.status === 'OK') {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (!isEdit) resetForm();
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
            {isEdit ? t('tenants.item.edit', { id: params.tid }) : t('tenants.item.new')}
          </Typography>
        </Box>
        <Formik
          initialValues={initVals}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={(values) => {
            const errors: any = {};
            if (!values.name) {
              errors.name = t('err.name_required');
            }
            if (!values.account_num) {
              errors.account_num = t('err.account_num_required');
            }
            if (isNaN(Number(values.square)) || Number(values.square) <= 0) {
              errors.square = t('err.square_required');
            }
            if (isNaN(Number(values.tarif)) || Number(values.tarif) <= 0) {
              errors.tarif = t('err.tarif_invalid');
            }
            if (isNaN(Number(values.dept)) || Number(values.dept) < 0) {
              errors.dept = t('err.dept_invalid');
            }
            return errors;
          }}
        >
           {({
              handleSubmit,
              handleChange,
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
                      onChange={handleChange}
                      slotProps={{
                        input: {
                          endAdornment: <InputAdornment position="start">m2</InputAdornment>,
                          placeholder: "0.0",
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
                          placeholder: "0.00",
                        },
                      }}
                    />
                    <TextField
                      name="dept"
                      size="small"
                      variant="outlined"
                      label={t('tenant.dept')}
                      value={values.dept}
                      error={Boolean(errors.dept)}
                      onChange={handleChange}
                      slotProps={{
                        input: {
                          endAdornment: <InputAdornment position="start">rub</InputAdornment>,
                          placeholder: "0.00",
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
