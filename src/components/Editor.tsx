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
import { savePost } from '@/repository/post-repository';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type PostDto } from '@/repository/dto/post';
import { type CategoryDto } from '@/repository/dto/category';

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

export default function Editor({
  post: { fullStory, id, title, subTitle },
  categories,
}: EditorProps) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const editorRef = useRef<MDXEditorMethods>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [markdow, setMarkdown] = useState(fullStory ?? '');

  useEffect(() => {
    autosize(titleRef.current as unknown as Element);
    autosize(subtitleRef.current as unknown as Element);
  }, []);

  return (
    <div className="m-auto max-w-[700px]">
      <div className="mt-[1.19em] flex flex-col items-center">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form action={savePost} ref={formRef}>
          <input type="hidden" name="fullStory" value={markdow} />
          <input type="hidden" name="id" value={id} />
          <input
            type="hidden"
            name="metaTitle"
            value={cyrillicToTranslit.transform(title, '-').toLowerCase()}
          />
          <Textarea
            name="title"
            placeholder="Заголовок"
            className="h-[42px] resize-none border-none px-0 text-[42px] leading-[52px] shadow-none focus-visible:ring-0"
            ref={titleRef}
            defaultValue={title}
          />
          <Textarea
            name="subTitle"
            placeholder="Подзаголовок"
            ref={subtitleRef}
            defaultValue={subTitle ?? ''}
            className="h-[42px] resize-none border-none px-0 text-[28px] font-light leading-[34px] text-gray-600 shadow-none focus-visible:ring-0"
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem value={category.id + ''}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
