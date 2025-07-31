"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("/api/menus?hierarchical=true");
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        await response.json();
      } catch (error) {
        console.error("Error fetching menus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [params, router]);

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  return <div>{children}</div>;
}
