'use client';

import {
  AdmonitionDirectiveDescriptor,
  codeBlockPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import React from 'react';
import EditorToolbar from '@/components/EditorToolbar';

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

export function CustomMdxEditor(props: {
  markdown: string;
  onSubmit?: () => void;
  onChange: (val: string) => void;
}) {
  return (
    <MDXEditor
      markdown={props.markdown}
      plugins={editorPlugins(() => {
        console.log(props)
        props.onSubmit?.();
      })}
      onChange={props.onChange}
      contentEditableClassName="prose"
      className="editor-root mt-[1.19em] w-full"
    />
  );
}
