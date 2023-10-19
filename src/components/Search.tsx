import Icon from '@/components/Icon';
import { Input } from '@/components/ui/input';

export default function Search() {
  return (
    <>
      <div className="relative">
        <div className="absolute left-[10px] top-[-9px]">
          <Icon name="search" size={18} className="text-muted-foreground" />
        </div>
      </div>
      <Input
        className="rounded-3xl border-none bg-gray-50 indent-6 shadow-none"
        placeholder="Поиск..."
      />
    </>
  );
}
