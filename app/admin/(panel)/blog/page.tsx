import BlogAdminPanel from "@/components/admin/BlogAdminPanel";

export const metadata = {
  title: "Admin — Blog",
  robots: { index: false, follow: false },
};

export default function AdminBlogPage() {
  return <BlogAdminPanel />;
}
