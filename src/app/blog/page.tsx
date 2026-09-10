import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { BOOK_NOW_HREF } from "@/lib/booking";

export default function BlogPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Stories & tips</p>
          <h1>Our Blog</h1>
          <p>Guides, local notes, and stay ideas from The O&apos; Apartments in Ilaro.</p>
        </div>
      </section>

      <section className="container book-wide section-pad">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="card blog-card">
              <div className="blog-card-image" style={{ backgroundImage: `url(${post.image})` }} />
              <div className="blog-card-body">
                <span className="blog-card-category">{post.category}</span>
                <h2>
                  <Link href={`/blog/${post.id}`} className="hover-link">
                    {post.title}
                  </Link>
                </h2>
                <div className="blog-card-meta">
                  <span>{post.date}</span>
                  <span>{post.author}</span>
                </div>
                <p>{post.excerpt}…</p>
                <Link href={`/blog/${post.id}`} className="blog-card-link">
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="page-cta">
          <h2>Plan your stay in Ilaro</h2>
          <p>Ready when you are — pick a suite and dates on our booking page.</p>
          <Link href={BOOK_NOW_HREF} className="btn btn-primary">
            Book Now
          </Link>
        </div>
      </section>
    </main>
  );
}
