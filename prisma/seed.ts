import 'dotenv/config';
import { PrismaClient } from '@core/generated/client';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon требует SSL
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const regions = [
    'Алматинская область',
    'Атырауская область',
    'Акмолинская область',
    'Актюбинская область',
    'Жамбылская область',
    'Жетысуская область',
    'Западно-Казахстанская область',
    'Карагандинская область',
    'Костанайская область',
    'Кызылординская область',
    'Мангистауская область',
    'Павлодарская область',
    'Северо-Казахстанская область',
    'Туркестанская область',
    'Улытауская область',
    'Восточно-Казахстанская область',
    'Абайская область',
  ];

  for (const name of regions) {
    await prisma.region.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Regions seeded successfully');

  // Берём регионы в мапу: name -> id
  const regionRows = await prisma.region.findMany({
    select: { id: true, name: true },
  });
  const regionByName = new Map(regionRows.map((r) => [r.name, r.id]));

  const cities: Array<{ name: string; region: string }> = [
    // Города респ. значения (для простоты привяжем к региону-локации)
    { name: 'Алматы', region: 'Алматинская область' },
    { name: 'Астана', region: 'Акмолинская область' },
    { name: 'Шымкент', region: 'Туркестанская область' },

    // Областные центры + крупные
    { name: 'Конаев', region: 'Алматинская область' },
    { name: 'Талдыкорган', region: 'Жетысуская область' },
    { name: 'Караганда', region: 'Карагандинская область' },
    { name: 'Темиртау', region: 'Карагандинская область' },
    { name: 'Павлодар', region: 'Павлодарская область' },
    { name: 'Экибастуз', region: 'Павлодарская область' },
    { name: 'Усть-Каменогорск', region: 'Восточно-Казахстанская область' },
    { name: 'Семей', region: 'Абайская область' },
    { name: 'Актобе', region: 'Актюбинская область' },
    { name: 'Атырау', region: 'Атырауская область' },
    { name: 'Актау', region: 'Мангистауская область' },
    { name: 'Жанаозен', region: 'Мангистауская область' },
    { name: 'Костанай', region: 'Костанайская область' },
    { name: 'Петропавловск', region: 'Северо-Казахстанская область' },
    { name: 'Кокшетау', region: 'Акмолинская область' },
    { name: 'Тараз', region: 'Жамбылская область' },
    { name: 'Кызылорда', region: 'Кызылординская область' },
    { name: 'Уральск', region: 'Западно-Казахстанская область' },
    { name: 'Туркестан', region: 'Туркестанская область' },
    { name: 'Жезказган', region: 'Улытауская область' },
  ];

  for (const c of cities) {
    const regionId = regionByName.get(c.region);
    if (!regionId) {
      console.warn(`Region not found for city ${c.name}: ${c.region}`);
      continue;
    }

    await prisma.city.upsert({
      where: { name_regionId: { name: c.name, regionId } },
      update: {},
      create: { name: c.name, regionId },
    });
  }

  console.log('Cities seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
