import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

const nodeTypes = ['info', 'note', 'danger'];

export function admotionPlugin() {
  return (tree: never) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    visit(
      tree,
      (node: {
        attributes?: object;
        name: string;
        type: string;
        data: { hName: string; hProperties: unknown };
      }) => {
        if (
          node.type === 'containerDirective' ||
          node.type === 'leafDirective' ||
          node.type === 'textDirective'
        ) {
          if (!nodeTypes.includes(node.name)) return;

          const data = node.data || (node.data = {} as never);
          const tagName = node.type === 'textDirective' ? 'span' : 'div';

          data.hName = tagName;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          data.hProperties = h(tagName, {
            ...(node.attributes || {}),
            class: 'border-l-4 border-green-600 p-l-4',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          }).properties;
        }
      },
    );
  };
}
