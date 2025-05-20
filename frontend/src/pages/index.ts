import { t } from "i18next";
import PaymentsPage from './Payments';


export interface Page {
  name: string;
  path: string;
}

export {
  PaymentsPage,
}

const pages: Array<Page> = [
  { name: t('pages.tenants'), path: "/tenants/list" },
  { name: t('pages.payments'), path: "/payments" },
];

export default pages;
