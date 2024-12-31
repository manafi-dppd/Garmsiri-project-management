import {Request, Response} from 'express';

// مدل برای جدول Menu
interface MenuItem {
  id: number;
  active: boolean;
}

// کنترلر برای به‌روزرسانی Menu
export const updateMenu = async (req: Request, res: Response) => {
  const {updates}: {updates: MenuItem[]} = req.body;

  try {
    // شبیه‌سازی ذخیره‌سازی داده‌ها در پایگاه‌داده
    for (const update of updates) {
      await MenuModel.update({active: update.active}, {where: {id: update.id}});
    }

    res.status(200).json({message: 'Menu updated successfully'});
  } catch (error) {
    console.error('Error updating menu:', error);
    res.status(500).json({message: 'Failed to update menu'});
  }
};
