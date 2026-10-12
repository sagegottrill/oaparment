import Link from "next/link";
import { notFound } from "next/navigation";
import { BOOK_NOW_HREF } from "@/lib/booking";
import { blogPosts, getBlogPost, type BlogBlock } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

function renderTextWithLinks(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    let href = match[2].trim();

    // Clean internal and canonical domain links to relative path
    if (
      href.startsWith("https://oapartment.com") ||
      href.startsWith("https://www.oapartment.com") ||
      href.startsWith("http://oapartment.com") ||
      href.startsWith("http://www.oapartment.com")
    ) {
      try {
        const parsed = new URL(href);
        href = parsed.pathname + parsed.search + parsed.hash;
        if (!href.startsWith("/")) href = "/" + href;
      } catch {
        href = "/";
      }
    }

    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      parts.push(
        <Link key={match.index} href={href} className="blog-inline-link">
          {label}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-inline-link"
        >
          {label}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function renderBlock(item: BlogBlock, index: number) {
  if (typeof item === "string") {
    if (item.startsWith("### ")) {
      return (
        <h3 key={index} className="blog-h3">
          {renderTextWithLinks(item.slice(4))}
        </h3>
      );
    }
    if (item.startsWith("## ")) {
      return (
        <h2 key={index} className="blog-h2">
          {renderTextWithLinks(item.slice(3))}
        </h2>
      );
    }
    if (item.includes("\n•") || item.startsWith("•")) {
      const lines = item
        .split("\n")
        .map((l) => l.replace(/^[•●\-\*]\s*/, "").trim())
        .filter(Boolean);
      return (
        <ul key={index} className="blog-list">
          {lines.map((li, liIdx) => (
            <li key={liIdx}>{renderTextWithLinks(li)}</li>
          ))}
        </ul>
      );
    }
    if (/^\d+\.\s+[A-Z]/.test(item) && item.length < 120) {
      return (
        <h3 key={index} className="blog-h3">
          {renderTextWithLinks(item)}
        </h3>
      );
    }
    return (
      <p key={index} className="blog-p">
        {renderTextWithLinks(item)}
      </p>
    );
  }

  if (item.type === "h2") {
    return (
      <h2 key={index} className="blog-h2">
        {renderTextWithLinks(item.text)}
      </h2>
    );
  }

  if (item.type === "h3") {
    return (
      <h3 key={index} className="blog-h3">
        {renderTextWithLinks(item.text)}
      </h3>
    );
  }

  if (item.type === "p") {
    return (
      <p key={index} className="blog-p">
        {renderTextWithLinks(item.text)}
      </p>
    );
  }

  if (item.type === "list") {
    return (
      <ul key={index} className="blog-list">
        {item.items.map((li, liIdx) => (
          <li key={liIdx}>{renderTextWithLinks(li)}</li>
        ))}
      </ul>
    );
  }

  if (item.type === "image") {
    return (
      <figure key={index} className="blog-image-wrap">
        <img src={item.src} alt={item.alt || ""} className="blog-image" />
        {item.alt ? <figcaption className="blog-image-caption">{item.alt}</figcaption> : null}
      </figure>
    );
  }

  return null;
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

        <article className="blog-article-content">
          {post.body.map((item, index) => renderBlock(item, index))}
        </article>

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
