import { BadGatewayException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import process from 'node:process';
import FormData from 'form-data';

function isMulterFile(f: unknown): f is Express.Multer.File {
  return (
    !!f &&
    typeof f === 'object' &&
    'buffer' in f &&
    'originalname' in f &&
    'mimetype' in f
  );
}

type UploadedFileResult = {
  key: string;
  url: string;
  project: string;
  folder: string;
  originalName: string;
  mimeType: string;
  size: number;
};

@Injectable()
export class S3FileService {
  private readonly http: AxiosInstance;
  private readonly _projectName = process.env.FILE_STORAGE_PROJECT;

  constructor() {
    this.http = axios.create({
      baseURL: process.env.FILE_STORAGE_BASE,
      timeout: 30_000,
    });
  }

  private _getFormData(
    file: Express.Multer.File,
    folder: string,
    oldKey: string = '',
  ) {
    const formData = new FormData();

    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    formData.append('project', this._projectName);
    formData.append('folder', folder);
    if (oldKey) formData.append('oldKey', oldKey);
    return formData;
  }

  private _getHeaders(formData: FormData) {
    return {
      headers: {
        ...formData.getHeaders(),
      },
    };
  }

  async upload(file: unknown, folder: string): Promise<string> {
    if (!isMulterFile(file)) return '';
    const formData = this._getFormData(file, folder);
    try {
      const { data } = await this.http.post<UploadedFileResult>(
        '/api/files/upload',
        formData,
        this._getHeaders(formData),
      );
      return data?.key ? `${data?.key}` : '';
    } catch (e) {
      throw new BadGatewayException('File service upload failed');
    }
  }

  async update(file: unknown, folder: string, oldKey: string): Promise<string> {
    if (!isMulterFile(file)) return '';
    const formData = this._getFormData(file, folder, oldKey);
    try {
      const { data } = await this.http.post<UploadedFileResult>(
        '/api/files/replace',
        formData,
        this._getHeaders(formData),
      );
      return data?.key ? `${data?.key}` : '';
    } catch (e) {
      throw new BadGatewayException('File service upload failed');
    }
  }

  async delete(key: string): Promise<string> {
    try {
      await this.http.delete('/api/files/delete', {
        params: {
          key,
        },
      });
      return '';
    } catch (e) {
      throw new BadGatewayException('File service upload failed');
    }
  }
}
