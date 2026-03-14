import { Prisma } from '@core/generated/client';

export function supplierProductsSelect(companyId: number, categoryId?: number) {
  return Prisma.sql`
    SELECT p.id,
           p.name,
           o.price,
           p.images,
           o.stock
    FROM products p
           INNER JOIN offers o
                      ON o."productId" = p.id
    WHERE p."isActive" = true
      AND o."companyId" = ${companyId} ${categoryId ? Prisma.sql`AND p."categoryId" = ${categoryId}` : Prisma.empty}
      AND o."isActive" = true
    ORDER BY p.id DESC
  `;
}
