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
  sandpackPlugin,
  codeMirrorPlugin,
  type SandpackConfig,
  imagePlugin,
  tablePlugin,
  frontmatterPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  markdownShortcutPlugin,
  KitchenSinkToolbar,
} from '@mdxeditor/editor';
import React, { type MutableRefObject, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import autosize from 'autosize';

interface EditorProps {
  subtitle: string;
  fullStory: string;
  title: string;
  editorRef?: MutableRefObject<MDXEditorMethods | null>;
}

const defaultSnippetContent = `
  export default function App() {
    return (
      <div>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
`.trim();

export const virtuosoSampleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
    {
      label: 'React',
      name: 'react',
      meta: 'live',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
    {
      label: 'Virtuoso',
      name: 'virtuoso',
      meta: 'live virtuoso',
      sandpackTemplate: 'react-ts',
      sandpackTheme: 'light',
      snippetFileName: '/App.tsx',
      initialSnippetContent: defaultSnippetContent,
      dependencies: {
        'react-virtuoso': 'latest',
        '@ngneat/falso': 'latest',
      },
    },
  ],
};

export const ALL_PLUGINS = [
  toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    imageAutocompleteSuggestions: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
  }),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: 'ts' }),
  sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
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
  diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
  markdownShortcutPlugin(),
];

export default function Editor({
  subtitle,
  fullStory,
  title,
  editorRef,
}: EditorProps) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    autosize(titleRef.current as unknown as Element);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    autosize(subtitleRef.current as unknown as Element);
  }, []);

  return (
    <div className="m-auto max-w-[700px]">
      <div className="mt-[1.19em] flex flex-col items-center">
        <Textarea
          placeholder="Заголовок"
          className="h-[42px] resize-none border-none px-0 text-[42px] leading-[52px] shadow-none focus-visible:ring-0"
          ref={titleRef}
          defaultValue={title}
        />
        <Textarea
          placeholder="Подзаголовок"
          ref={subtitleRef}
          defaultValue={subtitle}
          className="h-[42px] resize-none border-none px-0 text-[28px] font-light leading-[34px] text-gray-600 shadow-none focus-visible:ring-0"
        />
        <MDXEditor
          ref={editorRef}
          markdown={fullStory}
          plugins={ALL_PLUGINS}
          contentEditableClassName="prose"
          className="editor-root mt-[1.19em] w-full"
          onChange={(val) => {
            console.log(val);
          }}
        />
      </div>
    </div>
  );
}
