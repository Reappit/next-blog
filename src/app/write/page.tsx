import '@mdxeditor/editor/style.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const EditorComp = dynamic(() => import('../../components/Editor'), {
  ssr: false,
});

const markdown = `
  # Контент!
`;

export default function Write() {
  return (
    <Suspense fallback={null}>
      <EditorComp markdown={markdown} />
    </Suspense>
  );
}
