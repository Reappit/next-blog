import { useTranslation } from '@/app/i18n';

const amountSymbolsPerMin = 900;

export default async function TimeToRead({ symbols }: { symbols: number }) {
  const { t } = await useTranslation('ru');

  const parsedTime = Number.parseInt('' + symbols / amountSymbolsPerMin);
  const time = parsedTime ? parsedTime : 1;

  return <span>{t('Post.timeToRead', { time })}</span>;
}
