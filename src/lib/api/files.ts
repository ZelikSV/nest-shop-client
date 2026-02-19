import { api } from './client';
import type { FilePresignDto, FilePresignResponse } from '@/types';

export const filesApi = {
  presign: (dto: FilePresignDto) =>
    api.post<FilePresignResponse>('/v1/files/presign', dto),

  complete: (fileId: string) =>
    api.post<void>('/v1/files/complete', { fileId }),

  uploadToS3: async (uploadUrl: string, file: File): Promise<void> => {
    const res = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    });
    if (!res.ok) throw new Error(`S3 upload failed: ${res.status}`);
  },
};
