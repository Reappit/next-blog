'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { mergeRegister } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  type EditorState,
} from 'lexical';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  RotateCcwIcon,
  RotateCwIcon,
  Strikethrough,
  UnderlineIcon,
} from 'lucide-react';

function onChange(state: EditorState) {
  state.read(() => {
    const selection = $getSelection();
    console.log(selection);
  });
}

export default function Write() {
  return (
    <div className="relative rounded-sm border border-gray-200 bg-white shadow-sm">
      <LexicalComposer
        initialConfig={{
          namespace: 'lexical-editor',
          theme: {
            // ltr: 'ltr',
            // rtl: 'rtl',
            paragraph: 'mb-1',
            rtl: 'text-right',
            ltr: 'text-left',
            text: {
              bold: 'font-bold',
              italic: 'italic',
              underline: 'underline',
              strikethrough: 'line-through',
            },
          },
          onError(error) {
            throw error;
          },
        }}
      >
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[450px] resize-none overflow-hidden text-ellipsis px-2.5 py-[15px] outline-none" />
          }
          placeholder={
            <div className="pointer-events-none absolute left-[10px] top-[15px] select-none">
              Enter some text...
            </div>
          }
          ErrorBoundary={() => <span>Error boundary</span>}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  );
}

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
    );
  }, [updateToolbar, editor]);

  return (
    <div className="min-w-52 fixed bottom-8 left-1/2 z-20 mb-4 flex h-10 -translate-x-1/2 transform items-center space-x-2 bg-[#1b2733] px-2 py-2 shadow">
      <button
        className={cn(
          'px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
          isBold ? 'bg-gray-700' : 'bg-transparent',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
      >
        <BoldIcon className="h-3.5 w-3.5 text-white" />
      </button>
      <button
        className={cn(
          'px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
          isStrikethrough ? 'bg-gray-700' : 'bg-transparent',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
      >
        <Strikethrough className="h-3.5 w-3.5 text-white" />
      </button>
      <button
        className={cn(
          'px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
          isItalic ? 'bg-gray-700' : 'bg-transparent',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
      >
        <ItalicIcon className="h-3.5 w-3.5 text-white" />
      </button>
      <button
        className={cn(
          'px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
          isUnderline ? 'bg-gray-700' : 'bg-transparent',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
      >
        <UnderlineIcon className="h-3.5 w-3.5 text-white" />
      </button>

      <span className="block h-full w-[1px] bg-gray-600"></span>

      <button
        className={cn(
          'bg-transparent px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
      >
        <AlignLeftIcon className="h-3.5 w-3.5 text-white" />
      </button>
      <button
        className={cn(
          'bg-transparent px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
      >
        <AlignCenterIcon className="h-3.5 w-3.5 text-white" />
      </button>
      <button
        className={cn(
          'bg-transparent px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
      >
        <AlignRightIcon className="h-3.5 w-3.5 text-white" />
      </button>
      <button
        className={cn(
          'bg-transparent px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
      >
        <AlignJustifyIcon className="h-3.5 w-3.5 text-white" />
      </button>

      <span className="block h-full w-[1px] bg-gray-600"></span>

      <button
        className={cn(
          'bg-transparent px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
        )}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined as void);
        }}
      >
        <RotateCcwIcon className="h-3.5 w-3.5 text-white" />
      </button>
      <button
        className={cn(
          'bg-transparent px-1 transition-colors duration-100 ease-in hover:bg-gray-700',
        )}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined as void);
        }}
      >
        <RotateCwIcon className="h-3.5 w-3.5 text-white" />
      </button>
    </div>
  );
};
