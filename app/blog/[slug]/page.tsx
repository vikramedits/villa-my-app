// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/app/data/blog-data";
import BlogPostContent from "@/components/BlogPostContent";

type Props = {
  params: { slug: string } | Promise<{ slug: string }>; // Next.js 16.1 strict
};

// ✅ Server Component (async optional because params can be Promise)
export default async function BlogPostPage({ params }: Props) {
  // 1️⃣ Unwrap params if it's a Promise
  const { slug } = params instanceof Promise ? await params : params;

  // 2️⃣ Find the post
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  // 3️⃣ 404 fallback
  if (!post) return notFound();

  // 4️⃣ Render Client Component
  return <BlogPostContent post={post} />;
}