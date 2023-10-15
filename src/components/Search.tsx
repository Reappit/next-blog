import Icon from '@/components/Icon';
import { Input } from '@/components/ui/input';

export default async function Search() {
  return (
    <>
      <div className="relative">
        <div className="absolute left-[10px] top-[-9px]">
          <Icon name="search" size={18}/>
        </div>
      </div>
      <Input className="rounded-3xl indent-5" placeholder="Seach..." />
    </>
  );
}
