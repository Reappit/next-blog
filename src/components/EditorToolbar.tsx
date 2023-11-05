import {
  type AdmonitionKind,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  Button,
  ChangeAdmonitionType,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  type EditorInFocus,
  InsertAdmonition,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  ShowSandpackInfo,
} from '@mdxeditor/editor';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { type DirectiveNode } from '@mdxeditor/editor/dist/plugins/directives/DirectiveNode';
import { SaveIcon } from 'lucide-react';

function whenInAdmonition(editorInFocus: EditorInFocus | null) {
  const node = editorInFocus?.rootNode;
  if (!node || node.getType() !== 'directive') {
    return false;
  }

  return ['note', 'tip', 'danger', 'info', 'caution'].includes(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    (node as DirectiveNode).getMdastNode().name as AdmonitionKind,
  );
}

export default function EditorToolbar({ onSave }: { onSave: () => void }) {
  return (
    <ConditionalContents
      options={[
        {
          when: (editor) => editor?.editorType === 'codeblock',
          contents: () => <ChangeCodeMirrorLanguage />,
        },
        {
          when: (editor) => editor?.editorType === 'sandpack',
          contents: () => <ShowSandpackInfo />,
        },
        {
          fallback: () => (
            <>
              <Button onClick={onSave}>
                <SaveIcon strokeWidth={1.5} />
              </Button>
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Separator />
              <ListsToggle />
              <Separator />
              <ConditionalContents
                options={[
                  {
                    when: whenInAdmonition,
                    contents: () => <ChangeAdmonitionType />,
                  },
                  { fallback: () => <BlockTypeSelect /> },
                ]}
              />
              <Separator />
              <CreateLink />
              <InsertImage />
              <Separator />
              <InsertTable />
              <InsertThematicBreak />
              <Separator />
              <InsertCodeBlock />
              <ConditionalContents
                options={[
                  {
                    when: (editorInFocus) => !whenInAdmonition(editorInFocus),
                    contents: () => (
                      <>
                        <Separator />
                        <InsertAdmonition />
                      </>
                    ),
                  },
                ]}
              />
            </>
          ),
        },
      ]}
    />
  );
}
