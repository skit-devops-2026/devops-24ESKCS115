function PoemCard({ title, author, poem }) {
  return (
    <article className="poem-card">
      <p className="poem-label">01 — FEATURED</p>

      <h3 className="poem-title">
        {title}
      </h3>

      <p className="poem-text">
        {poem}
      </p>

      <div className="poem-footer">
        <span>— {author}</span>
        <span>read poem →</span>
      </div>
    </article>
  );
}

export default PoemCard;