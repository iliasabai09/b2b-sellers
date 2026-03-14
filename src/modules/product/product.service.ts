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
import { CreateProductGroupWithOffersDto } from '@modules/product/to/dto/request/create-product-group.dto';
import { Prisma, Product } from '@core/generated/client';
import { supplierProductsSearchSearchSelect } from '@modules/product/select/supplier-products-search-select';
import { supplierProductsSelect } from '@modules/product/select/supplier-products-select';

type SupplierProductCardRow = {
  id: number;
  name: string;
  images: string[];
  price: Prisma.Decimal | number | null;
  stock: number | null;
};

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

  async createProductGroupWithOffers(
    req: UserJwt,
    dto: CreateProductGroupWithOffersDto,
  ) {
    const companyId = req.user.companyId;

    if (!companyId) {
      throw new BadRequestException('companyId не найден в токене');
    }

    return this.prismaService.$transaction(async (tx) => {
      const group = await tx.productGroup.create({
        data: {
          name: dto.name.trim(),
        },
      });

      const createdProducts: Product[] = [];

      const optionIds = [
        ...new Set(
          dto.variants.flatMap((variant) =>
            variant.optionValues.map((item) => item.optionId),
          ),
        ),
      ];

      const existingOptions = await tx.option.findMany({
        where: {
          id: { in: optionIds },
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (existingOptions.length !== optionIds.length) {
        const existingOptionIds = new Set(
          existingOptions.map((item) => item.id),
        );
        const missingOptionIds = optionIds.filter(
          (id) => !existingOptionIds.has(id),
        );

        throw new BadRequestException(
          `Опции не найдены: ${missingOptionIds.join(', ')}`,
        );
      }

      for (const variant of dto.variants) {
        const productName = [
          dto.name.trim(),
          ...variant.optionValues
            .map((item) => item.value.trim())
            .filter(Boolean),
        ].join(' ');
        const product = await tx.product.create({
          data: {
            name: productName,
            description: dto.description?.trim(),
            images:
              dto.photos?.map((item) => item.trim()).filter(Boolean) ?? [],
            categoryId: dto.categoryId,
            groupId: group.id,
            isActive: true,
          },
        });

        if (dto.specs?.length) {
          await tx.productSpec.createMany({
            data: dto.specs.map((spec) => ({
              productId: product.id,
              specId: spec.specId,
              value: spec.value.trim(),
            })),
          });
        }

        if (variant.optionValues?.length) {
          await tx.productOptionValue.createMany({
            data: variant.optionValues.map((item) => ({
              productId: product.id,
              optionId: item.optionId,
              value: item.value.trim(),
            })),
          });
        }

        await tx.offer.create({
          data: {
            productId: product.id,
            companyId,
            price: variant.offer.price,
            stock: variant.offer.stock ?? 0,
          },
        });

        createdProducts.push(product);
      }

      return {
        group,
        products: createdProducts,
      };
    });
  }

  async getProductsBySupplier(
    companyId: number,
    categoryId?: number,
    search?: string,
  ) {
    if (!companyId) {
      throw new BadRequestException('companyId обязателен');
    }

    const normalizedSearch = search?.trim();

    const rows = normalizedSearch
      ? await this.prismaService.$queryRaw<SupplierProductCardRow[]>(
          supplierProductsSearchSearchSelect(
            companyId,
            categoryId,
            normalizedSearch,
          ),
        )
      : await this.prismaService.$queryRaw<SupplierProductCardRow[]>(
          supplierProductsSelect(companyId, categoryId),
        );
    return rows.map((item) => ({
      id: item.id,
      name: item.name,
      images: item.images,
      price: item.price ? Number(item.price) : null,
      inStock: (item.stock ?? 0) > 0,
    }));
  }
}
