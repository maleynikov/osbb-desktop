import { header as authHeader } from '../utils/auth';

export default class {
  public static async getData(params: any): Promise<any> {
    return fetch(`${import.meta.env.VITE_API_URL}/widgets/receipts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify(params),
    }).then((res) => res.json());
  }
}
