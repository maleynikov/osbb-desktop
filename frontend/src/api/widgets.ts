import { Response } from '../interfaces/api';
import { header as authHeader } from '../utils/auth';
import dayjs from 'dayjs';

export interface ReceiptsPayload {
  ids: Array<number>;
  dt: Date;
}

export type Receipt = {
  name: string;
  accNum: number;
  square: number;
  tarif: number;
  dept: number;
  accrued: number;
  paid: number;
  total: number;
}

export const receipts = async (payload: ReceiptsPayload): Promise<Receipt[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/widgets/receipts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify({
      ...payload,
      dt: dayjs(payload.dt).format('YYYY-MM-01'),
    }),
  });

  return await res.json().then((res: Response) => {
    if (res.status === 'FAIL') {
      throw new Error(`fetch fail: ${res.error}`);
    }
    return res.data || [];
  });
}
