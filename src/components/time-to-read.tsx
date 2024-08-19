import { getTranslations } from 'next-intl/server';

const amountSymbolsPerMin = 900;

export default async function TimeToRead({ symbols }: { symbols: number }) {
  const t = await getTranslations('Post');

  const parsedTime = Number.parseInt('' + symbols / amountSymbolsPerMin);
  const time = parsedTime ? parsedTime : 1;

  return <span>{t('timeToRead', { time })}</span>;
}
