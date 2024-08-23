import { Lightbulb, PencilIcon } from 'lucide-react';
import Image from 'next/image';
import { type MDXRemoteProps } from 'next-mdx-remote/rsc';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React, {
  type ComponentProps,
  type DetailedHTMLProps,
  type ImgHTMLAttributes,
  type ReactNode,
} from 'react';

import { convertChildrenToString, cyrillicStrSlugify } from '@/lib/utils';

const Tip = ({ children }: { children: ReactNode }) => (
  <div className="min-w-full border-l-4 border-green-700">
    <div className="flex items-center bg-green-700/30 py-1 pl-2 font-bold text-black">
      <Lightbulb size={21} className="text-green-700" />
      <span className="pl-1">Лайфхак</span>
    </div>
    <div className="-mt-5 bg-green-800/10 pl-4">{children}</div>
  </div>
);

const Note = ({ children }: { children: ReactNode }) => (
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

const RoundedImage = (
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > & { imgWidth: number }
) => {
  const { imgWidth } = props;
  return (
    <span className="flex flex-col items-center pb-[20px]">
      <Image
        width={imgWidth}
        height={imgWidth / 1.5}
        src={props.src ?? ''}
        alt={props.alt ?? ''}
        className="my-0"
      />
      <span>{props.title}</span>
    </span>
  );
};

const HeaderN = ({
  children,
  level,
}: {
  children?: ReactNode;
  level: number;
}) => {
  const slugFromChildren = convertChildrenToString(children);
  const slug = cyrillicStrSlugify(slugFromChildren as string);
  return React.createElement(`h${level}`, { id: slug, className: 'my-5 ' }, [
    React.createElement('a', {
      href: `#${slug}`,
      key: `link-${slug}`,
      className: 'anchor',
    }),
    children,
  ]);
};

const customComponents = {
  note: Note,
  tip: Tip,
  danger: Note,
  info: Note,
  caution: Note,
  h1: (props: ComponentProps<'h1'>) => <HeaderN level={1} {...props} />,
  h2: (props: ComponentProps<'h2'>) => <HeaderN level={2} {...props} />,
  h3: (props: ComponentProps<'h3'>) => <HeaderN level={3} {...props} />,
};

export function CustomMdx(props: MDXRemoteProps & { imgWidth: number }) {
  const { imgWidth, ...restProps } = props;
  return (
    <MDXRemote
      {...restProps}
      components={{
        ...customComponents,
        ...(restProps.components || {}),
        img: props => <RoundedImage {...props} imgWidth={imgWidth} />,
      }}
    />
  );
}
