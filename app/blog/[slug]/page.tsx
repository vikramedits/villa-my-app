import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/app/data/blog-data";
import { ArrowRight } from "lucide-react";
import BackButton from "@/components/BackButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  // ✅ UNWRAP params
  const { slug } = await params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <>
      <BackButton />
      <div className="mx-4 lg:max-w-4xl p-8 my-10 bg-white shadow-2xl rounded-2xl border border-gray-200 transition-all duration-300 hover:shadow-2xl">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-green-900 pb-3 border-b-4 border-black">
            {post.title}
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {post.content.map((para, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="mt-2">
                <ArrowRight size={18} />
              </span>
              <p className="text-gray-700 text-lg leading-relaxed">{para}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
