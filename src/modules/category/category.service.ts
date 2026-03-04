import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCategoriesTree() {
    return this.prismaService.category.findMany({
      where: {
        parentId: null,
        isActive: true,
      },
      orderBy: [{ sort: 'asc' }, { name: 'asc' }],
      select: {
        id: true,
        name: true,
        slug: true,
        level: true,
        parentId: true,
        iconUrl: true,
        imageUrl: true,
        sort: true,
        children: {
          where: { isActive: true },
          orderBy: [{ sort: 'asc' }, { name: 'asc' }],
          select: {
            id: true,
            name: true,
            slug: true,
            level: true,
            parentId: true,
            iconUrl: true,
            imageUrl: true,
            sort: true,
            children: {
              where: { isActive: true },
              orderBy: [{ sort: 'asc' }, { name: 'asc' }],
              select: {
                id: true,
                name: true,
                slug: true,
                level: true,
                parentId: true,
                iconUrl: true,
                imageUrl: true,
                sort: true,
              },
            },
          },
        },
      },
    });
  }
}
