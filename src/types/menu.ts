// types/menu.ts
export interface UserAccess {
  user_id: number;
  has_access: boolean;
}

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
  user_access: UserAccess[];   // 👈 اضافه شد
}
