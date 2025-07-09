import { exit } from "process";
import { PrismaClient } from "../../src/generated/prisma";
import comics from "./comics.json"

const prisma = new PrismaClient();

// console.log(comics) //* debug

export default async function seed() {
    await prisma.comic.deleteMany({})
        .then(() => console.log('✅ Purged basicCells'))
        .catch((err) => {
            console.log('❌ table purge failed: ', err)
            exit()
        })

    const created = await prisma.comic.createMany({
        data: comics.map( (comic,) => ({
            name: comic.name,
            hometown: comic.hometown,
            imdbProfile: comic.imdbProfile
        }))
    })
    console.log('✅ Seeded Comics:', created);
}

seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
  })
  .finally(() => prisma.$disconnect());