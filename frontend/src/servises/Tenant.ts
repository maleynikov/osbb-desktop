import { Tenant } from '../pages/Tenant/interfaces/tenant';
import { header as authHeader } from '../utils/auth';

class TenantService {
  public static async getOne(id: number): Promise<any> {
    return fetch(`${import.meta.env.VITE_API_URL}/tenants/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
    }).then((res) => res.json());
  }
  public static async getAll(): Promise<any> {
    return fetch(`${import.meta.env.VITE_API_URL}/tenants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
    }).then((res) => res.json());
  }
  public static async upset(data: Tenant): Promise<any> {
    return fetch(`${import.meta.env.VITE_API_URL}/tenants/upset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
  public static async delete(ids: Array<Number>): Promise<any> {
    return fetch(`${import.meta.env.VITE_API_URL}/tenants/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify({
        "ids": ids,
      }),
    }).then((res) => res.json());
  }
}

export default TenantService;
