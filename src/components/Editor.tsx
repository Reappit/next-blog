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
import React, { useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import autosize from 'autosize';
import EditorToolbar from '@/components/EditorToolbar';
import { savePost } from '@/repository/post-repository';

interface EditorProps {
  subtitle: string;
  fullStory: string;
  title: string;
}

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

export default function Editor({ subtitle, fullStory, title }: EditorProps) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const editorRef = useRef<MDXEditorMethods>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    autosize(titleRef.current as unknown as Element);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    autosize(subtitleRef.current as unknown as Element);
  }, []);

  const savePostWithFullStory = savePost.bind(
    null,
    editorRef?.current?.getMarkdown().toString() ?? '',
  );
  return (
    <div className="m-auto max-w-[700px]">
      <div className="mt-[1.19em] flex flex-col items-center">
        <form action={savePostWithFullStory} ref={formRef}>
          <Textarea
            name="title"
            placeholder="Заголовок"
            className="h-[42px] resize-none border-none px-0 text-[42px] leading-[52px] shadow-none focus-visible:ring-0"
            ref={titleRef}
            defaultValue={title}
          />
          <Textarea
            name="sub-title"
            placeholder="Подзаголовок"
            ref={subtitleRef}
            defaultValue={subtitle}
            className="h-[42px] resize-none border-none px-0 text-[28px] font-light leading-[34px] text-gray-600 shadow-none focus-visible:ring-0"
          />
          <MDXEditor
            ref={editorRef}
            markdown={fullStory}
            plugins={editorPlugins(() => {
              // supabase.from('post').upsert()
              formRef.current?.requestSubmit();
            })}
            contentEditableClassName="prose"
            className="editor-root mt-[1.19em] w-full"
          />
        </form>
      </div>
    </div>
  );
}
