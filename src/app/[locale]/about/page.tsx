import {useTranslations} from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg">{t('description')}</p>
    </div>
  );
}