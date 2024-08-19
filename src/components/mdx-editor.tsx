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
import axios from 'axios';
import React from 'react';

import EditorToolbar from '@/components/EditorToolbar';
import { uploadImageController } from '@/controllers/post';
import { env } from '@/env';

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
    // todo: replace upload image component on input-file
    if (!image) return '';
    const data = await uploadImageController.uploadImage({
      size: image.size,
      type: image.type,
    });
    await axios.put(data.presignedUrl, image, {
      headers: {
        'Content-Type': image.type,
      },
      onUploadProgress: progress => {
        console.log(progress);
      },
    });
    return `${env.NEXT_PUBLIC_IMAGE_BASE_URL}${data.fileId}`;
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
