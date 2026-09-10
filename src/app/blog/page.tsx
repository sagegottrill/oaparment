import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Stories & tips</p>
          <h1 style={{ margin: 0 }}>Our Blog</h1>
        </div>
      </section>

      <section className="container" style={{ padding: "var(--spacing-3xl) var(--spacing-md)" }}>
        <div className="grid grid-cols-3 gap-xl">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="card"
              style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  height: "220px",
                  backgroundImage: `url(${post.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div style={{ padding: "var(--spacing-xl)", display: "flex", flexDirection: "column", flex: 1 }}>
                <span
                  style={{
                    color: "var(--color-primary)",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: 600,
                    marginBottom: "var(--spacing-sm)",
                  }}
                >
                  {post.category}
                </span>

                <h2 style={{ fontSize: "1.25rem", marginBottom: "var(--spacing-sm)", lineHeight: 1.4 }}>
                  <Link href={`/blog/${post.id}`} className="hover-link" style={{ color: "var(--color-text)" }}>
                    {post.title}
                  </Link>
                </h2>

                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                    marginBottom: "var(--spacing-md)",
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <span>📅 {post.date}</span>
                  <span>👤 {post.author}</span>
                </div>

                <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", marginBottom: "var(--spacing-lg)", flex: 1 }}>
                  {post.excerpt}…
                </p>

                <Link
                  href={`/blog/${post.id}`}
                  style={{
                    color: "var(--color-brand-green)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
