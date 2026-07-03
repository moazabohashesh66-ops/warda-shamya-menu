import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const cookieStore = cookies();
  const auth = cookieStore.get("admin");

  console.log("ADMIN COOKIE:", auth);

  if (!auth || auth.value !== "ok") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#120806] text-white p-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
    </div>
  );
}