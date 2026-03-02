import { BadGatewayException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import FormData from 'form-data';
import * as process from 'node:process';

type UploadedFileResult = {
  path?: string;
  url?: string;
};

function isMulterFile(f: unknown): f is Express.Multer.File {
  return (
    !!f &&
    typeof f === 'object' &&
    'buffer' in f &&
    'originalname' in f &&
    'mimetype' in f
  );
}

@Injectable()
export class FileService {
  private readonly http: AxiosInstance;
  private readonly _baseUrl = process.env.FILE_STORAGE_BASE;
  private readonly _projectName = process.env.FILE_STORAGE_PROJECT;

  constructor() {
    this.http = axios.create({
      baseURL: 'http://46.247.41.211',
      timeout: 30_000,
    });
  }

  private _getFormData(file: Express.Multer.File) {
    const formData = new FormData();

    formData.append('file', file.buffer, {
      filename: file.originalname,

      contentType: file.mimetype,
    });
    return formData;
  }

  private _getHeaders(formData: FormData, url: string) {
    return {
      headers: {
        ...formData.getHeaders(),
        'x-project-url': url,
        'x-project-name': this._projectName,
      },
    };
  }

  private _removeLeadingSlash(value: string): string {
    if (value.startsWith('/')) {
      return value.slice(1);
    }
    return value;
  }

  async upload(file: unknown, url: string): Promise<string> {
    if (!isMulterFile(file)) return '';
    const formData = this._getFormData(file);
    try {
      const { data } = await this.http.post<UploadedFileResult>(
        '/file/upload',
        formData,
        this._getHeaders(formData, url),
      );
      return data?.path ? `${data?.path}` : '';
    } catch (e) {
      throw new BadGatewayException('File service upload failed');
    }
  }

  private extractPath(url: string): string {
    try {
      const parsed = new URL(url);
      return parsed.pathname;
    } catch {
      return url;
    }
  }

  async deleteFile(urlOrPath: string) {
    if (!urlOrPath) return false;

    const path = this.extractPath(urlOrPath);
    const encodedPath = encodeURIComponent(path);

    try {
      const { data } = await this.http.delete<{ ok: boolean }>(
        `file/${encodedPath}`,
      );
      return data?.ok === true;
    } catch {
      return false;
    }
  }

  async updateFile(file: Express.Multer.File, url: string, oldUrl: string) {
    try {
      if (oldUrl) await this.deleteFile(oldUrl);
      return await this.upload(file, url);
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
