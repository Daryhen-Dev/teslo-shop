import { initialData } from "@/seed/seed";
import { PrismaClient, Prisma } from "../src/app/generated/prisma";

const prisma = new PrismaClient();

async function main() {

    await prisma.user.deleteMany(),
    await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),   
    await prisma.category.deleteMany()

    const {categories, products, users} = initialData

    await prisma.user.createMany({data: users})


    const categoriesData = categories.map((name) => ({name}))
    await prisma.category.createMany({data: categoriesData})

    const categoriesDB = await prisma.category.findMany()
    
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id
        return map
    }, {} as Record<string,string>)
    
    ///Productos
     products.forEach(async product => {
        const { type, images, ...rest } = product
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })
        ///Imagenes

        const imagenesData = images.map(image => ({
        url:image,
        productId: dbProduct.id
        }))
        await prisma.productImage.createMany({data: imagenesData})
    })


}

main()
    

