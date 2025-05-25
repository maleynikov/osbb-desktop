import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/ru';

export default (props: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DatePicker
        {...props}
        sx={{width: "100%"}}
        slotProps={{ textField: { size: 'small' } }}
      />
    </LocalizationProvider>
  );
}
