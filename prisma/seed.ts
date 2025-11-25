import { PrismaClient } from '../generated/prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional)
  await prisma.reviews.deleteMany();
  await prisma.products.deleteMany();

  // Create clothes products
  const products = await prisma.products.createMany({
    data: [
      {
        title: 'Classic White Oversized T-Shirt',
        image_url:
          'https://ninetypercent.com/cdn/shop/files/CopyofCopyofNCTW-0586_White_172_400x.jpg?v=1750168465',
      },
      {
        title: 'Black Zipper Hoodie Premium',
        image_url:
          'https://freshcleantees.com/cdn/shop/files/Black-zip-hoodie-Model-Front-Closer-Unzipped_737x980.jpg?v=1727994997',
      },
      {
        title: 'Light Blue Denim Jacket',
        image_url:
          'https://cdn-img.prettylittlething.com/c/7/d/6/c7d60b81001a9b8bc2578305be42ff61aa2de9b9_cmv9777_2.jpg',
      },
    ],
  });

  const productList = await prisma.products.findMany();

  // Create long reviews for each product
  for (const product of productList) {
    await prisma.reviews.createMany({
      data: [
        {
          product_id: product.id,
          reviewer_name: 'Alice',
          review_text:
            'I was honestly surprised by how good the quality is. The fabric feels thick yet breathable, and the stitching is really clean. After a full day of wearing it, the fit still feels comfortable and not tight at all. Definitely worth the purchase for everyday casual looks.',
        },
        {
          product_id: product.id,
          reviewer_name: 'Michael',
          review_text:
            'The design is simple but stylish, which makes it super easy to pair with jeans or shorts. What I love the most is how soft the material is—way better than I expected at this price point. Even after washing it twice, the shape and color still stay the same.',
        },
        {
          product_id: product.id,
          reviewer_name: 'Sarah',
          review_text:
            'Really impressed! The item arrived nicely packaged and the material feels premium. I’ve worn similar clothing before but this one stands out because of how comfortable it is. Doesn’t feel hot even in warm weather and the size is true to the chart.',
        },
        {
          product_id: product.id,
          reviewer_name: 'David',
          review_text:
            'Great purchase overall. The fit is relaxed but still looks neat, which is perfect for casual outings. I appreciate that the material doesn’t wrinkle easily, making it super convenient to wear right away. I’d recommend this to anyone looking for a reliable basic piece.',
        },
      ],
    });
  }

  console.log('🌱 Clothes product seeding completed with long reviews!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
