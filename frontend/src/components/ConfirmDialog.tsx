import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
  onCancel: () => void;
  onConfirm: () => void
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={true} onClose={props.onCancel}>
      <DialogTitle>{t('confirm_dialog.title')}</DialogTitle>
      <DialogContent>{t('confirm_dialog.content')}</DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} color="primary">
          {t('btn.cancel')}
        </Button>
        <Button onClick={props.onConfirm} color="error">
          {t('btn.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
