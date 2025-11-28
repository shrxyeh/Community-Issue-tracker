-- AlterTable
ALTER TABLE "issues" ADD COLUMN     "last_admin_view" TIMESTAMP(3),
ADD COLUMN     "last_reporter_view" TIMESTAMP(3);
