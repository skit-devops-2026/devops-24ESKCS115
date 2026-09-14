import Hero from "../components/Hero";
import PoemCard from "../components/PoemCard";
import poems from "../data/poem";

function Home() {
  return (
    <main>
      <Hero />

      <section id="journal" className="journal-intro">
        <p>THE JOURNAL</p>

        <h2>
          words from people
          <br />
          who had something to say.
        </h2>

        {poems.map((poem) => (
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

export default Home;