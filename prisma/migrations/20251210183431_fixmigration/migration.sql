/*
  Warnings:

  - You are about to drop the `Compte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `clientId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `annee` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courriel` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marque` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modele` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Compte_courriel_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Compte";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plage" DATETIME NOT NULL,
    "nom" TEXT NOT NULL,
    "courriel" TEXT NOT NULL,
    "marque" TEXT NOT NULL,
    "annee" TEXT NOT NULL,
    "modele" TEXT NOT NULL
);
INSERT INTO "new_Reservation" ("createdAt", "id", "plage") SELECT "createdAt", "id", "plage" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
