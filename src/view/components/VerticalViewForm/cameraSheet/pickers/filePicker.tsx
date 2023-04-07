import { useCallback, useMemo, useState } from 'react';
import DocumentPicker, { DocumentPickerResponse, types } from 'react-native-document-picker';

import { logger } from '~/utils/logger';

import { pickName } from '../helpers';
import { FileProps } from './photoPicker';

interface UsePDFPicker {
  file: FileProps | null;
  getPDFFromFiles: () => Promise<void>;
  deletePDF: () => void;
}

export const usePDFPicker = (): UsePDFPicker => {
  const [file, setFile] = useState<FileProps | null>(null);

  const saveFile = (file: DocumentPickerResponse[]): void => {
    if (file[0] && file[0].uri) {
      const { uri, type } = file[0];
      const name = pickName(uri);
      setFile({
        name,
        uri,
        type: type || 'photo',
      });
    }
  };

  const getPDFFromFiles = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
      });
      saveFile(response);
    } catch (error) {
      logger.warn(error);
    }
  }, []);

  const deletePDF = useCallback(() => {
    setFile(null);
  }, []);

  return useMemo(
    () => ({
      file,
      getPDFFromFiles,
      deletePDF,
    }),
    [file, getPDFFromFiles, deletePDF],
  );
};
