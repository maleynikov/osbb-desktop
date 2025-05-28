import dayjs from 'dayjs';
import { header as authHeader } from '../utils/auth';

export interface Payload {
  period: {
    from?: Date,
    to?: Date,
  }
}

const baseUrl = `${import.meta.env.VITE_API_URL}/widgets/payments`;

export default class {
  public static async getData(p: Payload): Promise<any> {
    const url = new URL(baseUrl);

    Object.entries(p.period).forEach(([key, val]) => {
      url.searchParams.append(key, dayjs(val).format('YYYY-MM-DD'));
    });

    return fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
    }).then((res) => res.json());
  }
}