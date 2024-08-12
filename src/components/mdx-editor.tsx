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

const editorPlugins = ({
  onSave,
  imageUploadHandler,
}: {
  onSave: () => void;
  imageUploadHandler: (file: File) => Promise<string>;
}) => [
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
    imageUploadHandler,
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
  const imageUploadHandler = async (image: File) => {
    return '';
  };

  return (
    <MDXEditor
      markdown={props.markdown}
      plugins={editorPlugins({
        onSave: () => {
          props.onSubmit?.();
        },
        imageUploadHandler,
      })}
      onChange={props.onChange}
      contentEditableClassName="prose"
      className="editor-root mt-[1.19em] w-full"
    />
  );
}
