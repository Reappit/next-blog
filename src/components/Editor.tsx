'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import autosize from 'autosize';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type PostDto } from '@/dto/post';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { CategoryDto } from '@/dto/category';
import { useFormState } from 'react-dom';
import { savePostController } from '@/controllers/post';
import { CustomMdxEditor } from '@/components/mdx-editor';

interface EditorProps {
  post: PostDto;
  categories: CategoryDto[] | null;
}

const cyrillicToTranslit = CyrillicToTranslit();

export default function Editor({ post, categories }: EditorProps) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [markdown, setMarkdown] = useState(post.fullStory ?? '');
  const { toast } = useToast();

  const [id, setId] = useState<number | undefined>(post.id);

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
      toast({ title: 'Id is not changed', description: savePostState.id, duration: 3000 });
    }
  }, [savePostState]);

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
              .transform((titleRef.current as any)?.value ?? '', '-')
              .toLowerCase()}
          />
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
                Опубликовать
              </label>
            </div>
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
