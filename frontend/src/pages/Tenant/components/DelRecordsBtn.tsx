import { Button } from "@mui/material";
import DelIcon from '@mui/icons-material/Delete';
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useState } from "react";
import TenantService from "../../../servises/Tenant";


interface DelRecordsBtnProps {
  ids: Array<number>;
  onRefresh: () => void;
}

const DelRecordsBtn = (props: DelRecordsBtnProps) => {
  const { t } = useTranslation();
  const delHandler = async () => {
    if (props.ids.length === 0) {
      return
    }
    setOpen(true);
  }
  const onCancel = () => setOpen(false);
  const onConfirm = async () => {
    const res = await TenantService.delete(props.ids);

    if (res.status === "OK") {
      props.onRefresh();
    }
    setOpen(false);
  }
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        size="small"
        startIcon={<DelIcon />}
        sx={{ marginRight: 2}}
        onClick={delHandler}
      >
        {t('tenants.delete')}
      </Button>
      {open && (
        <ConfirmDialog onCancel={onCancel} onConfirm={onConfirm} />
      )}
    </>
  );
}

export default DelRecordsBtn;
