import { GLOBAL_ERROR_NAME } from '@appello/common/lib/constants';
import { ResponseErrors } from '@appello/common/lib/types';
import { entries } from '@appello/common/lib/utils/object';
import { showMessage } from 'react-native-flash-message';

interface ShowValidationErrorOptions<TFormValues> {
  errors: ResponseErrors;
  fields?: Record<string, keyof TFormValues>;
  setFieldError?: (name: keyof TFormValues, value: string) => void;
}

export function processApiError<TFormValues>({
  fields = {},
  setFieldError,
  errors,
}: ShowValidationErrorOptions<TFormValues>): void {
  const unknownErrors: { name: string; value: string }[] = [];

  if (errors[GLOBAL_ERROR_NAME]) {
    showMessage({
      message: errors[GLOBAL_ERROR_NAME],
      type: 'danger',
    });
    return;
  }

  entries(errors).forEach(([field, error]) => {
    if (fields[field] && setFieldError) {
      setFieldError(fields[field], error);
    } else {
      unknownErrors.push({ name: field, value: error });
    }
  });

  if (unknownErrors.length > 0) {
    showMessage({
      type: 'danger',
      message: JSON.stringify(unknownErrors),
      duration: 5000,
    });
  }
}
