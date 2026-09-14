import { useState } from "react";
import poems from "../data/poem";
import PoemCard from "../components/PoemCard";

function Discover() {
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
        {filteredPoems.map((poem) => (
          <PoemCard
            key={poem.id}
            title={poem.title}
            author={poem.author}
            poem={poem.poem}
          />
        ))}
      </section>
    </main>
  );
}

export default Discover;