import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DatePicker from "../DatePicker";
import { useEffect, useState } from "react";
import WidgetPayments from "../../servises/WidgetPayments";

export interface PaymentsWidgetProps {
  period: {
    from?: Date,
    to?: Date,
  }
}

interface PaymentsData {
  amount: Number;
  count: Number;
}

export default (props: PaymentsWidgetProps) => {
  const { t } = useTranslation();
  const [data, setData] = useState<PaymentsData>();
  const [ period, setPeriod ] =  useState<{from?: Date, to?: Date}>(props.period);

  useEffect(() => {
    const fetchData = async () => {
      const res = await WidgetPayments.getData({period});
      if (res.status === "OK") {
        setData(res.data)
      }
    }
    fetchData();
  }, [period]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ color: 'text.secondary'}}>
          {t('widgets.payments.title')}
        </Typography>
        <Box>
          <Typography component="div" variant="h4">
            <b>{t('widgets.payments.amount')}</b>:{" " + data?.amount || 0} <small>rub</small>
          </Typography>
          <Typography component="div" variant="h6">
            <b>{t('widgets.payments.count')}</b>:{" " + data?.count || 0}
          </Typography>
          <Box sx={{marginTop: 1.9}}>
            <Typography gutterBottom component="div">
              {t('widgets.payments.period')}
            </Typography>
            <Grid container size={12} spacing={2}>
              <Grid size={6}>
                <DatePicker
                  label={t('widgets.payments.period_from')}
                  onChange={(item: any) => setPeriod({
                    ...period,
                    from: item,
                  })}
                />
              </Grid>
              <Grid size={6}>
                <DatePicker
                  label={t('widgets.payments.period_to')}
                  onChange={(item: any) => setPeriod({
                    ...period,
                    to: item
                  })}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}