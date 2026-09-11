const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const hotelsInDb = await prisma.hotel.findMany({ select: { id: true, name: true, slug: true, top_hotel_rank: true } });
  console.log('Hotels currently in DB (' + hotelsInDb.length + '):');
  hotelsInDb.forEach(h => console.log(`- "${h.name}" (slug: ${h.slug}, rank: ${h.top_hotel_rank})`));
  
  const csvPath = 'C:/Users/ADMIN/Downloads/the luxe/the_luxe_yatra_top_50_india_luxury_hotels_completed (1) (1) - Hotels.csv';
  const content = fs.readFileSync(csvPath, 'utf8');
  console.log('\nMatches in CSV:');
  for (const h of hotelsInDb) {
    if (content.includes(h.name)) {
      console.log(`- MATCH FOUND in CSV for DB hotel: "${h.name}"`);
    }
  }
}
check().catch(console.error).finally(() => prisma.$disconnect());
