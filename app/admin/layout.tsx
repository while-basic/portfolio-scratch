import { AdminNav } from "@/components/admin/admin-nav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getIsAuthenticated() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/check-auth`, {
      headers: {
        Cookie: cookies().toString()
      }
    });
    return response.ok;
  } catch {
    return false;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await getIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AdminNav />
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
