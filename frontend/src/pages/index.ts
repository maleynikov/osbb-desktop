import TenantsListPage from './Tenant/List'
import TenantsEditPage from './Tenant/Edit'
import PaymentsListPage from './Payments/List';
import PaymentsEditPage from './Payments/Edit';

export interface Page {
  name: string;
  path: string;
}

export {
  TenantsEditPage,
  TenantsListPage,
  PaymentsListPage,
  PaymentsEditPage,
}

const pages: Array<Page> = [
  { name: 'pages.tenants', path: "/tenants/list" },
  { name: 'pages.payments', path: "/payments/list" },
];

export default pages;
