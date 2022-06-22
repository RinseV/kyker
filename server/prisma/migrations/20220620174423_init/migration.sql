CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION nanoid(size int DEFAULT 21)
RETURNS text AS $$
DECLARE
  id text := '';
  i int := 0;
  urlAlphabet char(64) := 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';
  bytes bytea := gen_random_bytes(size);
  byte int;
  pos int;
BEGIN
  WHILE i < size LOOP
    byte := get_byte(bytes, i);
    pos := (byte & 63) + 1; -- + 1 because substr starts at 1 for some reason
    id := id || substr(urlAlphabet, pos, 1);
    i = i + 1;
  END LOOP;
  RETURN id;
END
$$ LANGUAGE PLPGSQL STABLE;

-- CreateEnum
CREATE TYPE "CampSize" AS ENUM ('REST', 'BUSH', 'SATELLITE', 'PICNIC');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT nanoid(),
    "identifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL DEFAULT nanoid(),
    "name" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "lightColor" TEXT NOT NULL DEFAULT E'#ffffff',
    "darkColor" TEXT NOT NULL DEFAULT E'#000000',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spotting" (
    "id" TEXT NOT NULL DEFAULT nanoid(),
    "userId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "visibility" INTEGER NOT NULL,
    "traffic" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spotting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gate" (
    "id" TEXT NOT NULL DEFAULT nanoid(),
    "name" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Camp" (
    "id" TEXT NOT NULL DEFAULT nanoid(),
    "name" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "size" "CampSize" NOT NULL DEFAULT E'PICNIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Camp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_identifier_key" ON "User"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Animal_name_key" ON "Animal"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gate_name_key" ON "Gate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Camp_name_key" ON "Camp"("name");

-- AddForeignKey
ALTER TABLE "Spotting" ADD CONSTRAINT "Spotting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spotting" ADD CONSTRAINT "Spotting_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
