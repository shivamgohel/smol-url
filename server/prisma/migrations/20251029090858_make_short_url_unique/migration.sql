/*
  Warnings:

  - A unique constraint covering the columns `[shortUrl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Url_originalUrl_key` ON `Url`;

-- CreateIndex
CREATE UNIQUE INDEX `Url_shortUrl_key` ON `Url`(`shortUrl`);
