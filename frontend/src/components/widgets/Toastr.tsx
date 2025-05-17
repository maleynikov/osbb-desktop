import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Slide, Snackbar, SlideProps } from '@mui/material';

interface ToastrProps {
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
}

type TransitionProps = Omit<SlideProps, 'direction'>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert
    elevation={6}
    ref={ref}
    variant="filled"
    {...props}
  />;
});

const TransitionUp = (props: TransitionProps) => {
  return <Slide {...props} direction="up" />;
}

const Toastr = (props: ToastrProps) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={() => setOpen(false)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      slots={{
        transition: TransitionUp,
      }}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={props.type}
        sx={{ width: '100%' }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Toastr
