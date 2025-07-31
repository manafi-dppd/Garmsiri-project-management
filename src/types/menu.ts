// src/types/menu.ts
export interface Menu {
  id: number;
  title: string;
  title_fa: string;
  title_ar: string;
  title_tr: string;
  active: boolean;
  general: boolean;
  slug: string;
  parent_id: number | null;
  parentSlug?: string | null; // اختیاری برای سازگاری با کامپوننت NavMenu
}