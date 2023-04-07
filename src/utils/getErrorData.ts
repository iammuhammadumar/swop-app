import { ResponseErrors } from '@appello/common/lib/types';

export function getErrorData(error: unknown): ResponseErrors {
  return (error as { data: ResponseErrors }).data;
}
