import Hero from "../components/Hero";

function Home() {
  return (
    <main>
      <Hero />

      <section className="journal-intro">
        <p>THE JOURNAL</p>

        <h2>
          words from people
          <br />
          who had something to say.
        </h2>
      </section>
    </main>
  );
}

export default Home;