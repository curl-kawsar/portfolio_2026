import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata = {
  title: "Admin — Contact Inbox",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return <AdminPanel />;
}
