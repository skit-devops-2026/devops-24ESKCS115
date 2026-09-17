import Hero from "../components/Hero";
import PoemCard from "../components/PoemCard";

function Home({ poems, savedPoems, toggleSave }) {
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
            saved={savedPoems.includes(poem.id)}
            onSave={toggleSave}
          />
        ))}
      </section>
    </main>
  );
}

export default Home;