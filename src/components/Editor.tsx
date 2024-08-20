'use client';

import autosize from 'autosize';
import axios from 'axios';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

import { InputFile } from '@/components/custom/input-file';
import { CustomMdxEditor } from '@/components/mdx-editor';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { savePostController, uploadImageController } from '@/controllers/post';
import { type CategoryDto } from '@/dto/category';
import { type PostDto } from '@/dto/post';
import { env } from '@/env';

interface EditorProps {
  post: PostDto;
  categories: Array<CategoryDto> | null;
}

const cyrillicToTranslit = CyrillicToTranslit();

async function imageUploadHandler({
  image,
  onUploadProgress,
}: {
  image?: File;
  onUploadProgress: (progress: number) => void;
}) {
  if (!image) return {};
  const data = await uploadImageController.uploadImage({
    size: image.size,
    type: image.type,
  });
  await axios.put(data.presignedUrl, image, {
    headers: {
      'Content-Type': image.type,
    },
    onUploadProgress: progress => {
      onUploadProgress(progress.progress ?? 0);
    },
  });
  return { imageId: data.fileId };
}

export default function Editor({ post, categories }: EditorProps) {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const subtitleRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [markdown, setMarkdown] = useState(post.fullStory ?? '');
  const { toast } = useToast();

  const t = useTranslations('EditPostPage');

  const [id, setId] = useState<number | undefined>(post.id);

  const [posterUploadProgress, setPosterUploadProgress] = useState(-1);
  const [posterId, setPosterId] = useState<string | undefined>(
    post.posterId ?? undefined
  );

  useEffect(() => {
    autosize(titleRef.current as unknown as Element);
    autosize(subtitleRef.current as unknown as Element);
  }, []);

  const [savePostState, savePost] = useFormState(
    savePostController.savePost,
    {}
  );

  useEffect(() => {
    if (savePostState.error) {
      toast({
        title: 'Not saved',
        description: '' + savePostState.error,
        variant: 'destructive',
        duration: 3000,
      });
    } else if (savePostState.id) {
      toast({ title: 'Saved', description: savePostState.id, duration: 3000 });
      setId(parseInt(savePostState.id));
    } else {
      toast({
        title: 'Id is not changed',
        description: savePostState.id,
        duration: 3000,
      });
    }
  }, [savePostState]);

  console.log(posterId);
  return (
    <div className="m-auto max-w-[700px]">
      <div className="mt-[1.19em] flex flex-col items-center">
        <form className="w-full" action={savePost} ref={formRef}>
          <input type="hidden" name="fullStory" value={markdown} />
          {Number.isInteger(id) && <input type="hidden" name="id" value={id} />}
          <input
            type="hidden"
            name="metaTitle"
            value={cyrillicToTranslit
              .transform(titleRef.current?.value ?? '', '-')
              .replaceAll(/-{2,}/g, '-')
              .toLowerCase()}
          />
          {posterId && <input type="hidden" name="posterId" value={posterId} />}
          <Textarea
            name="title"
            placeholder="Заголовок"
            className="h-[42px] resize-none border-none px-0 text-[42px] leading-[52px] shadow-none focus-visible:ring-0"
            ref={titleRef}
            defaultValue={post.title ?? ''}
          />
          <Textarea
            name="subTitle"
            placeholder="Подзаголовок"
            ref={subtitleRef}
            defaultValue={post.subTitle ?? ''}
            className="h-[42px] resize-none border-none px-0 text-[28px] font-light leading-[34px] text-gray-600 shadow-none focus-visible:ring-0"
          />
          <div className="my-4">
            <Select defaultValue={post.category?.id + ''} name="category">
              <SelectTrigger>
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map(category => (
                  <SelectItem value={category.id + ''} key={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="my-4 flex">
            <Checkbox
              id="published"
              name="published"
              defaultChecked={post.published}
            />
            <div className="ml-2 flex items-center leading-none">
              <label
                htmlFor="published"
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('publish')}
              </label>
            </div>
          </div>
          <div className="my-4">
            {posterId && (
              <div className="flex items-center space-x-10">
                <Image
                  src={env.NEXT_PUBLIC_IMAGE_BASE_URL + posterId}
                  width={200}
                  height={200}
                  alt="poster"
                />
                <Button
                  onClick={() => {
                    setPosterUploadProgress(-1);
                    setPosterId(undefined);
                  }}
                  variant="destructive"
                >
                  Delete <X />
                </Button>
              </div>
            )}
            {!posterId && (
              <InputFile
                label="Постер"
                onUpload={(image?: File) => {
                  imageUploadHandler({
                    image,
                    onUploadProgress: setPosterUploadProgress,
                  }).then(r => {
                    setPosterId(r.imageId);
                  });
                }}
                loading={posterUploadProgress >= 0}
              />
            )}
          </div>
          <CustomMdxEditor
            markdown={markdown}
            onChange={setMarkdown}
            onSubmit={() => formRef.current?.requestSubmit()}
          />
        </form>
      </div>
    </div>
  );
}
