import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      id: "corporate-retreats",
      category: "Real Estate",
      title: "The Ultimate Guide to Corporate Retreats and Remote Work Stays",
      date: "May 21, 2026",
      author: "The O' Apartments",
      excerpt: "In today’s remote-first world, your work environment doesn’t have to be a traditional office building.",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "shortlet-vs-hotels",
      category: "Real Estate",
      title: "Shortlet Apartments vs. Luxury Hotels: Which is Better for Your Stay?",
      date: "May 21, 2026",
      author: "The O' Apartments",
      excerpt: "The way we travel has completely changed. While luxury hotels used to be the absolute",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "choose-ilaro",
      category: "Properties",
      title: "Top Reasons to Choose Ilaro for Your Next Weekend Getaway",
      date: "May 21, 2026",
      author: "The O' Apartments",
      excerpt: "When planning a weekend escape from the hustle and bustle of city life, Ilaro offers",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <main>
      {/* Page Header */}
      <section className="page-hero">
        <h1 style={{ fontSize: '3rem', margin: 0 }}>Our Blog</h1>
      </section>

      {/* Blog Grid */}
      <section className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
        <div className="grid grid-cols-3 gap-xl">
          {posts.map((post) => (
            <article key={post.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div 
                style={{ 
                  height: '220px', 
                  backgroundImage: `url(${post.image})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center'
                }}
              />
              <div style={{ padding: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ color: 'var(--color-primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>
                  {post.category}
                </span>
                
                <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-sm)', lineHeight: 1.4 }}>
                  <Link href={`/blog/${post.id}`} className="hover-link" style={{ color: 'var(--color-text)' }}>
                    {post.title}
                  </Link>
                </h2>
                
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)', display: 'flex', gap: '12px' }}>
                  <span>📅 {post.date}</span>
                  <span>👤 {post.author}</span>
                </div>
                
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)', flex: 1 }}>
                  {post.excerpt}...
                </p>
                
                <Link href={`/blog/${post.id}`} style={{ color: 'var(--color-brand-green)', fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center' }}>
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
