import { useState } from "react";
import PoemCard from "../components/PoemCard";

function Discover({ poems }) {
  const [category, setCategory] = useState("all");

  const filteredPoems =
    category === "all"
      ? poems
      : poems.filter((poem) => poem.category === category);

  return (
    <main className="discover">
      <section className="discover-header">
        <p>DISCOVER</p>

        <h1>
          find something
          <br />
          worth reading.
        </h1>
      </section>

      <nav className="discover-filters">
        <button onClick={() => setCategory("all")}>
          All
        </button>

        <button onClick={() => setCategory("love")}>
          Love
        </button>

        <button onClick={() => setCategory("loss")}>
          Loss
        </button>

        <button onClick={() => setCategory("night")}>
          Night
        </button>
      </nav>

      <section className="discover-poems">
        {filteredPoems.map((poem, index) => (
          <PoemCard
            key={poem.id}
            number={index + 1}
            title={poem.title}
            author={poem.author}
            poem={poem.poem}
            category={poem.category}
            id={poem.id}
          />
        ))}
      </section>
    </main>
  );
}

export default Discover;