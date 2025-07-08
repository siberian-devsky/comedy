import { exit } from "process";
import { PrismaClient } from "../../src/generated/prisma";
import planets from "./data.json"

const prisma = new PrismaClient();

console.log(planets)

export default async function seed() {
    await prisma.basicCell.deleteMany({})
        .then(() => console.log('✅ Purged basicCells'))
        .catch((err) => {
            console.log('❌ table purge failed: ', err)
            exit()
        })

    const basicCells = await prisma.basicCell.createMany({
        data: planets.map( (planet, idx) => ({
            currentValue: idx + 1,
            name: planet.name,
            icon: planet.icon,
            iconCode: planet.iconCode,
        }))
    })
    console.log('✅ Seeded basicCells:', basicCells);
}

seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
  })
  .finally(() => prisma.$disconnect());