import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useTextDirection = () => {
  const pathname = usePathname();

  useEffect(() => {
    const locale = pathname.split("/")[1];
    const isRTL = ["fa", "ar"].includes(locale);

    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = locale || "fa";

    return () => {
      document.documentElement.dir = "";
      document.documentElement.lang = "";
    };
  }, [pathname]);
};
