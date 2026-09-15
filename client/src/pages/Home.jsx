import Hero from "../components/Hero";
import PoemCard from "../components/PoemCard";

function Home({ poems }) {
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

        {poems.map((poem, index) => (
          <PoemCard
            key={poem.id}
            id={poem.id}
            number={index + 1}
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