const amountSymbolsPerMin = 1350;

export default function TimeToRead({ symbols }: { symbols: number }) {
  const time = Number.parseInt('' + symbols / amountSymbolsPerMin);
  return <span>{time ? time : 1 + ' ' + 'min'}</span>;
}
