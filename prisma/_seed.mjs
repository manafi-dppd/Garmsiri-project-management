import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // افزودن slug برای منوها
  const generateSlug = (title) => title.toLowerCase().replace(/\s+/g, '-');

  // اضافه کردن منوهای اصلی
  const mainMenusResult = await prisma.menu.createMany({
    data: [
      {title: '', title_fa: 'خانه', active: true, slug: ''},
      {
        title: 'Current Affairs',
        title_fa: 'امور جاری',
        active: true,
        slug: 'current-affairs',
      },
      {
        title: 'Operation Records',
        title_fa: 'سوابق بهره‌برداری',
        active: true,
        slug: 'operation-records',
      },
      {
        title: 'Execution Records',
        title_fa: 'سوابق اجرا',
        active: true,
        slug: 'execution-records',
      },
      {
        title: 'Study Records',
        title_fa: 'سوابق مطالعات',
        active: true,
        slug: 'study-records',
      },
      {
        title: 'General Specifications',
        title_fa: 'مشخصات عمومی',
        active: true,
        slug: 'general-specifications',
      },
    ],
  });

  // استفاده از spread operator برای دریافت داده‌ها
  const mainMenusData = await prisma.menu.findMany({
    where: {
      title: {
        in: [
          'Current Affairs',
          'Operation Records',
          'Execution Records',
          'Study Records',
          'General Specifications',
        ],
      },
    },
  });

  // اضافه کردن زیرمنوی "امور جاری"
  const currentAffairs = mainMenusData.find(
    (menu) => menu.title === 'Current Affairs',
  );
  if (!currentAffairs) {
    throw new Error('Main menu "Current Affairs" not found.');
  }

  if (!currentAffairs) {
    throw new Error('Main menu "Current Affairs" not found.');
  }

  let subMenusData = await Promise.all([
    prisma.menu.create({
      data: {
        title: 'Water Request',
        title_fa: 'درخواست آب',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Water Delivery',
        title_fa: 'تحویل آب',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Service and Maintenance',
        title_fa: 'سرویس و نگهداری',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Repair',
        title_fa: 'تعمیر',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Pumping shift schedule',
        title_fa: 'برنامه شیفت پمپاژ',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Security',
        title_fa: 'حراست',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Report',
        title_fa: 'گزارش',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Letter Writing',
        title_fa: 'نامه نگاری',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Meeting',
        title_fa: 'جلسه',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Visit',
        title_fa: 'بازدید',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Warehouse',
        title_fa: 'انبار',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Circulars',
        title_fa: 'بخشنامه‌ها',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Standards andVisit Guidelines',
        title_fa: 'استاندارها و دستورالعمل‌ها',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Browser Management',
        title_fa: 'مدیریت مرورگر',
        active: true,
        parentId: currentAffairs?.id,
      },
    }),
  ]);

  // let subMenusData = await prisma.menu.findMany({
  //   where: { parentId: currentAffairs.id },
  // });

  // اضافه کردن زیر زیرمنوهای "درخواست آب"
  const waterRequest = subMenusData.find(
    (menu) => menu.title === 'Water Request',
  );
  if (!waterRequest) {
    throw new Error('Submenu "Water Request" not found.');
  }

  if (!waterRequest) {
    throw new Error('Submenu "Water Request" not found.');
  }

  let subSubMenusData = await Promise.all([
    prisma.menu.create({
      data: {
        title: 'Irrigation Calendar',
        title_fa: 'تقویم آبیاری',
        active: false,
        parentId: waterRequest?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Request from Dam',
        title_fa: 'درخواست از سد',
        active: false,
        parentId: waterRequest?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Request from Canal',
        title_fa: 'درخواست از سامانه',
        active: true,
        parentId: waterRequest?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Request from Pumping Station',
        title_fa: 'درخواست از ایستگاه پمپاژ',
        active: true,
        parentId: waterRequest?.id,
      },
    }),
  ]);

  // let subSubMenusData = await prisma.menu.findMany({
  //   where: { parentId: waterRequest.id },
  // });

  // افزودن slug برای منوهای اصلی
  for (const menu of mainMenusData) {
    const slug = generateSlug(menu.title);
    await prisma.menu.update({
      where: {id: menu.id},
      data: {slug},
    });
  }

  // افزودن slug برای زیرمنوهای "امور جاری"
  for (const subMenu of subMenusData) {
    const parentSlug =
      (await prisma.menu.findUnique({where: {id: subMenu.parentId}}))?.slug ??
      '';
    const slug = `${parentSlug}/${generateSlug(subMenu.title)}`;
    await prisma.menu.update({
      where: {id: subMenu.id},
      data: {slug},
    });
  }

  // افزودن slug برای زیر زیرمنوهای "درخواست آب"
  for (let subSubMenu of subSubMenusData) {
    const parentSlug =
      (await prisma.menu.findUnique({where: {id: subSubMenu.parentId}}))
        ?.slug ?? '';
    const slug = `${parentSlug}/${generateSlug(subSubMenu.title)}`;
    await prisma.menu.update({
      where: {id: subSubMenu.id},
      data: {slug},
    });
  }

  // اضافه کردن زیر زیرمنوهای "تحویل آب"
  const waterDelivery = await prisma.menu.findFirst({
    where: {title: 'Water Delivery'},
  });

  if (!waterDelivery) {
    throw new Error('Submenu "Water Delivery" not found.');
  }

  await Promise.all([
    prisma.menu.create({
      data: {
        title: 'Dam Gate Maneuver',
        title_fa: 'مانور دریچه‌های سد',
        active: true,
        parentId: waterDelivery?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Maneuvering of Canal and Reservoir Valves and Gates',
        title_fa: 'مانور دریچه‌ها و شیرآلات سامانه ومخازن',
        active: true,
        parentId: waterDelivery?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Daily Report of Pumping Stations',
        title_fa: 'گزارش روزانه ایستگاه‌های پمپاژ',
        active: true,
        parentId: waterDelivery?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Real-time Report of Pumping Stations',
        title_fa: 'گزارش لحظه‌ای ایستگاه‌های پمپاژ',
        active: true,
        parentId: waterDelivery?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Flowmeter Reading Outside the Station',
        title_fa: 'رقوم فلومتر خارج ایستگاه',
        active: true,
        parentId: waterDelivery?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Gravity Delivery Water Level Meter',
        title_fa: 'رقوم سطح آب تحویل ثقلی',
        active: true,
        parentId: waterDelivery?.id,
      },
    }),
    prisma.menu.create({
      data: {
        title: 'Farm Meter Reading',
        title_fa: 'رقوم کنتور مزرعه',
        active: true,
        parentId: waterDelivery?.id,
      },
    }),
  ]);

  subSubMenusData = await prisma.menu.findMany({
    where: {parentId: waterDelivery.id},
  });

  // افزودن slug برای زیر زیرمنوهای "درخواست آب"
  for (let subSubMenu of subSubMenusData) {
    const parentSlug =
      (await prisma.menu.findUnique({where: {id: subSubMenu.parentId}}))
        ?.slug ?? '';
    const slug = `${parentSlug}/${generateSlug(subSubMenu.title)}`;
    await prisma.menu.update({
      where: {id: subSubMenu.id},
      data: {slug},
    });
  }

  console.log('Seeding completed!');

  //   // اضافه کردن زیر زیرمنوهای "سرویس و نگهداری"
  //   const serviceMaintenanceId = await prisma.menu.findFirst({
  //     where: {title: 'Service and Maintenance'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Pumping Station',
  //         title_fa: 'ایستگاه پمپاژ',
  //         active: true,
  //         parentId: serviceMaintenanceId?.id,
  //       },
  //       {
  //         title: 'Facility Cleaning',
  //         title_fa: 'تمیزکاری تاسیسات',
  //         active: true,
  //         parentId: serviceMaintenanceId?.id,
  //       },
  //       {
  //         title: 'Canal Dredging',
  //         title_fa: 'لایروبی سامانه',
  //         active: true,
  //         parentId: serviceMaintenanceId?.id,
  //       },
  //       {
  //         title: 'Service and Minor Repair',
  //         title_fa: 'سرویس و تعمیر جزیی',
  //         active: true,
  //         parentId: serviceMaintenanceId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "تعمیر"
  //   const repairId = await prisma.menu.findFirst({
  //     where: {title: 'Repair'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Dam and Canal',
  //         title_fa: 'سد و سامانه',
  //         active: true,
  //         parentId: repairId?.id,
  //       },
  //       {
  //         title: 'Pumping Station',
  //         title_fa: 'ایستگاه پمپاژ',
  //         active: true,
  //         parentId: repairId?.id,
  //       },
  //       {
  //         title: 'Irrigation Network',
  //         title_fa: 'شبکه آبیاری',
  //         active: true,
  //         parentId: repairId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "حراست"
  //   const securityId = await prisma.menu.findFirst({
  //     where: {title: 'Security'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Guard Shift Schedule',
  //         title_fa: 'برنامه شیفت نگهبانان',
  //         active: true,
  //         parentId: securityId?.id,
  //       },
  //       {
  //         title: 'Theft_Damage Report',
  //         title_fa: 'گزارش سرقت/خرابی',
  //         active: true,
  //         parentId: securityId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "گزارش"
  //   const reportId = await prisma.menu.findFirst({
  //     where: {title: 'Report'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Periodic',
  //         title_fa: 'دوره‌ای',
  //         active: true,
  //         parentId: reportId?.id,
  //       },
  //       {title: 'Case', title_fa: 'موردی', active: true, parentId: reportId?.id},
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "نامه نگاری"
  //   const letterWritingId = await prisma.menu.findFirst({
  //     where: {title: 'Letter Writing'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Incoming',
  //         title_fa: 'وارده',
  //         active: true,
  //         parentId: letterWritingId?.id,
  //       },
  //       {
  //         title: 'Issued',
  //         title_fa: 'صادره',
  //         active: true,
  //         parentId: letterWritingId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "جلسه"
  //   const meetingId = await prisma.menu.findFirst({
  //     where: {title: 'Meeting'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Foreign',
  //         title_fa: 'خارجی',
  //         active: true,
  //         parentId: meetingId?.id,
  //       },
  //       {
  //         title: 'Domestic',
  //         title_fa: 'داخلی',
  //         active: true,
  //         parentId: meetingId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "بازدید"
  //   const visitId = await prisma.menu.findFirst({
  //     where: {title: 'Visit'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Supervisory',
  //         title_fa: 'نظارتی',
  //         active: true,
  //         parentId: visitId?.id,
  //       },
  //       {
  //         title: 'Officials',
  //         title_fa: 'مقامات',
  //         active: true,
  //         parentId: visitId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "انبار"
  //   const warehouseId = await prisma.menu.findFirst({
  //     where: {title: 'Warehouse'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Goods Request',
  //         title_fa: 'درخواست کالا',
  //         active: true,
  //         parentId: warehouseId?.id,
  //       },
  //       {
  //         title: 'Login_Logout',
  //         title_fa: 'ورود/خروج',
  //         active: true,
  //         parentId: warehouseId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیرمنوی "سوابق بهره‌برداری"
  //   const operationRecordsId = await prisma.menu.findFirst({
  //     where: {title: 'Operation Records'},
  //   });

  //   subMenus = await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Water Accounting',
  //         title_fa: 'حسابداری آب',
  //         active: true,
  //         parentId: operationRecordsId?.id,
  //       },
  //       {
  //         title: 'Repairs',
  //         title_fa: 'تعمیرات',
  //         active: true,
  //         parentId: operationRecordsId?.id,
  //       },
  //       {
  //         title: 'Service and Maintenance Records',
  //         title_fa: 'سرویس و نگهداری',
  //         active: true,
  //         parentId: operationRecordsId?.id,
  //       },
  //       {
  //         title: 'Warehouse Records',
  //         title_fa: 'انبار',
  //         active: true,
  //         parentId: operationRecordsId?.id,
  //       },
  //       {
  //         title: 'Legal Affairs',
  //         title_fa: 'امور حقوقی',
  //         active: true,
  //         parentId: operationRecordsId?.id,
  //       },
  //       {
  //         title: 'Security',
  //         title_fa: 'حراست',
  //         active: true,
  //         parentId: operationRecordsId?.id,
  //       },
  //       {
  //         title: 'Correspondence',
  //         title_fa: 'مکاتبات',
  //         active: true,
  //         parentId: operationRecordsId?.id,
  //       },
  //       {
  //         title: 'Reports',
  //         title_fa: 'گزارشات',
  //         active: true,
  //         parentId: operationRecordsId?.id,
  //       },
  //       {
  //         title: 'Visits',
  //         title_fa: 'بازدیدها',
  //         active: true,
  //         parentId: operationRecordsId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "حسابداری آب"
  //   const waterAccountingId = await prisma.menu.findFirst({
  //     where: {title: 'Water Accounting'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Dam Balance',
  //         title_fa: 'بیلان سد',
  //         active: true,
  //         parentId: waterAccountingId?.id,
  //       },
  //       {
  //         title: 'Channel Balance',
  //         title_fa: 'بیلان سامانه',
  //         active: true,
  //         parentId: waterAccountingId?.id,
  //       },
  //       {
  //         title: 'Irrigation Calendar',
  //         title_fa: 'تقویم آبیاری',
  //         active: true,
  //         parentId: waterAccountingId?.id,
  //       },
  //       {
  //         title: 'Irrigation Schedule',
  //         title_fa: 'برنامه آبیاری',
  //         active: true,
  //         parentId: waterAccountingId?.id,
  //       },
  //       {
  //         title: 'Rainfall',
  //         title_fa: 'بارندگی',
  //         active: true,
  //         parentId: waterAccountingId?.id,
  //       },
  //       {
  //         title: 'Dashboard',
  //         title_fa: 'داشبورد',
  //         active: true,
  //         parentId: waterAccountingId?.id,
  //       },
  //       {
  //         title: 'Water Delivery Minutes',
  //         title_fa: 'صورتجلسات تحویل آب',
  //         active: true,
  //         parentId: waterAccountingId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "تعمیرات"
  //   const repairsId = await prisma.menu.findFirst({
  //     where: {title: 'Repairs'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Manpower and Machinery',
  //         title_fa: 'نیروی انسانی و ماشین آلات',
  //         active: true,
  //         parentId: repairsId?.id,
  //       },
  //       {
  //         title: 'Consumer Goods',
  //         title_fa: 'لوازم مصرفی',
  //         active: true,
  //         parentId: repairsId?.id,
  //       },
  //       {
  //         title: 'Costs',
  //         title_fa: 'هزینه‌ها',
  //         active: true,
  //         parentId: repairsId?.id,
  //       },
  //       {
  //         title: 'Dashboard',
  //         title_fa: 'داشبورد',
  //         active: true,
  //         parentId: repairsId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "سرویس و نگهداری"
  //   const operationRecordsRecordsId = await prisma.menu.findFirst({
  //     where: {title: 'Service and Maintenance Records'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Manpower and Machinery',
  //         title_fa: 'نیروی انسانی و ماشین آلات',
  //         active: true,
  //         parentId: operationRecordsRecordsId?.id,
  //       },
  //       {
  //         title: 'Consumer Goods',
  //         title_fa: 'لوازم مصرفی',
  //         active: true,
  //         parentId: operationRecordsRecordsId?.id,
  //       },
  //       {
  //         title: 'Costs',
  //         title_fa: 'هزینه‌ها',
  //         active: true,
  //         parentId: operationRecordsRecordsId?.id,
  //       },
  //       {
  //         title: 'Dashboard',
  //         title_fa: 'داشبورد',
  //         active: true,
  //         parentId: operationRecordsRecordsId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "انبار"
  //   const warehouseRecordsId = await prisma.menu.findFirst({
  //     where: {title: 'Warehouse Records'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Inventory',
  //         title_fa: 'موجودی',
  //         active: true,
  //         parentId: warehouseRecordsId?.id,
  //       },
  //       {
  //         title: 'Login_Logout',
  //         title_fa: 'ورود/خروج',
  //         active: true,
  //         parentId: warehouseRecordsId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "امور حقوقی"
  //   const legalAffairsId = await prisma.menu.findFirst({
  //     where: {title: 'Legal Affairs'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Property List and Documents',
  //         title_fa: 'لیست و اسناد املاک',
  //         active: true,
  //         parentId: legalAffairsId?.id,
  //       },
  //       {
  //         title: 'Damages and Fines',
  //         title_fa: 'خسارت و جریمه',
  //         active: true,
  //         parentId: legalAffairsId?.id,
  //       },
  //       {
  //         title: 'Opposite',
  //         title_fa: 'معارض',
  //         active: true,
  //         parentId: legalAffairsId?.id,
  //       },
  //       {
  //         title: 'Petition_Defense',
  //         title_fa: 'دادخواست/دفاعیه',
  //         active: true,
  //         parentId: legalAffairsId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیرمنوی "سوابق اجرا"
  //   const executionRecordsId = await prisma.menu.findFirst({
  //     where: {title: 'Execution Records'},
  //   });

  //   subMenus = await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Dam',
  //         title_fa: 'سد',
  //         active: true,
  //         parentId: executionRecordsId?.id,
  //       },
  //       {
  //         title: 'Channel',
  //         title_fa: 'سامانه',
  //         active: true,
  //         parentId: executionRecordsId?.id,
  //       },
  //       {
  //         title: 'Pumping stations',
  //         title_fa: 'ایستگاه‌های پمپاژ',
  //         active: true,
  //         parentId: executionRecordsId?.id,
  //       },
  //       {
  //         title: 'Irrigation Networks',
  //         title_fa: 'شبکه‌های آبیاری',
  //         active: true,
  //         parentId: executionRecordsId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "سد"
  //   const damId = await prisma.menu.findFirst({
  //     where: {title: 'Dam'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Specifications',
  //         title_fa: 'مشخصات',
  //         active: true,
  //         parentId: damId?.id,
  //       },
  //       {
  //         title: 'Azbilt Maps',
  //         title_fa: 'نقشه‌های ازبیلت',
  //         active: true,
  //         parentId: damId?.id,
  //       },
  //       {
  //         title: 'Consumer goods',
  //         title_fa: 'لوازم مصرفی',
  //         active: true,
  //         parentId: damId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "سامانه"
  //   const channelId = await prisma.menu.findFirst({
  //     where: {title: 'Channel'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Specifications',
  //         title_fa: 'مشخصات',
  //         active: true,
  //         parentId: channelId?.id,
  //       },
  //       {
  //         title: 'Azbilt Maps',
  //         title_fa: 'نقشه‌های ازبیلت',
  //         active: true,
  //         parentId: channelId?.id,
  //       },
  //       {
  //         title: 'Consumer goods',
  //         title_fa: 'لوازم مصرفی',
  //         active: true,
  //         parentId: channelId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "ایستگاه‌های پمپاژ"
  //   const pumpingStationslId = await prisma.menu.findFirst({
  //     where: {title: 'Pumping stations'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Specifications',
  //         title_fa: 'مشخصات',
  //         active: true,
  //         parentId: pumpingStationslId?.id,
  //       },
  //       {
  //         title: 'Azbilt Maps',
  //         title_fa: 'نقشه‌های ازبیلت',
  //         active: true,
  //         parentId: pumpingStationslId?.id,
  //       },
  //       {
  //         title: 'Consumer goods',
  //         title_fa: 'لوازم مصرفی',
  //         active: true,
  //         parentId: pumpingStationslId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "شبکه‌های آبیاری"
  //   const irrigationNetworkslId = await prisma.menu.findFirst({
  //     where: {title: 'Irrigation Networks'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Specifications',
  //         title_fa: 'مشخصات',
  //         active: true,
  //         parentId: irrigationNetworkslId?.id,
  //       },
  //       {
  //         title: 'Azbilt Maps',
  //         title_fa: 'نقشه‌های ازبیلت',
  //         active: true,
  //         parentId: irrigationNetworkslId?.id,
  //       },
  //       {
  //         title: 'Consumer goods',
  //         title_fa: 'لوازم مصرفی',
  //         active: true,
  //         parentId: irrigationNetworkslId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیرمنوی "سوابق مطالعات"
  //   const studyRecordsId = await prisma.menu.findFirst({
  //     where: {title: 'Study Records'},
  //   });

  //   subMenus = await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'First Stage',
  //         title_fa: 'مرحله اول',
  //         active: true,
  //         parentId: studyRecordsId?.id,
  //       },
  //       {
  //         title: 'Second Stage',
  //         title_fa: 'مرحله دوم',
  //         active: true,
  //         parentId: studyRecordsId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "مرحله اول"
  //   const firstStageId = await prisma.menu.findFirst({
  //     where: {title: 'First Stage'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Geology and Geotechnics',
  //         title_fa: 'زمین شناسی و ژئوتکنیک',
  //         active: true,
  //         parentId: firstStageId?.id,
  //       },
  //       {
  //         title: 'Meteorology and Hydrology',
  //         title_fa: 'هواشناسی و هیدرولوژی',
  //         active: true,
  //         parentId: firstStageId?.id,
  //       },
  //       {
  //         title: 'Environment',
  //         title_fa: 'محیط زیست',
  //         active: true,
  //         parentId: firstStageId?.id,
  //       },
  //       {
  //         title: 'Sociology',
  //         title_fa: 'جامعه شناسی',
  //         active: true,
  //         parentId: firstStageId?.id,
  //       },
  //       {
  //         title: 'Agriculture and Animal Husbandry',
  //         title_fa: 'کشاورزی و دامپروری',
  //         active: true,
  //         parentId: firstStageId?.id,
  //       },
  //       {
  //         title: 'AIrrigation and Drainage',
  //         title_fa: 'آبیاری و زهکشی',
  //         active: true,
  //         parentId: firstStageId?.id,
  //       },
  //       {
  //         title: 'Project Economics',
  //         title_fa: 'اقتصاد طرح',
  //         active: true,
  //         parentId: firstStageId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "مرحله دوم"
  //   const secondStageId = await prisma.menu.findFirst({
  //     where: {title: 'Second Stage'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Dam',
  //         title_fa: 'سد',
  //         active: true,
  //         parentId: secondStageId?.id,
  //       },
  //       {
  //         title: 'Channel',
  //         title_fa: 'سامانه',
  //         active: true,
  //         parentId: secondStageId?.id,
  //       },
  //       {
  //         title: 'Pumping Stations',
  //         title_fa: 'ایستگاه‌های پمپاژ',
  //         active: true,
  //         parentId: secondStageId?.id,
  //       },
  //       {
  //         title: 'Irrigation Networks',
  //         title_fa: 'شبکه‌های آبیاری',
  //         active: true,
  //         parentId: secondStageId?.id,
  //       },
  //     ],
  //   });

  //   // اضافه کردن زیر زیرمنوهای "مشخصات عمومی"
  //   const generalSpecificationsId = await prisma.menu.findFirst({
  //     where: {title: 'General Specifications'},
  //   });

  //   await prisma.menu.createMany({
  //     data: [
  //       {
  //         title: 'Overall Design',
  //         title_fa: 'سیمای کلی طرح',
  //         active: true,
  //         parentId: generalSpecificationsId?.id,
  //       },
  //       {
  //         title: 'Upstream Facilities of Azgoleh Dam',
  //         title_fa: 'تاسیسات بالادست سد ازگله',
  //         active: true,
  //         parentId: generalSpecificationsId?.id,
  //       },
  //       {
  //         title: 'Azgoleh Dam',
  //         title_fa: 'سد ازگله',
  //         active: true,
  //         parentId: generalSpecificationsId?.id,
  //       },
  //       {
  //         title: 'Garmsiri Channel',
  //         title_fa: 'سامانه گرمسیری',
  //         active: true,
  //         parentId: generalSpecificationsId?.id,
  //       },
  //       {
  //         title: 'Pumping Stations',
  //         title_fa: 'ایستگاه‌های پمپاژ',
  //         active: true,
  //         parentId: generalSpecificationsId?.id,
  //       },
  //       {
  //         title: 'Irrigation Networks',
  //         title_fa: 'شبکه‌های آبیاری',
  //         active: true,
  //         parentId: generalSpecificationsId?.id,
  //       },
  //     ],
  //   });

  // اضافه کردن سمت‌ها
  const positions = await prisma.position.createMany({
    data: [
      {title: 'Admin', title_fa: 'ادمین'},
      {title: 'Dam Operator', title_fa: 'اپراتور سد'},
    ],
  });

  // اضافه کردن سطح دسترسی
  const allMenus = await prisma.menu.findMany();
  const adminId = await prisma.position.findFirst({where: {title: 'Admin'}});
  const damOperatorId = await prisma.position.findFirst({
    where: {title: 'Dam Operator'},
  });

  // سطح دسترسی ادمین (همه true)
  for (const menu of allMenus) {
    await prisma.accessLevel.create({
      data: {
        positionId: adminId?.id || 0,
        menuId: menu.id,
        hasAccess: true,
      },
    });
  }

  // سطح دسترسی اپراتور سد
  for (const menu of allMenus) {
    let hasAccess = true;

    // منوهایی که اپراتور سد دسترسی ندارد
    if (
      menu.title === 'Request from Canal' ||
      menu.title === 'Request from Dam'
    ) {
      hasAccess = false;
    }

    await prisma.accessLevel.create({
      data: {
        positionId: damOperatorId?.id || 0,
        menuId: menu.id,
        hasAccess,
      },
    });
  }

  console.log('Seeding completed!');
}

// تابع تولید slug
// function generateSlug(title){
//   if (!title) return '';
//   return title.toLowerCase().replace(/\s+/g, '-');
// }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
