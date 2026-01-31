const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const places = await prisma.lugar.findMany({
        where: {
            slug: {
                in: ['ciervo-pantanos', 'museo-saavedra', 'museo-ciencias-naturales']
            }
        },
        select: {
            nombre: true,
            slug: true,
            imagenes: true
        }
    });

    console.log(JSON.stringify(places, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
