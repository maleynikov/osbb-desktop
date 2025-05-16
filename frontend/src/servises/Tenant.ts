import { header as authHeader } from '../utils/auth';

class TenantService {
  public static async list(): Promise<any> {
    return fetch(`${import.meta.env.VITE_API_URL}/tenants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader
      },
    });
  }
}

export default TenantService;
