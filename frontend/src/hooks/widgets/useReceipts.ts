import { useQuery } from '@tanstack/react-query';
import { receipts, Receipt, ReceiptsPayload } from '../../api/widgets';

export function useReceipts(payload: ReceiptsPayload) {
  return useQuery<Receipt[]>({
    queryKey: ['receipts', payload],
    queryFn: () => receipts(payload),
  });
}
