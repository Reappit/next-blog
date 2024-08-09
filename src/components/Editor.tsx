'use client';

import {
  MDXEditor,
  type MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  linkDialogPlugin,
  linkPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  imagePlugin,
  tablePlugin,
  frontmatterPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  markdownShortcutPlugin,
} from '@mdxeditor/editor';
import React, { useEffect, useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import autosize from 'autosize';
import EditorToolbar from '@/components/EditorToolbar';
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

interface EditorProps {
  post: PostDto;
  categories: CategoryDto[] | null;
}

const cyrillicToTranslit = CyrillicToTranslit();

const editorPlugins = (onSave: () => void) => [
  toolbarPlugin({
    toolbarContents: () => <EditorToolbar onSave={onSave} />,
  }),
  headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
  quotePlugin(),
  listsPlugin(),
  thematicBreakPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    imageAutocompleteSuggestions: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
  }),
  tablePlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: 'ts' }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      ts: 'TypeScript',
      js: 'JavaScript',
      css: 'CSS',
      txt: 'text',
    },
  }),
  directivesPlugin({
    directiveDescriptors: [AdmonitionDirectiveDescriptor],
  }),
  markdownShortcutPlugin(),
  frontmatterPlugin(),
];

export default function Editor({ post, categories }: EditorProps) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const editorRef = useRef<MDXEditorMethods>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [markdow, setMarkdown] = useState(post.fullStory ?? '');
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
    } else {
      toast({ title: 'Saved', description: savePostState.id, duration: 3000 });
      setId(savePostState.id as number | undefined);
    }
  }, [savePostState]);

  return (
    <div className="m-auto max-w-[700px]">
      <div className="mt-[1.19em] flex flex-col items-center">
        <form className="w-full" action={savePost} ref={formRef}>
          <input type="hidden" name="fullStory" value={markdow} />
          {id && <input type="hidden" name="id" value={id} />}
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
          <MDXEditor
            ref={editorRef}
            markdown={markdow}
            plugins={editorPlugins(() => {
              formRef.current?.requestSubmit();
            })}
            onChange={setMarkdown}
            contentEditableClassName="prose"
            className="editor-root mt-[1.19em] w-full"
          />
        </form>
      </div>
    </div>
  );
}
