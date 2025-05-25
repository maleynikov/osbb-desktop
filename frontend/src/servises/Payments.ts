import { Payment } from '../pages/Payments/interfaces';
import { header as authHeader } from '../utils/auth';

export default class PaymentsService {
  public static async getAll(): Promise<any> {
    return fetch(`${import.meta.env.VITE_API_URL}/payments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
    }).then((res) => res.json());
  }
  public static async create(data: Payment): Promise<any> {
    return fetch(`${import.meta.env.VITE_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
  public static async delete(ids: Array<Number>): Promise<any> {
    return fetch(`${import.meta.env.VITE_API_URL}/payments`, {
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
