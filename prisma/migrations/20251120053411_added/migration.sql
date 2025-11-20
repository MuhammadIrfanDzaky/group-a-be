/*
  Warnings:

  - You are about to drop the column `img_url` on the `products` table. All the data in the column will be lost.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `products_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `review_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewer_name` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_products_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "img_url",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_url" TEXT;

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
DROP COLUMN "products_id",
DROP COLUMN "review_id",
DROP COLUMN "text",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "review_text" TEXT,
ADD COLUMN     "reviewer_name" TEXT NOT NULL,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
