import { useParams } from "react-router-dom";

function Poem({ poems }) {
  const { id } = useParams();

  const poem = poems.find(
    (item) => item.id === Number(id)
  );

  if (!poem) {
    return (
      <main className="poem-page">
        <h1>Poem not found.</h1>
      </main>
    );
  }

  return (
    <main className="poem-page">
      <p className="poem-page-label">
        {poem.category}
      </p>

      <h1>{poem.title}</h1>

      <p className="poem-page-author">
        — {poem.author}
      </p>

      <p className="poem-page-text">
        {poem.poem}
      </p>
    </main>
  );
}

export default Poem;