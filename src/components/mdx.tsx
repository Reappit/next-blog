import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import { Lightbulb, PencilIcon } from 'lucide-react';

interface CustomComponentProps {
  href: string;
  children: React.ReactNode;
}

type CustomComponent = React.ComponentType<CustomComponentProps>;

const Tip: CustomComponent = ({ children }) => (
  <div className="min-w-full border-l-4 border-green-700">
    <div className="flex items-center bg-green-700/30 py-1 pl-2 font-bold text-black">
      <Lightbulb size={21} className="text-green-700" />
      <span className="pl-1">Лайфхак</span>
    </div>
    <div className="-mt-5 bg-green-800/10 pl-4">{children}</div>
  </div>
);

const Note: CustomComponent = ({ children }) => (
  <div className="min-w-full rounded border-[1px] border-blue-500">
    <div className="flex items-center bg-blue-200/30 py-1 pl-2 font-bold text-black">
      <div className="rounded-full bg-blue-500 p-1.5">
        <PencilIcon size={12} className="text-white" />
      </div>
      <span className="pl-2 font-normal">На заметку</span>
    </div>
    <div className="-mt-5 pl-3">{children}</div>
  </div>
);

const customComponents = {
  note: Note,
  tip: Tip,
  danger: Note,
  info: Note,
  caution: Note,
};

export function CustomMdx(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...customComponents, ...(props.components || {}) }}
    />
  );
}
