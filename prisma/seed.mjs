import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.accessLevel.deleteMany({});
  await prisma.position.deleteMany({});
  await prisma.menu.deleteMany({});

  console.log('All data has been deleted.');
  const generateSlug = (title) => title.toLowerCase().replace(/\s+/g, '-');
  // اضافه کردن منوهای اصلی
  const mainMenus = await prisma.menu.createMany({
    data: [
      {
        title: 'home',
        title_fa: 'خانه',
        active: true,
        general: false,
        slug: 'home',
      },
      {
        title: 'Current Affairs',
        title_fa: 'امور جاری',
        active: true,
        general: false,
        slug: 'current-affairs',
      },
      {
        title: 'Operation Records',
        title_fa: 'سوابق بهره‌برداری',
        active: true,
        general: false,
        slug: 'operation-records',
      },
      {
        title: 'Execution Records',
        title_fa: 'سوابق اجرا',
        active: true,
        general: false,
        slug: 'execution-records',
      },
      {
        title: 'Study Records',
        title_fa: 'سوابق مطالعات',
        active: true,
        general: false,
        slug: 'study-records',
      },
      {
        title: 'General Specifications',
        title_fa: 'مشخصات عمومی',
        active: true,
        general: true,
        slug: 'general-specifications',
      },
    ],
  });

  // اضافه کردن زیرمنوی "امور جاری"
  const currentAffairsId = await prisma.menu.findFirst({
    where: {title: 'Current Affairs'},
  });

  let subMenus = await prisma.menu.createMany({
    data: [
      {
        title: 'Water Request',
        title_fa: 'درخواست آب',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Water Request')}`,
      },
      {
        title: 'Water Delivery',
        title_fa: 'تحویل آب',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Water Delivery')}`,
      },
      {
        title: 'Service and Maintenance',
        title_fa: 'سرویس و نگهداری',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Service and Maintenance')}`,
      },
      {
        title: 'Repair',
        title_fa: 'تعمیر',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Repair')}`,
      },
      {
        title: 'Pumping shift schedule',
        title_fa: 'برنامه شیفت پمپاژ',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Pumping shift schedule')}`,
      },
      {
        title: 'Security',
        title_fa: 'حراست',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Security')}`,
      },
      {
        title: 'Report',
        title_fa: 'گزارش',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Report')}`,
      },
      {
        title: 'Letter Writing',
        title_fa: 'نامه نگاری',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Letter Writing')}`,
      },
      {
        title: 'Meeting',
        title_fa: 'جلسه',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Meeting')}`,
      },
      {
        title: 'Visit',
        title_fa: 'بازدید',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Visit')}`,
      },
      {
        title: 'Warehouse',
        title_fa: 'انبار',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Warehouse')}`,
      },
      {
        title: 'Circulars',
        title_fa: 'بخشنامه‌ها',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Circulars')}`,
      },
      {
        title: 'Standards andVisit Guidelines',
        title_fa: 'استاندارها و دستورالعمل‌ها',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Standards andVisit Guidelines')}`,
      },
      {
        title: 'Browser Management',
        title_fa: 'مدیریت مرورگر',
        active: true,
        general: false,
        parentId: currentAffairsId?.id,
        slug: `${currentAffairsId?.slug}/${generateSlug('Browser Management')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "درخواست آب"
  const waterRequestId = await prisma.menu.findFirst({
    where: {title: 'Water Request'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Irrigation Calendar',
        title_fa: 'تقویم آبیاری',
        active: true,
        general: false,
        parentId: waterRequestId?.id,
        slug: `${waterRequestId?.slug}/${generateSlug('Irrigation Calendar')}`,
      },
      {
        title: 'Request from Dam',
        title_fa: 'درخواست از سد',
        active: true,
        general: false,
        parentId: waterRequestId?.id,
        slug: `${waterRequestId?.slug}/${generateSlug('Request from Dam')}`,
      },
      {
        title: 'Request from Canal',
        title_fa: 'درخواست از سامانه',
        active: true,
        general: false,
        parentId: waterRequestId?.id,
        slug: `${waterRequestId?.slug}/${generateSlug('Request from Canal')}`,
      },
      {
        title: 'Request from Pumping Station',
        title_fa: 'درخواست از ایستگاه پمپاژ',
        active: true,
        general: false,
        parentId: waterRequestId?.id,
        slug: `${waterRequestId?.slug}/${generateSlug('Request from Pumping Station')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "تحویل آب"
  const waterDeliveryId = await prisma.menu.findFirst({
    where: {title: 'Water Delivery'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Dam Gate Maneuver',
        title_fa: 'مانور دریچه‌های سد',
        active: true,
        general: false,
        parentId: waterDeliveryId?.id,
        slug: `${waterDeliveryId?.slug}/${generateSlug('Dam Gate Maneuver')}`,
      },
      {
        title: 'Maneuvering of Canal and Reservoir Valves and Gates',
        title_fa: 'مانور دریچه‌ها و شیرآلات سامانه ومخازن',
        active: true,
        general: false,
        parentId: waterDeliveryId?.id,
        slug: `${waterDeliveryId?.slug}/${generateSlug('Maneuvering of Canal and Reservoir Valves and Gates')}`,
      },
      {
        title: 'Daily Report of Pumping Stations',
        title_fa: 'گزارش روزانه ایستگاه‌های پمپاژ',
        active: true,
        general: false,
        parentId: waterDeliveryId?.id,
        slug: `${waterDeliveryId?.slug}/${generateSlug('Daily Report of Pumping Stations')}`,
      },
      {
        title: 'Real-time Report of Pumping Stations',
        title_fa: 'گزارش لحظه‌ای ایستگاه‌های پمپاژ',
        active: true,
        general: false,
        parentId: waterDeliveryId?.id,
        slug: `${waterDeliveryId?.slug}/${generateSlug('Real-time Report of Pumping Stations')}`,
      },
      {
        title: 'Flowmeter Reading Outside the Station',
        title_fa: 'رقوم فلومتر خارج ایستگاه',
        active: true,
        general: false,
        parentId: waterDeliveryId?.id,
        slug: `${waterDeliveryId?.slug}/${generateSlug('Flowmeter Reading Outside the Station')}`,
      },
      {
        title: 'Gravity Delivery Water Level Meter',
        title_fa: 'رقوم سطح آب تحویل ثقلی',
        active: true,
        general: false,
        parentId: waterDeliveryId?.id,
        slug: `${waterDeliveryId?.slug}/${generateSlug('DGravity Delivery Water Level Meter')}`,
      },
      {
        title: 'Farm Meter Reading',
        title_fa: 'رقوم کنتور مزرعه',
        active: true,
        general: false,
        parentId: waterDeliveryId?.id,
        slug: `${waterDeliveryId?.slug}/${generateSlug('Farm Meter Reading')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "سرویس و نگهداری"
  const serviceMaintenanceId = await prisma.menu.findFirst({
    where: {title: 'Service and Maintenance'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Pumping Station',
        title_fa: 'ایستگاه پمپاژ',
        active: true,
        general: false,
        parentId: serviceMaintenanceId?.id,
        slug: `${serviceMaintenanceId?.slug}/${generateSlug('Pumping Station')}`,
      },
      {
        title: 'Facility Cleaning',
        title_fa: 'تمیزکاری تاسیسات',
        active: true,
        general: false,
        parentId: serviceMaintenanceId?.id,
        slug: `${serviceMaintenanceId?.slug}/${generateSlug('Facility Cleaning')}`,
      },
      {
        title: 'Canal Dredging',
        title_fa: 'لایروبی سامانه',
        active: true,
        general: false,
        parentId: serviceMaintenanceId?.id,
        slug: `${serviceMaintenanceId?.slug}/${generateSlug('Canal Dredging')}`,
      },
      {
        title: 'Service and Minor Repair',
        title_fa: 'سرویس و تعمیر جزیی',
        active: true,
        general: false,
        parentId: serviceMaintenanceId?.id,
        slug: `${serviceMaintenanceId?.slug}/${generateSlug('Service and Minor Repair')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "تعمیر"
  const repairId = await prisma.menu.findFirst({
    where: {title: 'Repair'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Dam and Canal',
        title_fa: 'سد و سامانه',
        active: true,
        general: false,
        parentId: repairId?.id,
        slug: `${repairId?.slug}/${generateSlug('Dam and Canal')}`,
      },
      {
        title: 'Pumping Station',
        title_fa: 'ایستگاه پمپاژ',
        active: true,
        general: false,
        parentId: repairId?.id,
        slug: `${repairId?.slug}/${generateSlug('Pumping Station')}`,
      },
      {
        title: 'Irrigation Network',
        title_fa: 'شبکه آبیاری',
        active: true,
        general: false,
        parentId: repairId?.id,
        slug: `${repairId?.slug}/${generateSlug('Irrigation Network')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "حراست"
  const securityId = await prisma.menu.findFirst({
    where: {title: 'Security'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Guard Shift Schedule',
        title_fa: 'برنامه شیفت نگهبانان',
        active: true,
        general: false,
        parentId: securityId?.id,
        slug: `${securityId?.slug}/${generateSlug('Guard Shift Schedule')}`,
      },
      {
        title: 'Theft_Damage Report',
        title_fa: 'گزارش سرقت/خرابی',
        active: true,
        general: false,
        parentId: securityId?.id,
        slug: `${securityId?.slug}/${generateSlug('Theft_Damage Report')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "گزارش"
  const reportId = await prisma.menu.findFirst({
    where: {title: 'Report'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Periodic',
        title_fa: 'دوره‌ای',
        active: true,
        general: false,
        parentId: reportId?.id,
        slug: `${reportId?.slug}/${generateSlug('Periodic')}`,
      },
      {
        title: 'Case',
        title_fa: 'موردی',
        active: true,
        general: false,
        parentId: reportId?.id,
        slug: `${reportId?.slug}/${generateSlug('Case')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "نامه نگاری"
  const letterWritingId = await prisma.menu.findFirst({
    where: {title: 'Letter Writing'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Incoming',
        title_fa: 'وارده',
        active: true,
        general: false,
        parentId: letterWritingId?.id,
        slug: `${letterWritingId?.slug}/${generateSlug('Incoming')}`,
      },
      {
        title: 'Issued',
        title_fa: 'صادره',
        active: true,
        general: false,
        parentId: letterWritingId?.id,
        slug: `${letterWritingId?.slug}/${generateSlug('Issued')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "جلسه"
  const meetingId = await prisma.menu.findFirst({
    where: {title: 'Meeting'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Foreign',
        title_fa: 'خارجی',
        active: true,
        general: false,
        parentId: meetingId?.id,
        slug: `${meetingId?.slug}/${generateSlug('Foreign')}`,
      },
      {
        title: 'Domestic',
        title_fa: 'داخلی',
        active: true,
        general: false,
        parentId: meetingId?.id,
        slug: `${meetingId?.slug}/${generateSlug('Domestic')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "بازدید"
  const visitId = await prisma.menu.findFirst({
    where: {title: 'Visit'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Supervisory',
        title_fa: 'نظارتی',
        active: true,
        general: false,
        parentId: visitId?.id,
        slug: `${visitId?.slug}/${generateSlug('Supervisory')}`,
      },
      {
        title: 'Officials',
        title_fa: 'مقامات',
        active: true,
        general: false,
        parentId: visitId?.id,
        slug: `${visitId?.slug}/${generateSlug('Officials')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "انبار"
  const warehouseId = await prisma.menu.findFirst({
    where: {title: 'Warehouse'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Goods Request',
        title_fa: 'درخواست کالا',
        active: true,
        general: false,
        parentId: warehouseId?.id,
        slug: `${warehouseId?.slug}/${generateSlug('Goods Request')}`,
      },
      {
        title: 'Login_Logout',
        title_fa: 'ورود/خروج',
        active: true,
        general: false,
        parentId: warehouseId?.id,
        slug: `${warehouseId?.slug}/${generateSlug('Login_Logout')}`,
      },
    ],
  });

  // اضافه کردن زیرمنوی "سوابق بهره‌برداری"
  const operationRecordsId = await prisma.menu.findFirst({
    where: {title: 'Operation Records'},
  });

  subMenus = await prisma.menu.createMany({
    data: [
      {
        title: 'Water Accounting',
        title_fa: 'حسابداری آب',
        active: true,
        general: false,
        parentId: operationRecordsId?.id,
        slug: `${operationRecordsId?.slug}/${generateSlug('Water Accounting')}`,
      },
      {
        title: 'Repairs',
        title_fa: 'تعمیرات',
        active: true,
        general: false,
        parentId: operationRecordsId?.id,
        slug: `${operationRecordsId?.slug}/${generateSlug('Repairs')}`,
      },
      {
        title: 'Service and Maintenance Records',
        title_fa: 'سرویس و نگهداری',
        active: true,
        general: false,
        parentId: operationRecordsId?.id,
        slug: `${operationRecordsId?.slug}/${generateSlug('Service and Maintenance Records')}`,
      },
      {
        title: 'Warehouse Records',
        title_fa: 'انبار',
        active: true,
        general: false,
        parentId: operationRecordsId?.id,
        slug: `${operationRecordsId?.slug}/${generateSlug('Warehouse Records')}`,
      },
      {
        title: 'Legal Affairs',
        title_fa: 'امور حقوقی',
        active: true,
        general: false,
        parentId: operationRecordsId?.id,
        slug: `${operationRecordsId?.slug}/${generateSlug('Legal Affairs')}`,
      },
      {
        title: 'Security',
        title_fa: 'حراست',
        active: true,
        general: false,
        parentId: operationRecordsId?.id,
        slug: `${operationRecordsId?.slug}/${generateSlug('Security')}`,
      },
      {
        title: 'Correspondence',
        title_fa: 'مکاتبات',
        active: true,
        general: false,
        parentId: operationRecordsId?.id,
        slug: `${operationRecordsId?.slug}/${generateSlug('Correspondence')}`,
      },
      {
        title: 'Reports',
        title_fa: 'گزارشات',
        active: true,
        general: false,
        parentId: operationRecordsId?.id,
        slug: `${operationRecordsId?.slug}/${generateSlug('Reports')}`,
      },
      {
        title: 'Visits',
        title_fa: 'بازدیدها',
        active: true,
        general: false,
        parentId: operationRecordsId?.id,
        slug: `${operationRecordsId?.slug}/${generateSlug('Visits')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "حسابداری آب"
  const waterAccountingId = await prisma.menu.findFirst({
    where: {title: 'Water Accounting'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Dam Balance',
        title_fa: 'بیلان سد',
        active: true,
        general: false,
        parentId: waterAccountingId?.id,
        slug: `${waterAccountingId?.slug}/${generateSlug('Dam Balance')}`,
      },
      {
        title: 'Channel Balance',
        title_fa: 'بیلان سامانه',
        active: true,
        general: false,
        parentId: waterAccountingId?.id,
        slug: `${waterAccountingId?.slug}/${generateSlug('Channel Balance')}`,
      },
      {
        title: 'Irrigation Calendar',
        title_fa: 'تقویم آبیاری',
        active: true,
        general: false,
        parentId: waterAccountingId?.id,
        slug: `${waterAccountingId?.slug}/${generateSlug('Irrigation Calendar')}`,
      },
      {
        title: 'Water Request',
        title_fa: 'درخواست آب',
        active: true,
        general: false,
        parentId: waterAccountingId?.id,
        slug: `${waterAccountingId?.slug}/${generateSlug('Water Request')}`,
      },
      {
        title: 'Water delivery',
        title_fa: 'تحویل آب',
        active: true,
        general: false,
        parentId: waterAccountingId?.id,
        slug: `${waterAccountingId?.slug}/${generateSlug('Water Delivery')}`,
      },
      {
        title: 'Rainfall',
        title_fa: 'بارندگی',
        active: true,
        general: false,
        parentId: waterAccountingId?.id,
        slug: `${waterAccountingId?.slug}/${generateSlug('Rainfall')}`,
      },
      {
        title: 'Dashboard',
        title_fa: 'داشبورد',
        active: true,
        general: false,
        parentId: waterAccountingId?.id,
        slug: `${waterAccountingId?.slug}/${generateSlug('Dashboard')}`,
      },
      {
        title: 'Water Delivery Minutes',
        title_fa: 'صورتجلسات تحویل آب',
        active: true,
        general: false,
        parentId: waterAccountingId?.id,
        slug: `${waterAccountingId?.slug}/${generateSlug('Water Delivery Minutes')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "تعمیرات"
  const repairsId = await prisma.menu.findFirst({
    where: {title: 'Repairs'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Manpower and Machinery',
        title_fa: 'نیروی انسانی و ماشین آلات',
        active: true,
        general: false,
        parentId: repairsId?.id,
        slug: `${repairsId?.slug}/${generateSlug('Manpower and Machinery')}`,
      },
      {
        title: 'Consumer Goods',
        title_fa: 'لوازم مصرفی',
        active: true,
        general: false,
        parentId: repairsId?.id,
        slug: `${repairsId?.slug}/${generateSlug('Consumer Goods')}`,
      },
      {
        title: 'Costs',
        title_fa: 'هزینه‌ها',
        active: true,
        general: false,
        parentId: repairsId?.id,
        slug: `${repairsId?.slug}/${generateSlug('Costs')}`,
      },
      {
        title: 'Dashboard',
        title_fa: 'داشبورد',
        active: true,
        general: false,
        parentId: repairsId?.id,
        slug: `${repairsId?.slug}/${generateSlug('Dashboard')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "سرویس و نگهداری"
  const operationRecordsRecordsId = await prisma.menu.findFirst({
    where: {title: 'Service and Maintenance Records'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Manpower and Machinery',
        title_fa: 'نیروی انسانی و ماشین آلات',
        active: true,
        general: false,
        parentId: operationRecordsRecordsId?.id,
        slug: `${operationRecordsRecordsId?.slug}/${generateSlug('Manpower and Machinery')}`,
      },
      {
        title: 'Consumer Goods',
        title_fa: 'لوازم مصرفی',
        active: true,
        general: false,
        parentId: operationRecordsRecordsId?.id,
        slug: `${operationRecordsRecordsId?.slug}/${generateSlug('Consumer Goods')}`,
      },
      {
        title: 'Costs',
        title_fa: 'هزینه‌ها',
        active: true,
        general: false,
        parentId: operationRecordsRecordsId?.id,
        slug: `${operationRecordsRecordsId?.slug}/${generateSlug('Costs')}`,
      },
      {
        title: 'Dashboard',
        title_fa: 'داشبورد',
        active: true,
        general: false,
        parentId: operationRecordsRecordsId?.id,
        slug: `${operationRecordsRecordsId?.slug}/${generateSlug('Dashboard')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "انبار"
  const warehouseRecordsId = await prisma.menu.findFirst({
    where: {title: 'Warehouse Records'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Inventory',
        title_fa: 'موجودی',
        active: true,
        general: false,
        parentId: warehouseRecordsId?.id,
        slug: `${warehouseRecordsId?.slug}/${generateSlug('Inventory')}`,
      },
      {
        title: 'Login_Logout',
        title_fa: 'ورود/خروج',
        active: true,
        general: false,
        parentId: warehouseRecordsId?.id,
        slug: `${warehouseRecordsId?.slug}/${generateSlug('Login_Logout')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "امور حقوقی"
  const legalAffairsId = await prisma.menu.findFirst({
    where: {title: 'Legal Affairs'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Property List and Documents',
        title_fa: 'لیست و اسناد املاک',
        active: true,
        general: false,
        parentId: legalAffairsId?.id,
        slug: `${legalAffairsId?.slug}/${generateSlug('Property List and Documents')}`,
      },
      {
        title: 'Damages and Fines',
        title_fa: 'خسارت و جریمه',
        active: true,
        general: false,
        parentId: legalAffairsId?.id,
        slug: `${legalAffairsId?.slug}/${generateSlug('Damages and Fines')}`,
      },
      {
        title: 'Opposite',
        title_fa: 'معارض',
        active: true,
        general: false,
        parentId: legalAffairsId?.id,
        slug: `${legalAffairsId?.slug}/${generateSlug('Opposite')}`,
      },
      {
        title: 'Petition_Defense',
        title_fa: 'دادخواست/دفاعیه',
        active: true,
        general: false,
        parentId: legalAffairsId?.id,
        slug: `${legalAffairsId?.slug}/${generateSlug('Petition_Defense')}`,
      },
    ],
  });

  // اضافه کردن زیرمنوی "سوابق اجرا"
  const executionRecordsId = await prisma.menu.findFirst({
    where: {title: 'Execution Records'},
  });

  subMenus = await prisma.menu.createMany({
    data: [
      {
        title: 'Dam',
        title_fa: 'سد',
        active: true,
        general: false,
        parentId: executionRecordsId?.id,
        slug: `${executionRecordsId?.slug}/${generateSlug('Dam')}`,
      },
      {
        title: 'Channel',
        title_fa: 'سامانه',
        active: true,
        general: false,
        parentId: executionRecordsId?.id,
        slug: `${executionRecordsId?.slug}/${generateSlug('Channel')}`,
      },
      {
        title: 'Pumping stations',
        title_fa: 'ایستگاه‌های پمپاژ',
        active: true,
        general: false,
        parentId: executionRecordsId?.id,
        slug: `${executionRecordsId?.slug}/${generateSlug('Pumping stations')}`,
      },
      {
        title: 'Irrigation Networks',
        title_fa: 'شبکه‌های آبیاری',
        active: true,
        general: false,
        parentId: executionRecordsId?.id,
        slug: `${executionRecordsId?.slug}/${generateSlug('Irrigation Networks')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "سد"
  const damId = await prisma.menu.findFirst({
    where: {title: 'Dam'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Specifications',
        title_fa: 'مشخصات',
        active: true,
        general: false,
        parentId: damId?.id,
        slug: `${damId?.slug}/${generateSlug('Specifications')}`,
      },
      {
        title: 'Azbilt Maps',
        title_fa: 'نقشه‌های ازبیلت',
        active: true,
        general: false,
        parentId: damId?.id,
        slug: `${damId?.slug}/${generateSlug('Azbilt Maps')}`,
      },
      {
        title: 'Consumer Goods',
        title_fa: 'لوازم مصرفی',
        active: true,
        general: false,
        parentId: damId?.id,
        slug: `${damId?.slug}/${generateSlug('Consumer Goods')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "سامانه"
  const channelId = await prisma.menu.findFirst({
    where: {title: 'Channel'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Specifications',
        title_fa: 'مشخصات',
        active: true,
        general: false,
        parentId: channelId?.id,
        slug: `${channelId?.slug}/${generateSlug('Specifications')}`,
      },
      {
        title: 'Azbilt Maps',
        title_fa: 'نقشه‌های ازبیلت',
        active: true,
        general: false,
        parentId: channelId?.id,
        slug: `${channelId?.slug}/${generateSlug('Azbilt Maps')}`,
      },
      {
        title: 'Consumer Goods',
        title_fa: 'لوازم مصرفی',
        active: true,
        general: false,
        parentId: channelId?.id,
        slug: `${channelId?.slug}/${generateSlug('Consumer Goods')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "ایستگاه‌های پمپاژ"
  const pumpingStationslId = await prisma.menu.findFirst({
    where: {title: 'Pumping stations'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Specifications',
        title_fa: 'مشخصات',
        active: true,
        general: false,
        parentId: pumpingStationslId?.id,
        slug: `${pumpingStationslId?.slug}/${generateSlug('Specifications')}`,
      },
      {
        title: 'Azbilt Maps',
        title_fa: 'نقشه‌های ازبیلت',
        active: true,
        general: false,
        parentId: pumpingStationslId?.id,
        slug: `${pumpingStationslId?.slug}/${generateSlug('Azbilt Maps')}`,
      },
      {
        title: 'Consumer Goods',
        title_fa: 'لوازم مصرفی',
        active: true,
        general: false,
        parentId: pumpingStationslId?.id,
        slug: `${pumpingStationslId?.slug}/${generateSlug('Consumer Goods')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "شبکه‌های آبیاری"
  const irrigationNetworkslId = await prisma.menu.findFirst({
    where: {title: 'Irrigation Networks'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Specifications',
        title_fa: 'مشخصات',
        active: true,
        general: false,
        parentId: irrigationNetworkslId?.id,
        slug: `${irrigationNetworkslId?.slug}/${generateSlug('Specifications')}`,
      },
      {
        title: 'Azbilt Maps',
        title_fa: 'نقشه‌های ازبیلت',
        active: true,
        general: false,
        parentId: irrigationNetworkslId?.id,
        slug: `${irrigationNetworkslId?.slug}/${generateSlug('Azbilt Maps')}`,
      },
      {
        title: 'Consumer Goods',
        title_fa: 'لوازم مصرفی',
        active: true,
        general: false,
        parentId: irrigationNetworkslId?.id,
        slug: `${irrigationNetworkslId?.slug}/${generateSlug('Consumer Goods')}`,
      },
    ],
  });

  // اضافه کردن زیرمنوی "سوابق مطالعات"
  const studyRecordsId = await prisma.menu.findFirst({
    where: {title: 'Study Records'},
  });

  subMenus = await prisma.menu.createMany({
    data: [
      {
        title: 'First Stage',
        title_fa: 'مرحله اول',
        active: true,
        general: false,
        parentId: studyRecordsId?.id,
        slug: `${studyRecordsId?.slug}/${generateSlug('First Stage')}`,
      },
      {
        title: 'Second Stage',
        title_fa: 'مرحله دوم',
        active: true,
        general: false,
        parentId: studyRecordsId?.id,
        slug: `${studyRecordsId?.slug}/${generateSlug('Second Stage')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "مرحله اول"
  const firstStageId = await prisma.menu.findFirst({
    where: {title: 'First Stage'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Geology and Geotechnics',
        title_fa: 'زمین شناسی و ژئوتکنیک',
        active: true,
        general: false,
        parentId: firstStageId?.id,
        slug: `${firstStageId?.slug}/${generateSlug('Geology and Geotechnics')}`,
      },
      {
        title: 'Meteorology and Hydrology',
        title_fa: 'هواشناسی و هیدرولوژی',
        active: true,
        general: false,
        parentId: firstStageId?.id,
        slug: `${firstStageId?.slug}/${generateSlug('Meteorology and Hydrology')}`,
      },
      {
        title: 'Environment',
        title_fa: 'محیط زیست',
        active: true,
        general: false,
        parentId: firstStageId?.id,
        slug: `${firstStageId?.slug}/${generateSlug('Environment')}`,
      },
      {
        title: 'Sociology',
        title_fa: 'جامعه شناسی',
        active: true,
        general: false,
        parentId: firstStageId?.id,
        slug: `${firstStageId?.slug}/${generateSlug('Sociology')}`,
      },
      {
        title: 'Agriculture and Animal Husbandry',
        title_fa: 'کشاورزی و دامپروری',
        active: true,
        general: false,
        parentId: firstStageId?.id,
        slug: `${firstStageId?.slug}/${generateSlug('Agriculture and Animal Husbandry')}`,
      },
      {
        title: 'AIrrigation and Drainage',
        title_fa: 'آبیاری و زهکشی',
        active: true,
        general: false,
        parentId: firstStageId?.id,
        slug: `${firstStageId?.slug}/${generateSlug('AIrrigation and Drainage')}`,
      },
      {
        title: 'Project Economics',
        title_fa: 'اقتصاد طرح',
        active: true,
        general: false,
        parentId: firstStageId?.id,
        slug: `${firstStageId?.slug}/${generateSlug('Project Economics')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "مرحله دوم"
  const secondStageId = await prisma.menu.findFirst({
    where: {title: 'Second Stage'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Dam',
        title_fa: 'سد',
        active: true,
        general: false,
        parentId: secondStageId?.id,
        slug: `${secondStageId?.slug}/${generateSlug('Dam')}`,
      },
      {
        title: 'Channel',
        title_fa: 'سامانه',
        active: true,
        general: false,
        parentId: secondStageId?.id,
        slug: `${secondStageId?.slug}/${generateSlug('Channel')}`,
      },
      {
        title: 'Pumping Stations',
        title_fa: 'ایستگاه‌های پمپاژ',
        active: true,
        general: false,
        parentId: secondStageId?.id,
        slug: `${secondStageId?.slug}/${generateSlug('Pumping Stations')}`,
      },
      {
        title: 'Irrigation Networks',
        title_fa: 'شبکه‌های آبیاری',
        active: true,
        general: false,
        parentId: secondStageId?.id,
        slug: `${secondStageId?.slug}/${generateSlug('Irrigation Networks')}`,
      },
    ],
  });

  // اضافه کردن زیر زیرمنوهای "مشخصات عمومی"
  const generalSpecificationsId = await prisma.menu.findFirst({
    where: {title: 'General Specifications'},
  });

  await prisma.menu.createMany({
    data: [
      {
        title: 'Overall Design',
        title_fa: 'سیمای کلی طرح',
        active: true,
        general: true,
        parentId: generalSpecificationsId?.id,
        slug: `${generalSpecificationsId?.slug}/${generateSlug('Overall Design')}`,
      },
      {
        title: 'Upstream Facilities of Azgoleh Dam',
        title_fa: 'تاسیسات بالادست سد ازگله',
        active: true,
        general: true,
        parentId: generalSpecificationsId?.id,
        slug: `${generalSpecificationsId?.slug}/${generateSlug('Upstream Facilities of Azgoleh Dam')}`,
      },
      {
        title: 'Azgoleh Dam',
        title_fa: 'سد ازگله',
        active: true,
        general: true,
        parentId: generalSpecificationsId?.id,
        slug: `${generalSpecificationsId?.slug}/${generateSlug('Azgoleh Dam')}`,
      },
      {
        title: 'Garmsiri Channel',
        title_fa: 'سامانه گرمسیری',
        active: true,
        general: true,
        parentId: generalSpecificationsId?.id,
        slug: `${generalSpecificationsId?.slug}/${generateSlug('Garmsiri Channel')}`,
      },
      {
        title: 'Pumping Stations',
        title_fa: 'ایستگاه‌های پمپاژ',
        active: true,
        general: true,
        parentId: generalSpecificationsId?.id,
        slug: `${generalSpecificationsId?.slug}/${generateSlug('Pumping Stations')}`,
      },
      {
        title: 'Irrigation Networks',
        title_fa: 'شبکه‌های آبیاری',
        active: true,
        general: true,
        parentId: generalSpecificationsId?.id,
        slug: `${generalSpecificationsId?.slug}/${generateSlug('Irrigation Networks')}`,
      },
    ],
  });

  // اضافه کردن سمت‌ها
  const positions = await prisma.position.createMany({
    data: [
      {title: 'Website Admin', title_fa: 'ادمین وبسایت'},
      {title: 'Operation Manager', title_fa: 'مدیر بهره‌برداری'},
      {
        title: 'Related Managers of the Water Power Department',
        title_fa: 'مدیران مرتبط آب نیرو',
      },
      {
        title: 'Related Managers of the Ministry of Energy',
        title_fa: ' مدیران مرتبط وزارت نیرو',
      },
      {
        title: 'Electricity and Pumping Supervisor',
        title_fa: 'ناظر برق و پمپاژ',
      },
      {title: 'Execution Representative', title_fa: 'نماینده اجرا'},
      {title: 'Dam Operator', title_fa: 'اپراتور سد'},
      {title: 'Canal Operator', title_fa: 'اپراتور سامانه'},
      {
        title: 'Supervisor of the First Pumping Set',
        title_fa: 'سرپرست مجموعه اول پمپاژ',
      },
      {
        title: 'Supervisor of the Second Pumping Set',
        title_fa: 'سرپرست مجموعه دوم پمپاژ',
      },
      {
        title: 'Operator of the First Pumping Set',
        title_fa: 'اپراتور مجموعه اول پمپاژ',
      },
      {
        title: 'Operator of the Second Pumping Set',
        title_fa: 'اپراتور مجموعه دوم پمپاژ',
      },
      {title: 'Network Operator', title_fa: 'اپراتور شبکه'},
      {title: 'Administrative Officer', title_fa: 'مسئول اداری'},
      {title: 'Security Officer', title_fa: 'مسئول حراست'},
      {title: 'Canal Guard', title_fa: 'نگهبان سامانه'},
      {title: 'Network Guard', title_fa: 'نگهبان شبکه'},
      {title: 'Legal Representative', title_fa: 'نماینده حقوقی'},
      {title: 'Storekeeper', title_fa: 'انباردار'},
      {
        title: 'Regional Water Representative',
        title_fa: 'نماینده آب منطقه‌ای',
        req_license: true,
      },
      {
        title: 'Southern Zahab Water Users Representative',
        title_fa: 'نماینده آببران ازگله',
        req_license: true,
      },
      {
        title: 'Southern Zahab Water Users Representative',
        title_fa: 'نماینده آببران جگیران',
        req_license: true,
      },
      {
        title: 'Southern Zahab Water Users Representative',
        title_fa: 'نماینده آببران ذهاب شمالی',
        req_license: true,
      },
      {
        title: 'Southern Zahab Water Users Representative',
        title_fa: 'نماینده آببران ذهاب جنوبی',
        req_license: true,
      },
      {
        title: 'Hoomeh Qaraviz Water Users Representative',
        title_fa: 'نماینده آببران حومه قراویز',
        req_license: true,
      },
      {
        title: 'Beshiveh Water Users Representative',
        title_fa: 'نماینده آببران بشیوه',
        req_license: true,
      },
      {
        title: 'Ghaleh Shahin Water Users Representative',
        title_fa: 'نماینده آببران قلعه شاهین',
        req_license: true,
      },
      {
        title: 'Water Users Representative South Jagarlu',
        title_fa: 'نماینده آببران جگرلوی جنوبی',
        req_license: true,
      },
      {
        title: 'License Applicant',
        title_fa: 'متقاضی مجوزدار',
        req_license: true,
      },
    ],
  });

  // اضافه کردن سطح دسترسی
  // async function main() {
  const positionsAccess = await prisma.position.findMany();

  const menus = await prisma.menu.findMany();

  // دریافت رکورد منوی "امور جاری" و فرزندان آن
  const omorJariMenu = await prisma.menu.findUnique({
    where: {slug: 'current-affairs'},
  });
  const omorJariChildren = await prisma.menu.findMany({
    where: {parentId: omorJariMenu?.id},
  });
  // دسترسی فقط برای منوهای خاص و فرزندان منوی سوابق بهره‌برداری/حسابداری آب و فرزندانش
  const waterAccountingMenu = await prisma.menu.findUnique({
    where: {slug: 'operation-records/water-accounting'},
  });

  const waterAccountingChildren = await prisma.menu.findMany({
    where: {parentId: waterAccountingMenu?.id},
  });

  // دسترسی فقط برای منوهای خاص و فرزندان منوی امور جاری/گزارش و فرزندانش
  const currentAffairsReportMenu = await prisma.menu.findUnique({
    where: {slug: 'current-affairs/report'},
  });

  const currentAffairsReportChildren = await prisma.menu.findMany({
    where: {parentId: currentAffairsReportMenu?.id},
  });
  // دسترسی فقط برای منوهای خاص و فرزندان منوی امور جاری/حراست و فرزندانش
  const currentAffairsSecurityMenu = await prisma.menu.findUnique({
    where: {slug: 'current-affairs/security'},
  });

  const currentAffairsSecurityChildren = await prisma.menu.findMany({
    where: {parentId: currentAffairsSecurityMenu?.id},
  });
  // دسترسی فقط برای منوهای خاص و فرزندان منوی امور جاری/نامه نگاری و فرزندانش
  const currentAffairsLetterWritingtMenu = await prisma.menu.findUnique({
    where: {slug: 'current-affairs/letter-writing'},
  });

  const currentAffairsLetterWritingtChildren = await prisma.menu.findMany({
    where: {parentId: currentAffairsLetterWritingtMenu?.id},
  });

  // دسترسی فقط برای منوهای خاص و فرزندان منوی امور جاری/جلسه و فرزندانش
  const currentAffairsMeetingMenu = await prisma.menu.findUnique({
    where: {slug: 'current-affairs/meeting'},
  });

  const currentAffairsMeetingChildren = await prisma.menu.findMany({
    where: {parentId: currentAffairsMeetingMenu?.id},
  });

  // دسترسی فقط برای منوهای خاص و فرزندان منوی امور جاری/بازدید و فرزندانش
  const currentAffairsVisitMenu = await prisma.menu.findUnique({
    where: {slug: 'current-affairs/visit'},
  });

  const currentAffairsVisitChildren = await prisma.menu.findMany({
    where: {parentId: currentAffairsVisitMenu?.id},
  });

  // دسترسی فقط برای منوهای خاص و فرزندان منوی امور جاری/انبار و فرزندانش
  const currentAffairsWarehouseMenu = await prisma.menu.findUnique({
    where: {slug: 'current-affairs/warehouse'},
  });

  const currentAffairsWarehouseChildren = await prisma.menu.findMany({
    where: {parentId: currentAffairsWarehouseMenu?.id},
  });

  // دسترسی فقط برای منوهای خاص و فرزندان منوی سوابق بهره‌برداری/تعمیرات
  const operationRecordsRepairsMenu = await prisma.menu.findUnique({
    where: {slug: 'operation-records/repairs'},
  });

  const operationRecordsRepairsChildren = await prisma.menu.findMany({
    where: {parentId: operationRecordsRepairsMenu?.id},
  });

  // دسترسی فقط برای منوهای خاص و فرزندان منوی سوابق بهره‌برداری/سرویس و نگهداری
  const operationRecordsServiceMaintenanceRecordsMenu =
    await prisma.menu.findUnique({
      where: {slug: 'operation-records/service-and-maintenance-records'},
    });

  const operationRecordsServiceMaintenanceRecordsChildren =
    await prisma.menu.findMany({
      where: {
        parentId: operationRecordsServiceMaintenanceRecordsMenu?.id,
      },
    });

  // دسترسی فقط برای منوهای خاص و فرزندان منوی سوابق بهره‌برداری/امور حقوقی
  const operationRecordsLegalAffairsMenu = await prisma.menu.findUnique({
    where: {slug: 'operation-records/legal-affairs'},
  });

  const operationRecordsLegalAffairsChildren = await prisma.menu.findMany({
    where: {
      parentId: operationRecordsLegalAffairsMenu?.id,
    },
  });
  // دسترسی فقط برای منوهای خاص و فرزندان منوی سوابق بهره‌برداری/انبار
  const operationRecordsWarehouseRecordsMenu = await prisma.menu.findUnique({
    where: {slug: 'operation-records/warehouse-records'},
  });

  const operationRecordsWarehouseRecordsChildren = await prisma.menu.findMany({
    where: {
      parentId: operationRecordsWarehouseRecordsMenu?.id,
    },
  });

  // دسترسی فقط برای منوهای خاص و فرزندان منوی سوابق اجرا/سد
  const executionRecordsDamMenu = await prisma.menu.findUnique({
    where: {slug: 'execution-records/dam'},
  });

  const executionRecordsDamChildren = await prisma.menu.findMany({
    where: {
      parentId: executionRecordsDamMenu?.id,
    },
  });

  // دسترسی فقط برای منوهای خاص و فرزندان منوی سوابق اجرا/ایستگاههای پمپاژ
  const executionRecordsPumpingStationsMenu = await prisma.menu.findUnique({
    where: {slug: 'execution-records/pumping-stations'},
  });

  const executionRecordsPumpingStationsChildren = await prisma.menu.findMany({
    where: {
      parentId: executionRecordsPumpingStationsMenu?.id,
    },
  });

  for (const position of positionsAccess) {
    switch (position.title) {
      case 'Website Admin':
        // برای ادمین: تمام رکوردها hasAccess = true
        for (const menu of menus) {
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: true,
            },
          });
        }
        break;

      case 'Operation Manager':
        // برای مدیر بهره‌برداری: همه hasAccess = true بجز "مدیریت مرورگر"
        for (const menu of menus) {
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: menu.title !== 'Browser Management',
            },
          });
        }
        break;

      case 'Related Managers of the Water Power Department':
        // برای مدیران مرتبط آب نیرو: همه hasAccess = true بجز منوهایی که parentId برابر با id "امور جاری" یا فرزندان آن باشد
        for (const menu of menus) {
          const isRestricted =
            menu.parentId === omorJariMenu?.id ||
            omorJariChildren.some((child) => menu.parentId === child.id);
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: !isRestricted,
            },
          });
        }
        break;

      case 'Related Managers of the Ministry of Energy':
        // برای مدیران مرتبط وزارت نیرو

        for (const menu of menus) {
          const hasSpecificAccess =
            menu.slug === 'operation-records' ||
            menu.slug === 'operation-records/water-accounting' ||
            waterAccountingChildren.some((child) => menu.id === child.id) ||
            menu.slug === 'operation-records/repairs/dashboard' ||
            menu.slug ===
              'operation-records/service-and-maintenance-records/dashboard';

          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;

      case 'Electricity and Pumping Supervisor':
        // برای ناظر برق و پمپاژ

        for (const menu of menus) {
          const hasSpecificAccess =
            currentAffairsReportChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsLetterWritingtChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsMeetingChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsVisitChildren.some((child) => menu.id === child.id) ||
            operationRecordsRepairsChildren.some(
              (child) => menu.id === child.id,
            ) ||
            operationRecordsRepairsChildren.some(
              (child) => menu.id === child.id,
            ) ||
            operationRecordsServiceMaintenanceRecordsChildren.some(
              (child) => menu.id === child.id,
            ) ||
            executionRecordsPumpingStationsChildren.some(
              (child) => menu.id === child.id,
            ) ||
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/water-request' ||
            menu.slug ===
              'current-affairs/water-request/request-from-pumping-station' ||
            menu.slug === 'current-affairs/water-delivery' ||
            menu.slug ===
              'current-affairs/water-delivery/real-time-report-of-pumping-stations' ||
            menu.slug ===
              'current-affairs/water-delivery/flowmeter-reading-outside-the-station' ||
            menu.slug === 'current-affairs/report' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/pumping-station' ||
            menu.slug === 'current-affairs/service-and-maintenance' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/service-and-minor-repair' ||
            menu.slug === 'current-affairs/repair' ||
            menu.slug === 'current-affairs/repair/pumping-station' ||
            menu.slug === 'current-affairs/letter-writing' ||
            menu.slug === 'current-affairs/meeting' ||
            menu.slug === 'current-affairs/visit' ||
            menu.slug === 'current-affairs/circulars' ||
            menu.slug === 'current-affairs/standards-andvisit-guidelines' ||
            menu.slug === 'operation-records' ||
            menu.slug === 'operation-records/water-accounting' ||
            menu.slug === 'operation-records/water-accounting/water-delivery' ||
            menu.slug === 'operation-records/water-accounting/dashboard' ||
            menu.slug === 'operation-records/repairs' ||
            menu.slug === 'operation-records/service-and-maintenance-records' ||
            menu.slug === 'operation-records/warehouse-records' ||
            menu.slug === 'operation-records/warehouse-records/inventory' ||
            menu.slug === 'execution-records' ||
            menu.slug === 'execution-records/pumping-stations' ||
            menu.slug === 'study-records' ||
            menu.slug === 'study-records/second-stage' ||
            menu.slug === 'study-records/second-stage/pumping-stations';

          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;

      case 'Execution Representative':
        // برای مدیران مرتبط نماینده اجرا

        for (const menu of menus) {
          const hasSpecificAccess =
            operationRecordsRepairsChildren.some(
              (child) => menu.id === child.id,
            ) ||
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/water-request' ||
            menu.slug === 'current-affairs/water-request/request-from-canal' ||
            menu.slug === 'operation-records' ||
            menu.slug === 'operation-records/water-accounting' ||
            menu.slug === 'operation-records/water-accounting/water-delivery' ||
            menu.slug === 'operation-records/water-accounting/dashboard' ||
            menu.slug === 'operation-records/repairs';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;
      case 'Execution Representative':
        // برای مدیران مرتبط اپراتور سد

        for (const menu of menus) {
          const hasSpecificAccess =
            currentAffairsLetterWritingtChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsMeetingChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsWarehouseChildren.some(
              (child) => menu.id === child.id,
            ) ||
            operationRecordsRepairsMenu.some((child) => menu.id === child.id) ||
            operationRecordsServiceMaintenanceRecordsChildren.some(
              (child) => menu.id === child.id,
            ) ||
            executionRecordsDamChildren.some((child) => menu.id === child.id) ||
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/water-request' ||
            menu.slug === 'current-affairs/water-request/request-from-dam' ||
            menu.slug === 'current-affairs/water-delivery' ||
            menu.slug === 'current-affairs/water-delivery/dam-gate-maneuver' ||
            menu.slug === 'current-affairs/report' ||
            menu.slug === 'current-affairs/report/periodic' ||
            menu.slug === 'current-affairs/report/case' ||
            menu.slug === 'current-affairs/service-and-maintenance' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/facility-cleaning' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/service-and-minor-repair' ||
            menu.slug === 'current-affairs/repair' ||
            menu.slug === 'current-affairs/repair/dam-and-canal' ||
            menu.slug === 'current-affairs/letter-writing' ||
            menu.slug === 'current-affairs/meeting' ||
            menu.slug === 'current-affairs/warehouse' ||
            menu.slug === 'current-affairs/circulars' ||
            menu.slug === 'current-affairs/standards-andvisit-guidelines' ||
            menu.slug === 'operation-records' ||
            menu.slug === 'operation-records/water-accounting' ||
            menu.slug === 'operation-records/water-accounting/dam-balance' ||
            menu.slug === 'operation-records/water-accounting/dashboard' ||
            menu.slug === 'operation-records/repairs' ||
            menu.slug === 'operation-records/service-and-maintenance-records' ||
            menu.slug === 'operation-records/warehouse-records' ||
            menu.slug === 'operation-records/warehouse-records/inventory' ||
            menu.slug === 'execution-records' ||
            menu.slug === 'execution-records/dam' ||
            menu.slug === 'study-records' ||
            menu.slug === 'study-records/second-stage';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;
      case 'Canal Operator':
        // برای اپراتور سامانه

        for (const menu of menus) {
          const hasSpecificAccess =
            operationRecordsServiceMaintenanceRecordsChildren.some(
              (child) => menu.id === child.id,
            ) ||
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/water-request' ||
            menu.slug === 'current-affairs/water-request/request-from-canal' ||
            menu.slug === 'current-affairs/water-delivery' ||
            menu.slug ===
              'current-affairs/water-delivery/maneuvering-of-canal-and-reservoir-valves-and-gates' ||
            menu.slug ===
              'current-affairs/water-delivery/flowmeter-reading-outside-the-station' ||
            menu.slug ===
              'current-affairs/water-delivery/dgravity-delivery-water-level-meter' ||
            menu.slug === 'current-affairs/water-delivery/farm-meter-reading' ||
            menu.slug === 'current-affairs/report' ||
            menu.slug === 'current-affairs/report/case' ||
            menu.slug === 'current-affairs/service-and-maintenance' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/facility-cleaning' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/service-and-minor-repair' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/canal-dredging' ||
            menu.slug === 'current-affairs/security' ||
            menu.slug === 'current-affairs/security/theft_damage-report' ||
            menu.slug === 'current-affairs/circulars' ||
            menu.slug === 'operation-records/service-and-maintenance-records' ||
            menu.slug === 'operation-records/warehouse-records' ||
            menu.slug === 'operation-records/warehouse-records/inventory';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;

      case 'Supervisor of the First Pumping Set':
      case 'Supervisor of the Second Pumping Set':
        // برای سرپرستان پمپاژ

        for (const menu of menus) {
          const hasSpecificAccess =
            currentAffairsReportChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsMeetingChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsVisitChildren.some((child) => menu.id === child.id) ||
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/water-request' ||
            menu.slug ===
              'current-affairs/water-request/request-from-pumping-station' ||
            menu.slug === 'current-affairs/water-delivery' ||
            menu.slug ===
              'current-affairs/water-delivery/daily-report-of-pumping-stations' ||
            menu.slug ===
              'current-affairs/water-delivery/real-time-report-of-pumping-stations' ||
            menu.slug === 'current-affairs/report' ||
            menu.slug === 'current-affairs/service-and-maintenance' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/pumping-station' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/facility-cleaning' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/service-and-minor-repair' ||
            menu.slug === 'current-affairs/repair' ||
            menu.slug === 'current-affairs/repair/pumping-station' ||
            menu.slug === 'current-affairs/meeting' ||
            menu.slug === 'current-affairs/visit' ||
            menu.slug === 'current-affairs/circulars' ||
            menu.slug === 'current-affairs/standards-andvisit-guidelines' ||
            menu.slug === 'operation-records' ||
            menu.slug === 'operation-records/water-accounting' ||
            menu.slug ===
              'operation-records/water-accounting/irrigation-schedule' ||
            menu.slug === 'operation-records/water-accounting/water-delivery' ||
            menu.slug === 'operation-records/water-accounting/dashboard';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;

      case 'Operator of the First Pumping Set':
      case 'Operator of the Second Pumping Set':
        // برای اپراتورهای پمپاژ

        for (const menu of menus) {
          const hasSpecificAccess =
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/water-request' ||
            menu.slug ===
              'current-affairs/water-request/request-from-pumping-station' ||
            menu.slug === 'current-affairs/water-delivery' ||
            menu.slug ===
              'current-affairs/water-delivery/daily-report-of-pumping-stations' ||
            menu.slug ===
              'current-affairs/water-delivery/real-time-report-of-pumping-stations' ||
            menu.slug === 'current-affairs/report' ||
            menu.slug === 'current-affairs/report/case' ||
            menu.slug === 'current-affairs/service-and-maintenance' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/pumping-station' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/facility-cleaning' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/service-and-minor-repair' ||
            menu.slug === 'current-affairs/circulars' ||
            menu.slug === 'current-affairs/standards-andvisit-guidelines';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;

      case 'Network Operator':
        // برای اپراتور شبکه

        for (const menu of menus) {
          const hasSpecificAccess =
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/water-request' ||
            menu.slug === 'current-affairs/water-request/request-from-canal' ||
            menu.slug ===
              'current-affairs/water-request/request-from-pumping-station' ||
            menu.slug === 'current-affairs/water-delivery' ||
            menu.slug ===
              'current-affairs/water-delivery/maneuvering-of-canal-and-reservoir-valves-and-gates' ||
            menu.slug ===
              'current-affairs/water-delivery/flowmeter-reading-outside-the-station' ||
            menu.slug ===
              'current-affairs/water-delivery/dgravity-delivery-water-level-meter' ||
            menu.slug === 'current-affairs/water-delivery/farm-meter-reading' ||
            menu.slug === 'current-affairs/service-and-maintenance' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/facility-cleaning' ||
            menu.slug ===
              'current-affairs/service-and-maintenance/service-and-minor-repair' ||
            menu.slug === 'current-affairs/repair' ||
            menu.slug === 'current-affairs/repair/irrigation-network' ||
            menu.slug === 'current-affairs/security' ||
            menu.slug === 'current-affairs/security/theft_damage-report';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;
      case 'Administrative Officer':
        // برای مسئول اداری

        for (const menu of menus) {
          const hasSpecificAccess =
            currentAffairsReportChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsSecurityChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsLetterWritingtChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsMeetingChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsWarehouseChildren.some(
              (child) => menu.id === child.id,
            ) ||
            operationRecordsLegalAffairsChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsWarehouseChildren.some(
              (child) => menu.id === child.id,
            ) ||
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/report' ||
            menu.slug === 'current-affairs/security' ||
            menu.slug === 'current-affairs/letter-writing' ||
            menu.slug === 'current-affairs/meeting' ||
            menu.slug === 'current-affairs/visit' ||
            menu.slug === 'current-affairs/visit/officials' ||
            menu.slug === 'current-affairs/warehouse' ||
            menu.slug === 'current-affairs/circulars' ||
            menu.slug === 'operation-records' ||
            menu.slug === 'operation-records/legal-affairs' ||
            menu.slug === 'operation-records/security' ||
            menu.slug === 'operation-records/correspondence' ||
            menu.slug === 'operation-records/visits';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;
      case 'Security Officer':
        // برای مسئول حراست

        for (const menu of menus) {
          const hasSpecificAccess =
            currentAffairsSecurityChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsLetterWritingtChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsMeetingChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsVisitChildren.some((child) => menu.id === child.id) ||
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/water-request' ||
            menu.slug === 'current-affairs/water-request/request-from-dam' ||
            menu.slug === 'current-affairs/water-request/request-from-canal' ||
            menu.slug ===
              'current-affairs/water-request/request-from-pumping-station' ||
            menu.slug === 'current-affairs/water-delivery' ||
            menu.slug === 'current-affairs/water-delivery/dam-gate-maneuver' ||
            menu.slug ===
              'current-affairs/water-delivery/maneuvering-of-canal-and-reservoir-valves-and-gates' ||
            menu.slug ===
              'current-affairs/water-delivery/dgravity-delivery-water-level-meter' ||
            menu.slug === 'current-affairs/report' ||
            menu.slug === 'current-affairs/report/case' ||
            menu.slug === 'current-affairs/security' ||
            menu.slug === 'current-affairs/letter-writing' ||
            menu.slug === 'current-affairs/meeting' ||
            menu.slug === 'current-affairs/visit' ||
            menu.slug === 'current-affairs/circulars' ||
            menu.slug === 'operation-records' ||
            menu.slug === 'operation-records/security' ||
            menu.slug === 'execution-records' ||
            menu.slug === 'execution-records/channel' ||
            menu.slug === 'execution-records/channel/azbilt-maps' ||
            menu.slug === 'execution-records/channel/consumer-goods' ||
            menu.slug === 'execution-records/irrigation-networks' ||
            menu.slug === 'execution-records/irrigation-networks/azbilt-maps' ||
            menu.slug ===
              'execution-records/irrigation-networks/consumer-goods';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;

      case 'Canal Guard':
        // برای نگهبان سامانه

        for (const menu of menus) {
          const hasSpecificAccess =
            currentAffairsSecurityChildren.some(
              (child) => menu.id === child.id,
            ) ||
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/water-request' ||
            menu.slug === 'current-affairs/water-request/request-from-canal' ||
            menu.slug === 'current-affairs/water-delivery' ||
            menu.slug ===
              'current-affairs/water-delivery/maneuvering-of-canal-and-reservoir-valves-and-gates' ||
            menu.slug ===
              'current-affairs/water-delivery/dgravity-delivery-water-level-meter' ||
            menu.slug === 'current-affairs/report' ||
            menu.slug === 'current-affairs/report/case' ||
            menu.slug === 'current-affairs/security' ||
            menu.slug === 'current-affairs/circulars' ||
            menu.slug === 'execution-records' ||
            menu.slug === 'execution-records/channel' ||
            menu.slug === 'execution-records/channel/azbilt-maps';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;

      case 'Network Guard':
        // برای نگهبان شبکه

        for (const menu of menus) {
          const hasSpecificAccess =
            currentAffairsSecurityChildren.some(
              (child) => menu.id === child.id,
            ) ||
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/water-request' ||
            menu.slug === 'current-affairs/water-request/request-from-canal' ||
            menu.slug ===
              'current-affairs/water-request/request-from-pumping-station' ||
            menu.slug === 'current-affairs/water-delivery' ||
            menu.slug ===
              'current-affairs/water-delivery/maneuvering-of-canal-and-reservoir-valves-and-gates' ||
            menu.slug === 'current-affairs/report' ||
            menu.slug === 'current-affairs/report/case' ||
            menu.slug === 'current-affairs/security' ||
            menu.slug === 'current-affairs/circulars' ||
            menu.slug === 'execution-records' ||
            menu.slug === 'execution-records/irrigation-networks' ||
            menu.slug === 'execution-records/irrigation-networks/azbilt-maps';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;

      case 'Legal Representative':
        // برای نماینده حقوقی

        for (const menu of menus) {
          const hasSpecificAccess =
            currentAffairsLetterWritingtChildren.some(
              (child) => menu.id === child.id,
            ) ||
            currentAffairsMeetingChildren.some(
              (child) => menu.id === child.id,
            ) ||
            operationRecordsLegalAffairsChildren.some(
              (child) => menu.id === child.id,
            ) ||
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/report' ||
            menu.slug === 'current-affairs/report/case' ||
            menu.slug === 'current-affairs/security' ||
            menu.slug === 'current-affairs/security/theft_damage-report' ||
            menu.slug === 'current-affairs/letter-writing' ||
            menu.slug === 'current-affairs/meeting' ||
            menu.slug === 'current-affairs/circulars' ||
            menu.slug === 'operation-records' ||
            menu.slug === 'operation-records/legal-affairs';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;

      case 'Storekeeper':
        // برای انباردار

        for (const menu of menus) {
          const hasSpecificAccess =
            currentAffairsWarehouseChildren.some(
              (child) => menu.id === child.id,
            ) ||
            operationRecordsWarehouseRecordsChildren.some(
              (child) => menu.id === child.id,
            ) ||
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/warehouse' ||
            menu.slug === 'operation-records' ||
            menu.slug === 'operation-records/warehouse-records';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;
      case 'Regional Water Representative':
        // برای نماینده آب منطقه‌ای

        for (const menu of menus) {
          const hasSpecificAccess =
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/water-request' ||
            menu.slug === 'current-affairs/water-request/irrigation-calendar' ||
            menu.slug === 'current-affairs/water-request/request-from-canal' ||
            menu.slug ===
              'current-affairs/water-request/request-from-pumping-station' ||
            menu.slug === 'current-affairs/water-delivery' ||
            menu.slug === 'current-affairs/water-delivery/farm-meter-reading' ||
            menu.slug ===
              'operation-records/water-accounting/water-delivery-minutes' ||
            menu.slug === 'current-affairs/repair' ||
            menu.slug === 'current-affairs/repair/irrigation-network' ||
            menu.slug === 'operation-records' ||
            menu.slug === 'operation-records/water-accounting' ||
            menu.slug ===
              'operation-records/water-accounting/irrigation-calendar' ||
            menu.slug ===
              'operation-records/water-accounting/irrigation-schedule' ||
            menu.slug ===
              'operation-records/water-accounting/water-delivery-minutes';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;

      case 'License Applicant':
        // برای متقاضی مجوزدار
        break;
      default:
        // برای نمایندگان تعاونی‌ها

        for (const menu of menus) {
          const hasSpecificAccess =
            menu.slug === 'current-affairs' ||
            menu.slug === 'current-affairs/water-request' ||
            menu.slug === 'current-affairs/water-request/irrigation-calendar' ||
            menu.slug === 'current-affairs/water-request/request-from-canal' ||
            menu.slug ===
              'current-affairs/water-request/request-from-pumping-station' ||
            menu.slug === 'current-affairs/water-delivery' ||
            menu.slug === 'current-affairs/water-delivery/farm-meter-reading' ||
            menu.slug === 'operation-records' ||
            menu.slug === 'operation-records/water-accounting' ||
            menu.slug ===
              'operation-records/water-accounting/irrigation-calendar' ||
            menu.slug ===
              'operation-records/water-accounting/irrigation-schedule';
          await prisma.accessLevel.create({
            data: {
              positionId: position.id,
              menuId: menu.id,
              hasAccess: hasSpecificAccess,
            },
          });
        }
        break;

      // case 'XXXX':
      //   // دسترسی به همه منوها بجز موارد مشخص شده
      //   for (const menu of menus) {
      //     const restrictedMenus = [
      //       'current-affairs',
      //       'current-affairs/water-requests',
      //       'current-affairs/water-request/irrigation-calendar',
      //       'current-affairs/water-request/irrigation-calendar',
      //     ];
      //     await prisma.accessLevel.create({
      //       data: {
      //         positionId: position.id,
      //         menuId: menu.id,
      //         hasAccess: !restrictedMenus.includes(menu.slug),
      //       },
      //     });
      //   }
      //   break;

      // // default:
      // case 'yyy':
      //   // فاقد دسترسی به همه منوها بجز موارد مشخص شده
      //   for (const menu of menus) {
      //     const allowedMenus = ['current-affairs','current-affairs/water-request', ]; // لیست منوهایی که باید hasAccess = true باشند
      //     await prisma.accessLevel.create({
      //       data: {
      //         positionId: position.id,
      //         menuId: menu.id,
      //         hasAccess: allowedMenus.includes(menu.slug),
      //       },
      //     });
      //   }
      //   break;
    }
  }
  // }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
