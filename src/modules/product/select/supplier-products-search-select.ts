import { Prisma } from '@core/generated/client';

/*
* export function supplierProductsSearchSearchSelect(
  companyId: number,
  categoryId?: number,
  normalizedSearch: string = '',
) {
  return Prisma.sql`
    SELECT p.id,
           p.name,
           p.images,
           o.price,
           o.stock
    FROM products p
           INNER JOIN offers o
                      ON o."productId" = p.id
    WHERE p."isActive" = true
      AND o."companyId" = ${companyId}
      ${categoryId && categoryId > 0
        ? Prisma.sql`AND p."categoryId" = ${categoryId}`
        : Prisma.empty}
      AND o."isActive" = true
      AND (
        p.name ILIKE ${`%${normalizedSearch}%`}
       OR similarity(p.name, ${normalizedSearch}) > 0.2
       OR word_similarity(p.name, ${normalizedSearch}) > 0.2
      )
    ORDER BY CASE
      WHEN p.name ILIKE ${`%${normalizedSearch}%`} THEN 0
      ELSE 1
    END,
             GREATEST(
               similarity(p.name, ${normalizedSearch}),
    word_similarity(p.name, ${normalizedSearch})
    ) DESC,
    p.id DESC
  `;
}
* */

export function supplierProductsSearchSearchSelect(
  companyId: number,
  categoryId?: number,
  normalizedSearch: string = '',
) {
  return Prisma.sql`
    SELECT p.id,
           p.name,
           p.images,
           o.price,
           o.stock
    FROM products p
           INNER JOIN offers o
                      ON o."productId" = p.id
    WHERE p."isActive" = true
      AND o."companyId" = ${companyId} ${
        categoryId && categoryId > 0
          ? Prisma.sql`AND p."categoryId" = ${categoryId}`
          : Prisma.empty
      }
      AND o."isActive" = true
      AND (
        p.name ILIKE ${`%${normalizedSearch}%`}
       OR similarity(p.name
        , ${normalizedSearch})
        > 0.2
       OR word_similarity(p.name
        , ${normalizedSearch})
        > 0.2
      )
    ORDER BY CASE
      WHEN p.name ILIKE ${`%${normalizedSearch}%`} THEN 0
      ELSE 1
    END
    ,
             GREATEST(
               similarity(p.name,
    ${normalizedSearch}
    ),
    word_similarity
    (
    p
    .
    name,
    ${normalizedSearch}
    )
    )
    DESC,
    p
    .
    id
    DESC
  `;
}
