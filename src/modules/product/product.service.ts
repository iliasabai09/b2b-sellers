import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FileService } from '@core/modules/file/file.service';
import { encodeBaseImgUrl } from '@shared/utils/encodeBaseImgUrl';
import { decodeBaseImgUrl } from '@shared/utils/decodeBaseImgUrl';
import { PrismaService } from '@core/prisma/prisma.service';
import { type UserJwt } from '@shared/types/req-user.type';
import { CreateProductWithOfferDto } from '@modules/product/to/dto/request/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly fileService: FileService,
    private readonly prismaService: PrismaService,
  ) {}

  async uploadProductImage(file: Express.Multer.File, oldUrl: string = '') {
    let photoUrl = '';

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

  async createProductWithOffer(req: UserJwt, dto: CreateProductWithOfferDto) {
    const companyId = req.user.companyId;

    if (!companyId) {
      throw new BadRequestException('companyId не найден в токене');
    }

    if (dto.categoryId) {
      const category = await this.prismaService.category.findUnique({
        where: { id: dto.categoryId },
        select: { id: true },
      });

      if (!category) {
        throw new NotFoundException('Категория не найдена');
      }
    }

    if (dto.optionValues?.length) {
      const optionIds = [
        ...new Set(dto.optionValues.map((item) => item.optionId)),
      ];

      const options = await this.prismaService.option.findMany({
        where: { id: { in: optionIds } },
        select: { id: true },
      });

      if (options.length !== optionIds.length) {
        throw new NotFoundException('Одна или несколько опций не найдены');
      }
    }

    return this.prismaService.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name: dto.name.trim(),
          description: dto.description?.trim() || null,
          images: dto.photos.map((item) => item.trim()).filter(Boolean) ?? [],
          categoryId: dto.categoryId ?? null,
          isActive: true,
        },
      });

      if (dto.specs?.length) {
        const specIds = [...new Set(dto.specs.map((item) => item.specId))];
        const specs = await this.prismaService.spec.findMany({
          where: { id: { in: specIds } },
          select: { id: true },
        });

        if (specs.length !== specIds.length) {
          throw new NotFoundException('Один или несколько specs не найдены');
        }

        await tx.productSpec.createMany({
          data: dto.specs.map((item) => ({
            productId: product.id,
            specId: item.specId,
            value: item.value.trim(),
          })),
        });
      }

      if (dto.optionValues?.length) {
        await tx.productOptionValue.createMany({
          data: dto.optionValues.map((item) => ({
            productId: product.id,
            optionId: item.optionId,
            value: item.value.trim(),
          })),
        });
      }

      const offer = await tx.offer.create({
        data: {
          productId: product.id,
          companyId,
          price: dto.offer.price,
          stock: dto.offer.stock ?? 0,
          unit: dto.offer.unit?.trim() || null,
          isActive: dto.offer.isActive ?? true,
        },
      });

      return {
        productId: product.id,
        offerId: offer.id,
      };
    });
  }
}
