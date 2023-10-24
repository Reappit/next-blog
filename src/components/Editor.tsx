'use client';

import {
  MDXEditor,
  type MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from '@mdxeditor/editor';
import { type MutableRefObject } from 'react';

interface EditorProps {
  markdown: string;
  editorRef?: MutableRefObject<MDXEditorMethods | null>;
}

export default function Editor({ markdown, editorRef }: EditorProps) {
  return (
    <div>
      <MDXEditor
        ref={editorRef}
        markdown={markdown}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
        ]}
      />
    </div>
  );
}
