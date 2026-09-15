function Profile({ poems }) {
  const username = "someone";

  const userPoems = poems.filter(
    (poem) => poem.author === "You"
  );

  return (
    <main className="profile">
      <section className="profile-header">
        <p>PROFILE</p>

        <h1>@{username}</h1>

        <p className="profile-count">
          {userPoems.length} poems
        </p>
      </section>

      <section className="profile-poems">
        <div className="profile-section-header">
          <span>YOUR POEMS</span>
          <span>{userPoems.length}</span>
        </div>

        {userPoems.length === 0 ? (
          <p className="profile-empty">
            You haven't written anything yet.
          </p>
        ) : (
          userPoems.map((poem, index) => (
            <article
              className="profile-poem"
              key={poem.id}
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h2>{poem.title}</h2>
                <p>{poem.category}</p>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Profile;