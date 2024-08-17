import { useTranslations } from 'next-intl';

const amountSymbolsPerMin = 1350;

export default function TimeToRead({ symbols }: { symbols: number }) {
  const t = useTranslations('Post');
  const parsedTime = Number.parseInt('' + symbols / amountSymbolsPerMin);
  const time = parsedTime ? parsedTime : 1;

  return <span>{t('timeToRead', { time })}</span>;
}
