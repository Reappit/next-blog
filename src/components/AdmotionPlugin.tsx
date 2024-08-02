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
          const tagName = node.name;

          data.hName = tagName;
          data.hProperties = h(
            tagName,
            (node.attributes || {}) as never
          ).properties;
        }
      }
    );
  };
}
