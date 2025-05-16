import { header as authHeader } from '../utils/auth';

class TenantService {
  public static async getAll(): Promise<any> {
    return fetch(`${import.meta.env.VITE_API_URL}/tenants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error('cannot fethch data');
      }
      return res.json();
    });
    
  }
}

export default TenantService;
