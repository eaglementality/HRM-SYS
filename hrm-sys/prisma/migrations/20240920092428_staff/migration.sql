-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
