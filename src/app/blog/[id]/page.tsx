import Link from "next/link";
import { notFound } from "next/navigation";
import { BOOK_NOW_HREF } from "@/lib/booking";
import { blogPosts, getBlogPost } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getBlogPost(id);
  if (!post) notFound();

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{post.category}</p>
          <h1 style={{ maxWidth: "820px" }}>{post.title}</h1>
          <p>
            {post.date} · {post.author}
          </p>
        </div>
      </section>

      <section className="container section-pad" style={{ maxWidth: "820px" }}>
        <div
          style={{
            height: "min(420px, 55vw)",
            borderRadius: "var(--radius-lg)",
            backgroundImage: `url(${post.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginBottom: "var(--spacing-xl)",
          }}
        />
        {post.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} style={{ fontSize: "1.05rem", marginBottom: "var(--spacing-md)" }}>
            {paragraph}
          </p>
        ))}

        <div className="flex gap-md" style={{ flexWrap: "wrap", marginTop: "var(--spacing-xl)" }}>
          <Link href={BOOK_NOW_HREF} className="btn btn-primary">
            Book Now
          </Link>
          <Link href="/blog" className="btn btn-outline">
            Back to blog
          </Link>
        </div>
      </section>
    </main>
  );
}
