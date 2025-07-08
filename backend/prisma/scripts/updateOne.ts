import { PrismaClient, BasicCell } from "../../src/generated/prisma";

const prisma = new PrismaClient()

async function updateOne() {
    try {
        const update: BasicCell = await prisma.basicCell.update({
            where: { name: 'jupiter'},
            data: {
                name: 'Sol',
                icon: "☉",
                iconCode: "\\u2609"
            }
        })
        console.log('update complete: ', update)
    } catch(err) {
        console.log("update failed: ", err)
    } finally {
        await prisma.$disconnect()
    }
}

updateOne()