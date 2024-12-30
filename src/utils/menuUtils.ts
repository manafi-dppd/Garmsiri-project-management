// src/utils/menuUtils.ts
export interface Menu {
    id: number;
    title: string;
    title_fa: string;
    active: boolean;
    parentId: number | null;
    slug: string;
    parentSlug: string | null;
  }
  
  export function findMenuPath(slugs: string[], menus: Menu[]): string {
    const path = slugs
      .map((slug) => menus.find((menu) => menu.slug === slug)?.title_fa)
      .filter(Boolean)
      .join(" / ");
    return path || "مسیر یافت نشد";
  }
  
  