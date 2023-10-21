import { differenceInDays, format, formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function PublishedDate({ date }: { date: string }) {
  const isMoreThan7Days = differenceInDays(new Date(date), new Date());
  const formatedDate = format(new Date(date), 'MMM dd, yyyy', {
    locale: ru,
  }).replace('.', '');
  return (
    <span>
      {isMoreThan7Days
        ? formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1)
        : formatRelative(new Date(date), new Date(), {
            locale: ru,
          })}
    </span>
  );
}
