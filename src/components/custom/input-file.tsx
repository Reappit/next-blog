import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function InputFile({
  label,
  onUpload,
  loading,
}: {
  label: string;
  onUpload: (file?: File) => void;
  loading: boolean;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('InputFile');
  return (
    <div>
      <Label htmlFor="file-upload">{label}</Label>
      <div className="flex items-center gap-10">
        <Input
          id="file-upload"
          type="file"
          ref={inputFileRef}
          disabled={loading}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            onUpload(inputFileRef.current?.files?.[0]);
          }}
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t('upload')}
        </Button>
      </div>
    </div>
  );
}
