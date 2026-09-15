import { useState } from "react";

function Write({ setPoems }) {
  const [title, setTitle] = useState("");
  const [poem, setPoem] = useState("");
  const [category, setCategory] = useState("love");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !poem.trim()) {
      alert("Please write a title and poem.");
      return;
    }

    const newPoem = {
      id: Date.now(),
      title: title.trim(),
      author: "You",
      category: category,
      poem: poem.trim(),
    };

    setPoems((currentPoems) => [...currentPoems, newPoem]);

    setTitle("");
    setPoem("");
    setCategory("love");
    setShowSuccess(true);
  };

  return (
    <main className="write">
      <section className="write-header">
        <p>WRITE</p>

        <h1>
          put something
          <br />
          into words.
        </h1>
      </section>

      <form className="write-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          placeholder="Write your poem..."
          value={poem}
          onChange={(event) => setPoem(event.target.value)}
        />
        <select
  value={category}
  onChange={(event) => setCategory(event.target.value)}
>
  <option value="love">Love</option>
  <option value="loss">Loss</option>
  <option value="night">Night</option>
</select>

        <button type="submit">Publish</button>
      </form>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-message">
            <div className="success-logo">MR14</div>

            <p className="success-label">SUBMITTED</p>

            <h2>Your poem is now part of MR14.</h2>

            <button onClick={() => setShowSuccess(false)}>
              Continue writing
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Write;