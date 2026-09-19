import { useState } from "react";
import { Link } from "react-router-dom";

function PoemCard({ id, number, title, author, poem, saved, onSave }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: title,
        text: `${title} — ${author}`,
      });
    } else {
      await navigator.clipboard.writeText(title);
      alert("Poem title copied.");
    }
  };

  const handleComment = (event) => {
    event.preventDefault();

    if (!comment.trim()) {
      return;
    }

    setComments((currentComments) => [
      ...currentComments,
      comment.trim(),
    ]);

    setComment("");
  };

  return (
    <article className="poem-card">
      <p className="poem-label">
        {String(number).padStart(2, "0")} — POEM
      </p>

      <h3 className="poem-title">
        {title}
      </h3>

      <p className="poem-text">
        {poem}
      </p>

      <div className="poem-footer">
        <span>— {author}</span>

        <div className="poem-actions">
          <button
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            {liked ? "♥" : "♡"} {likeCount}
          </button>

          <button
            className="share-button"
            onClick={handleShare}
          >
            share ↗
          </button>
<button
  className={`save-button ${saved ? "saved" : ""}`}
  onClick={() => onSave(id)}
>
  {saved ? "saved" : "save"}
</button>

          <Link
            to={`/poem/${id}`}
            className="read-poem"
          >
            read poem →
          </Link>
        </div>
      </div>

      <div className="poem-comments">
        {comments.map((item, index) => (
          <p key={index}>
            <span>— you</span> {item}
          </p>
        ))}

        <form onSubmit={handleComment}>
          <input
            type="text"
            placeholder="Leave a thought..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />

          <button type="submit">
            send
          </button>
        </form>
      </div>
    </article>
  );
}

export default PoemCard;