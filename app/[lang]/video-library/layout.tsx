import { notFound } from "next/navigation";

/**
 * تم إخفاء المسار وصفحاته الفرعية بناءً على طلب العميل (بدون حذف الملفات).
 * أي زيارة يدوية ترجع 404.
 * للاستعادة لاحقاً: احذف أو علّق استدعاء notFound() من هذا الملف،
 * وشيل الشرط من middleware.ts، وأعد تفعيل اللينكات في LastNav / FastLinksFooter والصفحة الرئيسية والـ sitemap.
 */
export default function VideoLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  notFound();
  return children;
}
