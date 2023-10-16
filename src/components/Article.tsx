export default function Article({ article }: { article: { title: string } }) {
  return <article className="flex">{article.title}</article>;
}
