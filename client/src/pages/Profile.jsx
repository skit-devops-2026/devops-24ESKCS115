import { Link } from "react-router-dom";
import { useState } from "react";

function Profile({ poems, savedPoems }) {
  const [username, setUsername] = useState("someone");
const [bio, setBio] = useState("words have a pulse.");
const [instagram, setInstagram] = useState("");
const [activeTab, setActiveTab] = useState("poems");
const [editing, setEditing] = useState(false);

  const userPoems = poems.filter(
    (poem) => poem.author === "You"
  );

  const saved = poems.filter(
    (poem) => savedPoems.includes(poem.id)
  );

  const displayedPoems =
    activeTab === "poems"
      ? userPoems
      : saved;

  return (
    <main className="profile">
      <section className="profile-header">
        <div className="profile-identity">
          <div className="profile-mark">
            MR
            <span>14</span>
          </div>

          <div className="profile-info">
            <h1>@{username}</h1>

            <div className="profile-stats">
              <span>
                <strong>{userPoems.length}</strong>
                poems
              </span>

              <span>
                <strong>0</strong>
                followers
              </span>

              <span>
                <strong>0</strong>
                following
              </span>
            </div>

            <p className="profile-bio">
  {bio}
</p>
          </div>
        </div>

        <button
  className="profile-edit"
  onClick={() => setEditing(true)}
>
  Edit profile
</button>
      </section>
      {editing && (
  <div className="profile-edit-panel">
    <h2>Edit profile</h2>

    <input
      type="text"
      value={username}
      onChange={(event) => setUsername(event.target.value)}
      placeholder="Username"
    />

    <input
      type="text"
      value={instagram}
      onChange={(event) => setInstagram(event.target.value)}
      placeholder="Instagram handle (optional)"
    />

    <textarea
      value={bio}
      onChange={(event) => setBio(event.target.value)}
      placeholder="Bio"
    />

    <button
      onClick={() => setEditing(false)}
    >
      Save profile
    </button>
  </div>
)}
      <nav className="profile-tabs">
        <button
          className={activeTab === "poems" ? "active" : ""}
          onClick={() => setActiveTab("poems")}
        >
          POEMS
        </button>

        <button
          className={activeTab === "saved" ? "active" : ""}
          onClick={() => setActiveTab("saved")}
        >
          SAVED
        </button>
      </nav>

      <section className="profile-grid">
        {displayedPoems.length === 0 ? (
          <div className="profile-empty">
            <h2>
              {activeTab === "poems"
                ? "Nothing written yet."
                : "Nothing saved yet."}
            </h2>

            <p>
              {activeTab === "poems"
                ? "Your poems will appear here."
                : "Poems you save will appear here."}
            </p>
          </div>
        ) : (
          displayedPoems.map((poem) => (
            <Link
              to={`/poem/${poem.id}`}
              className="profile-poem"
              key={poem.id}
            >
              <span className="profile-poem-category">
                {poem.category}
              </span>

              <h2>{poem.title}</h2>

              <p>{poem.poem}</p>

              <span className="profile-poem-arrow">
                →
              </span>
            </Link>
          ))
        )}
      </section>
    </main>
  );
}

export default Profile;