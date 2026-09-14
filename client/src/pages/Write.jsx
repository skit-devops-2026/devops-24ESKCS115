import { useState } from "react";

function Write() {
  const [title, setTitle] = useState("");

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

      <form className="write-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </main>
  );
}

export default Write;