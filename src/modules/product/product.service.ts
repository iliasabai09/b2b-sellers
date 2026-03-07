import { Injectable } from '@nestjs/common';
import { FileService } from '@core/modules/file/file.service';
import { encodeBaseImgUrl } from '@shared/utils/encodeBaseImgUrl';
import { decodeBaseImgUrl } from '@shared/utils/decodeBaseImgUrl';

@Injectable()
export class ProductService {
  constructor(private readonly fileService: FileService) {}

  async uploadProductImage(file: Express.Multer.File, oldUrl: string = '') {
    let photoUrl: string = '';
    if (file) {
      photoUrl =
        (await this.fileService.updateFile(
          file,
          'products',
          decodeBaseImgUrl(oldUrl),
        )) || '';
    }
    return encodeBaseImgUrl(photoUrl);
  }
}
