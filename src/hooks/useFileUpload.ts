import { useState } from 'react';
import { filesApi } from '@/lib/api/files';
import { parseApiError } from '@/lib/utils/parseApiError';

interface UseFileUploadResult {
  upload: (entityId: string, entityType: 'user' | 'order', file: File) => Promise<boolean>;
  uploading: boolean;
  error: string | null;
}

export function useFileUpload(): UseFileUploadResult {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (
    entityId: string,
    entityType: 'user' | 'order',
    file: File,
  ): Promise<boolean> => {
    setUploading(true);
    setError(null);
    try {
      const { fileId, uploadUrl } = await filesApi.presign({
        entityId,
        entityType,
        contentType: file.type,
      });
      await filesApi.uploadToS3(uploadUrl, file);
      await filesApi.complete(fileId);
      return true;
    } catch (e) {
      setError(parseApiError(e));
      return false;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading, error };
}
