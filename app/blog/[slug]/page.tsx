import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/app/data/blog-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.content.map((para, i) => (
        <p key={i} className="mt-4 text-gray-700">
          {para}
        </p>
      ))}
    </div>
  );
}