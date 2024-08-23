import { type ClassValue, clsx } from 'clsx';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import React, { isValidElement, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<ClassValue>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return twMerge(clsx(inputs));
}

export function convertChildrenToString(children: ReactNode): string {
  return (
    React.Children.map(children, (child): string => {
      if (isValidElement(child)) {
        return convertChildrenToString(child.props.children);
      }
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }
      // For any other types, return an empty string
      return '';
    })?.join('') || ''
  ); // Handle possible null or undefined values
}

const cyrillicToTranslit = CyrillicToTranslit();

export function cyrillicStrSlugify(strToTransform: string = '') {
  const str = cyrillicToTranslit.transform(strToTransform, '-');
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-i-') // Replace & with 'i'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters except for -
    .replace(/-{2,}/g, '-'); // Replace multiple - with single -
}
