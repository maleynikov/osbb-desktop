import { Box, Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";


const TenantEditPage = () => {
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
          marginBottom: 2,
        }}>
          <Typography variant="h5" gutterBottom>
            {(params.tid && params.tid !== '0') ? t('tenants.item.edit', { id: params.tid }) : t('tenants.item.new')}
          </Typography>
        </Box>
        <Formik
          initialValues={{
            name: '',
            account_num: '',
            square: 0,
            tarif: 0,
          }}
          onSubmit={async (values) => {
            console.log('values:', values);
          }}
        >
          <Card variant="outlined" sx={{
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
                  required
                />
                <TextField
                  name="account_num"
                  size="small"
                  variant="outlined"
                  label={t('tenant.account_num')}
                  required
                />
                <TextField
                  name="square"
                  size="small"
                  variant="outlined"
                  label={t('tenant.square')}
                  required
                />
                <TextField
                  name="tarif"
                  size="small"
                  variant="outlined"
                  label={t('tenant.tarif')}
                  required
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
                >
                  {t('btn.save')}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    console.log('cancel');
                  }}
                  disabled={true}
                >
                  {t('btn.cancel')}
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Formik>
      </Grid>
    </Grid>
  );
}

export default TenantEditPage;
