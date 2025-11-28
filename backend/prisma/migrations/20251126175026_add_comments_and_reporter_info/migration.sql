-- AlterTable
ALTER TABLE "issues" ADD COLUMN     "reporter_email" TEXT,
ADD COLUMN     "reporter_name" TEXT,
ADD COLUMN     "reporter_phone" TEXT;

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "issue_id" INTEGER NOT NULL,
    "author_name" TEXT NOT NULL,
    "author_type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_issue_id_fkey" FOREIGN KEY ("issue_id") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
