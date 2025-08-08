--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu (
    id integer NOT NULL,
    title text NOT NULL,
    title_fa text NOT NULL,
    active boolean NOT NULL,
    general boolean NOT NULL,
    slug text NOT NULL,
    parent_id integer,
    title_ar text NOT NULL,
    title_tr text NOT NULL
);


ALTER TABLE public.menu OWNER TO postgres;

--
-- Name: menu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menu_id_seq OWNER TO postgres;

--
-- Name: menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_id_seq OWNED BY public.menu.id;


--
-- Name: position; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."position" (
    id integer NOT NULL,
    title text NOT NULL,
    title_fa text NOT NULL,
    req_license boolean DEFAULT false NOT NULL,
    dependent text,
    title_ar text NOT NULL,
    title_tr text NOT NULL
);


ALTER TABLE public."position" OWNER TO postgres;

--
-- Name: position_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.position_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.position_id_seq OWNER TO postgres;

--
-- Name: position_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.position_id_seq OWNED BY public."position".id;


--
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu ALTER COLUMN id SET DEFAULT nextval('public.menu_id_seq'::regclass);


--
-- Name: position id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."position" ALTER COLUMN id SET DEFAULT nextval('public.position_id_seq'::regclass);


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu (id, title, title_fa, active, general, slug, parent_id, title_ar, title_tr) FROM stdin;
3	Operation Records	بهره‌برداری	f	f	operation-records	\N	سجلات العمليات	Operasyon Kayıtları
17	Warehouse	انبار	f	f	current-affairs/warehouse	2	مستودع	Depo
15	Meeting	جلسه	f	f	current-affairs/meeting	2	الاجتماعات	Toplantı
65	Rainfall	بارندگی	f	f	operation-records/water-accounting/rainfall	51	هطول الأمطار	yağış
14	Letter Writing	نامه نگاری	f	f	current-affairs/letter-writing	2	كتابة الرسائل	Mektup Yazımı
11	Pumping shift schedule	برنامه شیفت پمپاژ	f	f	current-affairs/pumping-shift-schedule	2	جدول نوبات الضخ	Pompalama vardiya programı
69	Consumer Goods	لوازم مصرفی	f	f	operation-records/repairs/consumer-goods	52	السلع الاستهلاكية	tüketim malları
70	Costs	هزینه‌ها	f	f	operation-records/repairs/costs	52	التكاليف	Maliyetler
39	Guard Shift Schedule	برنامه شیفت نگهبانان	f	f	current-affairs/security/guard-shift-schedule	12	جدول نوبات الحراسة	Muhafız Vardiya Programı
77	Login_Logout	ورود/خروج	f	f	operation-records/warehouse-records/login_logout	54	تسجيل الدخول/تسجيل الخروج	Giriş/Çıkış
13	Report	گزارش	f	f	current-affairs/report	2	تقرير	Rapor
54	Warehouse Records	انبار	f	f	operation-records/warehouse-records	3	سجلات المستودعات	Depo Kayıtları
55	Legal Affairs	امور حقوقی	f	f	operation-records/legal-affairs	3	الشؤون القانونية	Hukuk İşleri
78	Property List and Documents	لیست و اسناد املاک	f	f	operation-records/legal-affairs/property-list-and-documents	55	قائمة الممتلكات والوثائق	Emlak Listesi ve Belgeler
59	Visits	بازدیدها	f	f	operation-records/visits	3	الزيارات	Ziyaretler
47	Supervisory	نظارتی	f	f	current-affairs/visit/supervisory	16	الإشرافية	Denetleyici
82	Dam	سد	f	f	execution-records/dam	4	سد	Baraj
90	Azbilt Maps	نقشه‌های ازبیلت	f	f	execution-records/channel/azbilt-maps	83	خرائط أزبيلت	Azbilt Haritaları
98	First Stage	مرحله اول	f	f	study-records/first-stage	5	المرحلة الأولى	Birinci Aşama
84	Pumping stations	ایستگاه‌های پمپاژ	f	f	execution-records/pumping-stations	4	محطات الضخ	Pompa istasyonları
89	Specifications	مشخصات	f	f	execution-records/channel/specifications	83	تحديد	özellikler
86	Specifications	مشخصات	f	f	execution-records/dam/specifications	82	تحديد	özellikler
92	Specifications	مشخصات	f	f	execution-records/pumping-stations/specifications	84	تحديد	özellikler
95	Specifications	مشخصات	f	f	execution-records/irrigation-networks/specifications	85	تحديد	özellikler
97	Consumer Goods	لوازم مصرفی	f	f	execution-records/irrigation-networks/consumer-goods	85	السلع الاستهلاكية	tüketim malları
5	Study Records	مطالعات	f	f	study-records	\N	سجلات الدراسة	Çalışma Kayıtları
106	Project Economics	اقتصاد طرح	f	f	study-records/first-stage/project-economics	98	اقتصاديات المشروع	Proje Ekonomisi
111	Overall Design	سیمای کلی طرح	f	t	general-specifications/overall-design	6	التصميم العام	Genel Tasarım
85	Irrigation Networks	شبکه‌های آبیاری	f	f	execution-records/irrigation-networks	4	شبكات الري	Sulama Ağları
21	Irrigation Calendar	تقویم آبیاری	f	f	current-affairs/water-request/irrigation-calendar	7	تقويم الري	Sulama Takvimi
107	Dam	سد	f	f	study-records/second-stage/dam	99	سد	Baraj
110	Irrigation Networks	شبکه‌های آبیاری	f	f	study-records/second-stage/irrigation-networks	99	شبكات الري	Sulama Ağları
99	Second Stage	مرحله دوم	f	f	study-records/second-stage	5	المرحلة الثانية	İkinci Aşama
108	Channel	سامانه	f	f	study-records/second-stage/channel	99	قناة	Kanal
24	Request from Pumping Station	درخواست از ایستگاه پمپاژ	t	f	current-affairs/water-request/request-from-pumping-station	7	طلب من محطة الضخ	Pompa İstasyonundan Talep
22	Request from Dam	درخواست از سد	f	f	current-affairs/water-request/request-from-dam	7	طلب من السد	Barajdan gelen istek
43	Incoming	وارده	f	f	current-affairs/letter-writing/incoming	14	وارد	Gelen
75	Dashboard	داشبورد	f	f	operation-records/service-and-maintenance-records/dashboard	53	لوحة القيادة	gösterge paneli
72	Manpower and Machinery	نیروی انسانی و ماشین آلات	f	f	operation-records/service-and-maintenance-records/manpower-and-machinery	53	القوى العاملة والآلات	İnsan Gücü ve Makine
88	Consumer Goods	لوازم مصرفی	f	f	execution-records/dam/consumer-goods	82	السلع الاستهلاكية	tüketim malları
18	Circulars	بخشنامه‌ها	f	f	current-affairs/circulars	2	النشرات الدورية	Genelgeler
16	Visit	بازدید	f	f	current-affairs/visit	2	يزور	Ziyaret etmek
58	Reports	گزارشات	f	f	operation-records/reports	3	التقارير	Raporlar
12	Security	حراست	f	f	current-affairs/security	2	حماية	Güvenlik
1	home	خانه	t	f	home	\N	بيت	Ev
19	Standards and guidelines	استاندارها و دستورالعمل‌ها	f	f	current-affairs/standards-andvisit-guidelines	2	المعايير وإرشادات الزيارة	Standartlar ve yönergeler
63	Water Request	درخواست آب	f	f	operation-records/water-accounting/water-request	51	طلب المياه	Su Talebi
102	Environment	محیط زیست	f	f	study-records/first-stage/environment	98	بيئة	Çevre
52	Repairs	تعمیرات	f	f	operation-records/repairs	3	الإصلاحات	Onarımlar
42	Case	موردی	f	f	current-affairs/report/case	13	قضية	Dava
93	Azbilt Maps	نقشه‌های ازبیلت	f	f	execution-records/pumping-stations/azbilt-maps	84	خرائط أزبيلت	Azbilt Haritaları
103	Sociology	جامعه شناسی	f	f	study-records/first-stage/sociology	98	علم الاجتماع	Sosyoloji
96	Azbilt Maps	نقشه‌های ازبیلت	f	f	execution-records/irrigation-networks/azbilt-maps	85	خرائط أزبيلت	Azbilt Haritaları
6	General Specifications	مشخصات عمومی	f	t	general-specifications	\N	المواصفات العامة	Genel Özellikler
114	Garmsiri Channel	سامانه گرمسیری	f	t	general-specifications/garmsiri-channel	6	قناة جارمسيري	Garmsiri Kanalı
115	Pumping Stations	ایستگاه‌های پمپاژ	f	t	general-specifications/pumping-stations	6	محطات الضخ	Pompalama İstasyonları
116	Irrigation Networks	شبکه‌های آبیاری	f	t	general-specifications/irrigation-networks	6	شبكات الري	Sulama Ağları
44	Issued	صادره	f	f	current-affairs/letter-writing/issued	14	صادر	Veriliş
2	Current Affairs	امور جاری	t	f	current-affairs	\N	الشؤون الجارية	Güncel Olaylar
7	Water Request	درخواست آب	t	f	current-affairs/water-request	2	طلب المياه	Su Talebi
23	Request from Canal	درخواست از سامانه	f	f	current-affairs/water-request/request-from-canal	7	طلب من القناة	Kanaldan gelen istek
8	Water Delivery	تحویل آب	f	f	current-affairs/water-delivery	2	توصيل المياه	Su Teslimatı
33	Facility Cleaning	تمیزکاری تاسیسات	f	f	current-affairs/service-and-maintenance/facility-cleaning	9	تنظيف المرافق	Tesis Temizliği
74	Costs	هزینه‌ها	f	f	operation-records/service-and-maintenance-records/costs	53	التكاليف	maliyetler
51	Water Accounting	حسابداری آب	f	f	operation-records/water-accounting	3	محاسبة المياه	Su Muhasebesi
64	Water delivery	تحویل آب	f	f	operation-records/water-accounting/water-delivery	51	توصيل المياه	Su Teslimatı
34	Canal Dredging	لایروبی سامانه	f	f	current-affairs/service-and-maintenance/canal-dredging	9	تجريف القناة	Kanal Tarama
60	Dam Balance	بیلان سد	f	f	operation-records/water-accounting/dam-balance	51	توازن السد	Baraj Dengesi
71	Dashboard	داشبورد	f	f	operation-records/repairs/dashboard	52	لوحة القيادة	gösterge paneli
109	Pumping Stations	ایستگاه‌های پمپاژ	f	f	study-records/second-stage/pumping-stations	99	محطات الضخ	Pompalama İstasyonları
10	Repair	تعمیر	f	f	current-affairs/repair	2	بصلح	Tamirat
76	Inventory	موجودی	f	f	operation-records/warehouse-records/inventory	54	جرد	envanter
37	Pumping Station	ایستگاه پمپاژ	f	f	current-affairs/repair/pumping-station	10	محطات الضخ	Pompa İstasyonu
38	Irrigation Network	شبکه آبیاری	f	f	current-affairs/repair/irrigation-network	10	شبكة الري	Sulama Ağı
100	Geology and Geotechnics	زمین شناسی و ژئوتکنیک	f	f	study-records/first-stage/geology-and-geotechnics	98	الجيولوجيا والجيوتقنية	Jeoloji ve Jeoteknik
94	Consumer Goods	لوازم مصرفی	f	f	execution-records/pumping-stations/consumer-goods	84	السلع الاستهلاكية	tüketim malları
113	Ezgeleh Dam	سد ازگله	f	t	general-specifications/azgoleh-dam	6	سد إزغله	Ezgeleh Barajı
56	Security	حراست	f	f	operation-records/security	3	حماية	güvenlik
48	Officials	مقامات	f	f	current-affairs/visit/officials	16	المسؤولون	Yetkililer
80	Opposite	معارض	f	f	operation-records/legal-affairs/opposite	55	عكس	Zıt
46	Domestic	داخلی	f	f	current-affairs/meeting/domestic	15	محلي	Yerel
36	Dam and Canal	سد و سامانه	f	f	current-affairs/repair/dam-and-canal	10	السد والقناة	Baraj ve Kanal
25	Dam Gate Maneuver	مانور دریچه‌های سد	f	f	current-affairs/water-delivery/dam-gate-maneuver	8	مناورة بوابة السد	Baraj Kapısı Manevrası
9	Service and Maintenance	سرویس و نگهداری	f	f	current-affairs/service-and-maintenance	2	الخدمة والصيانة	Servis ve Bakım
32	Pumping Station	ایستگاه پمپاژ	f	f	current-affairs/service-and-maintenance/pumping-station	9	محطة الضخ	pompa istasyonu
62	Irrigation Calendar	تقویم آبیاری	f	f	operation-records/water-accounting/irrigation-calendar	51	تقويم الري	Sulama Takvimi
41	Periodic	دوره‌ای	f	f	current-affairs/report/periodic	13	دورية	Periyodik
61	Channel Balance	بیلان سامانه	f	f	operation-records/water-accounting/channel-balance	51	توازن القناة	Kanal Dengesi
45	Foreign	خارجی	f	f	current-affairs/meeting/foreign	15	أجنبي	yabancı
67	Water Delivery Minutes	صورتجلسات تحویل آب	f	f	operation-records/water-accounting/water-delivery-minutes	51	دقائق توصيل المياه	Su Teslimat Dakikaları
57	Correspondence	مکاتبات	f	f	operation-records/correspondence	3	مراسلة	Yazışmalar
4	Execution Records	اجرا	f	f	execution-records	\N	سجلات التنفيذ	Yürütme Kayıtları
91	Consumer Goods	لوازم مصرفی	f	f	execution-records/channel/consumer-goods	83	السلع الاستهلاكية	tüketim malları
87	Azbilt Maps	نقشه‌های ازبیلت	f	f	execution-records/dam/azbilt-maps	82	خرائط أزبيلت	Azbilt Haritaları
101	Meteorology and Hydrology	هواشناسی و هیدرولوژی	f	f	study-records/first-stage/meteorology-and-hydrology	98	الأرصاد الجوية وعلم المياه	Meteoroloji ve Hidroloji
105	Irrigation and Drainage	آبیاری و زهکشی	f	f	study-records/first-stage/airrigation-and-drainage	98	الري والصرف	Irrigation and Drainage
83	Channel	سامانه	f	f	execution-records/channel	4	قناة	kanal
73	Consumer Goods	لوازم مصرفی	f	f	operation-records/service-and-maintenance-records/consumer-goods	53	السلع الاستهلاكية	Tüketim Malları
53	Service and Maintenance Records	سرویس و نگهداری	f	f	operation-records/service-and-maintenance-records	3	سجلات الخدمة والصيانة	Servis ve Bakım Kayıtları
81	Petition_Defense	دادخواست/دفاعیه	f	f	operation-records/legal-affairs/petition_defense	55	الدفاع عن الالتماس	Dilekçe/Savunma
29	Flowmeter Reading Outside the Station	رقوم فلومتر خارج ایستگاه	f	f	current-affairs/water-delivery/flowmeter-reading-outside-the-station	8	قراءة عداد التدفق خارج المحطة	İstasyon Dışında Debimetre Okuma
68	Manpower and Machinery	نیروی انسانی و ماشین آلات	f	f	operation-records/repairs/manpower-and-machinery	52	القوى العاملة والآلات	İnsan Gücü ve Makine
66	Dashboard	داشبورد	f	f	operation-records/water-accounting/dashboard	51	لوحة القيادة	gösterge paneli
20	Browser Management	مدیریت مرورگر	t	f	current-affairs/browser-management	2	إدارة المتصفح	Tarayıcı Yönetimi
28	Real-time Report of Pumping Stations	گزارش لحظه‌ای ایستگاه‌های پمپاژ	f	f	current-affairs/water-delivery/real-time-report-of-pumping-stations	8	تقرير في الوقت الحقيقي لمحطات الضخ	Pompa İstasyonlarının Gerçek Zamanlı Raporu
104	Agriculture and Animal Husbandry	کشاورزی و دامپروری	f	f	study-records/first-stage/agriculture-and-animal-husbandry	98	الزراعة وتربية الحيوانات	Tarım ve Hayvancılık
31	Farm Meter Reading	رقوم کنتور مزرعه	f	f	current-affairs/water-delivery/farm-meter-reading	8	قراءة عداد المزرعة	Çiftlik Sayaç Okuma
35	Service and Minor Repair	سرویس و تعمیر جزیی	f	f	current-affairs/service-and-maintenance/service-and-minor-repair	9	الخدمة والإصلاحات البسيطة	Servis ve Küçük Onarım
40	Theft_Damage Report	گزارش سرقت/خرابی	f	f	current-affairs/security/theft_damage-report	12	تقرير الأضرار الناجمة عن السرقة	Hırsızlık/Zarar Raporu
79	Damages and Fines	خسارت و جریمه	f	f	operation-records/legal-affairs/damages-and-fines	55	الأضرار والغرامات	Zararlar ve Para Cezaları
112	Upstream Facilities of Ezgeleh Dam	تاسیسات بالادست سد ازگله	f	t	general-specifications/upstream-facilities-of-azgoleh-dam	6	المرافق العليا لسد إزغله	Ezgoleh Barajı'nın Yukarı Akış Tesisleri
26	Maneuvering of Canal and Reservoir Valves and Gates	مانور دریچه‌ها و شیرآلات سامانه ومخازن	f	f	current-affairs/water-delivery/maneuvering-of-canal-and-reservoir-valves-and-gates	8	مناورة صمامات وبوابات القناة والخزان	Kanal ve Rezervuar Vanaları ve Kapılarının Manevrası
27	Daily Report of Pumping Stations	گزارش روزانه ایستگاه‌های پمپاژ	f	f	current-affairs/water-delivery/daily-report-of-pumping-stations	8	التقرير اليومي لمحطات الضخ	Pompa İstasyonlarının Günlük Raporu
50	Login_Logout	ورود/خروج	f	f	current-affairs/warehouse/login_logout	17	تسجيل الدخول تسجيل الخروج	Giriş/Çıkış
49	Goods Request	درخواست کالا	f	f	current-affairs/warehouse/goods-request	17	طلب البضائع	Mal Talebi
30	Gravity Delivery Water Level Meter	رقوم سطح آب تحویل ثقلی	f	f	current-affairs/water-delivery/dgravity-delivery-water-level-meter	8	جهاز قياس مستوى المياه بالجاذبية	Yerçekimi Teslimatlı Su Seviye Ölçer
\.


--
-- Data for Name: position; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."position" (id, title, title_fa, req_license, dependent, title_ar, title_tr) FROM stdin;
19	Storekeeper	انباردار	f	AbNiroo	أمين مخزن	Bakkal
20	Regional Water Representative	نماینده آب منطقه‌ای	f	AbMantgei	ممثل المياه الإقليمي	Bölgesel Su Temsilcisi
21	Ezgeleh Water Users Representative	نماینده آببران ازگله	t	JahadKeshavarzi	ممثل مستخدمي مياه إزغله	Ezgeleh Su Kullanıcıları Temsilcisi
22	Jegiran Water Users Representative	نماینده آببران جگیران	t	JahadKeshavarzi	ممثل مستخدمي مياه جيجيران	Jegiran Su Kullanıcıları Temsilcisi
23	Northern Zahab Water Users Representative	نماینده آببران ذهاب شمالی	t	JahadKeshavarzi	ممثل مستخدمي مياه زهاب الشمالية	Kuzey Zahab Su Kullanıcıları Temsilcisi
24	Southern Zahab Water Users Representative	نماینده آببران ذهاب جنوبی	t	JahadKeshavarzi	ممثل مستخدمي مياه زهاب الجنوبي	Güney Zahab Su Kullanıcıları Temsilcisi
25	Hoomeh Qaraviz Water Users Representative	نماینده آببران حومه قراویز	t	JahadKeshavarzi	ممثل مستخدمي المياه في حومة قراويز	Hoomeh Qaraviz Su Kullanıcıları Temsilcisi
26	Beshiveh Water Users Representative	نماینده آببران بشیوه	t	JahadKeshavarzi	ممثل مستخدمي مياه بشيوه	Beshiveh Su Kullanıcıları Temsilcisi
27	Ghaleh Shahin Water Users Representative	نماینده آببران قلعه شاهین	t	JahadKeshavarzi	قلعة شاهين ممثل مستخدمي المياه	Ghaleh Shahin Su Kullanıcıları Temsilcisi
28	Water Users Representative South Jagarlu	نماینده آببران جگرلوی جنوبی	t	JahadKeshavarzi	ممثل مستخدمي المياه في جنوب ججرلو	Güney Jagarlu Su Kullanıcıları Temsilcisi
29	License Applicant	متقاضی مجوزدار	t	Foreign	مقدم طلب الترخيص	Lisans Başvuru Sahibi
1	Website Admin	ادمین وبسایت	f	Independent	مدير الموقع	Web Sitesi Yöneticisi
2	Operation Manager	مدیر بهره‌برداری آب نیرو	f	AbNiroo	مدير العمليات	Operasyon Müdürü
3	Related Managers of the Water Power Department	مدیران مرتبط آب نیرو	f	Ministry of Niroo	المديرون المعنيون بإدارة الطاقة المائية	Su Gücü Dairesi İlgili Yöneticileri
4	Related Managers of the Ministry of Energy	 مدیران مرتبط وزارت نیرو	f	AbNiroo	المديرين المعنيين بوزارة الطاقة	Enerji Bakanlığı İlgili Yöneticileri
5	Electricity and Pumping Supervisor	ناظر برق و پمپاژ	f	AbNiroo	مشرف الكهرباء والضخ	Elektrik ve Pompalama Sorumlusu
6	Execution Representative	نماینده اجرا	f	AbNiroo	ممثل التنفيذ	İcra Temsilcisi
7	Dam Operator	اپراتور سد	f	AbNiroo	مشغل السد	Baraj İşletmecisi
8	Canal Operator	اپراتور سامانه	f	AbNiroo	مشغل القناة	Kanal Operatörü
9	Supervisor of the First Pumping Set	سرپرست مجموعه اول پمپاژ	f	AbNiroo	مشرف مجموعة الضخ الأولى	İlk Pompalama Setinin Gözetmeni
10	Supervisor of the Second Pumping Set	سرپرست مجموعه دوم پمپاژ	f	AbNiroo	مشرف مجموعة الضخ الثانية	İkinci Pompalama Setinin Gözetmeni
11	Operator of the First Pumping Set	اپراتور مجموعه اول پمپاژ	f	AbNiroo	مشغل مجموعة الضخ الأولى	İlk Pompalama Setinin Operatörü
12	Operator of the Second Pumping Set	اپراتور مجموعه دوم پمپاژ	f	AbNiroo	مشغل مجموعة الضخ الثانية	İkinci Pompalama Setinin Operatörü
13	Network Operator	اپراتور شبکه	f	AbNiroo	مشغل الشبكة	Ağ Operatörü
14	Administrative Officer	مسئول اداری	f	AbNiroo	موظف إداري	İdari Memur
15	Security Officer	مسئول حراست	f	AbNiroo	ضابط أمن	Güvenlik görevlisi
16	Canal Guard	نگهبان سامانه	f	AbNiroo	حارس القناة	Kanal Muhafızları
17	Network Guard	نگهبان شبکه	f	AbNiroo	حارس الشبكة	Ağ Koruyucusu
18	Legal Representative	نماینده حقوقی	f	AbNiroo	الممثل القانوني	Yasal Temsilci
\.


--
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_id_seq', 1, false);


--
-- Name: position_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.position_id_seq', 1, false);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);


--
-- Name: position position_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_pkey PRIMARY KEY (id);


--
-- Name: menu_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_parent_id_idx ON public.menu USING btree (parent_id);


--
-- Name: menu_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_slug_idx ON public.menu USING btree (slug);


--
-- Name: menu_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX menu_slug_key ON public.menu USING btree (slug);


--
-- Name: menu menu_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.menu(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

