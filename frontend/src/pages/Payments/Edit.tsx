import { Formik, FormikHelpers } from "formik";
import PaymentsService from "../../servises/Payments";
import { Autocomplete, Box, Button, Card, CardActions, CardContent, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import TenantService from "../../servises/Tenant";
import DatePicker from "../../components/DatePicker";
import dayjs from 'dayjs';
import Toastr from "../../components/widgets/Toastr";

const initialValues = {
  tenant_id: 0,
  amount: '0.00',
  period: dayjs().date(1),
}

interface Tenant {
  id: number;
  name: string;
  accountNum: number;
}

export default () => {
  const [tenants, setTenants] = useState<Array<Tenant>>([]);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await TenantService.getAll();
      if (res.status === 'OK') {
        const tenants: Array<Tenant> = []
        for (const i in res.data) {
          const row = res.data[i];
          tenants.push({
            id: row.id,
            name: row.name,
            accountNum: row.account_num,
          })
        }
        setTenants(tenants);
      }
    }
    fetchData();
  }, []);

  const onSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    const preparedValues = {
      ...values,
      amount: Number(parseFloat(values.amount).toFixed(2)),
      period: values.period.format('YYYY-MM-01'),
    };
    const res = await PaymentsService.create(preparedValues);

    if (res.status === 'OK') {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      resetForm();
    }

    if (res.status === 'FAIL') {
      setErr(true);
      setTimeout(() => setErr(false), 3000);
    }
  }

  const params = useParams();
  const { t } = useTranslation();

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
        }}>
          <Typography variant="h5" gutterBottom>
            {(params.pid && params.pid !== '0') ? t('payments.item.edit', { id: params.pid }) : t('payments.item.new')}
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={(values) => {
            const errors: any = {};
            if (isNaN(Number(values.amount)) || Number(values.amount) <= 0) {
              errors.amount = t('err.amount_invalid');
            }
            return errors;
          }}
        >
          {({
            handleSubmit,
            values,
            isSubmitting,
            setFieldValue,
            handleChange,
            resetForm,
            errors,
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
                }}
              >
                <Box sx={{ width: '400px' }}>
                  <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                  }}>
                    <Autocomplete
                      freeSolo
                      disableClearable
                      options={tenants}
                      getOptionLabel={(option: any) =>
                        option.id !== 0 ? `${option.name} (${option.accountNum})` : ''
                      }
                      isOptionEqualToValue={(option, value) => option?.id === value?.id}
                      size="small"
                      value={tenants.find(t => t.id === values.tenant_id) || {id: 0}}
                      onChange={(event, newValue: any) => {
                        setFieldValue('tenant_id', newValue.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t('payments.tenant')}
                          slotProps={{
                            input: {
                              ...params.InputProps,
                              type: "search",
                              name: "tenant_id"
                            }
                          }} />
                      )}
                    />
                    <TextField
                      name="amount"
                      size="small"
                      variant="outlined"
                      label={t('payments.amount')}
                      value={values.amount}
                      onChange={handleChange}
                      error={Boolean(errors.amount)}
                      slotProps={{
                        input: {
                          endAdornment: <InputAdornment position="start">rub</InputAdornment>,
                        },
                      }}
                    />
                    <DatePicker
                      label={t('payments.period')}
                      format="LL"
                      views={['year', 'month']}
                      value={values.period}
                      onChange={(value: any) => setFieldValue('period', value)}
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
