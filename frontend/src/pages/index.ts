import PaymentsPage from './Payments';


export interface Page {
  name: string;
  path: string;
  enabled: boolean;
}

export {
  PaymentsPage,
}

const pages: Array<Page> = [
  { name: "tenants", path: "/tenants/list", enabled: true },
  { name: "payments", path: "/payments", enabled: true },
  { name: "receipt", path: "/receipt", enabled: true },
];

export default pages;
