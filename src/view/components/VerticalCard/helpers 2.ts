import { CardDetails } from '~/models/businessCard';

export const getDetailByName = (
  name: string,
  details?: CardDetails[],
): CardDetails | null | undefined => {
  if (details) {
    return details.find(item => item?.type?.name === name);
  }
  return null;
};
