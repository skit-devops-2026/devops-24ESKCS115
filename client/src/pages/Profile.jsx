import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";

function Profile({ poems, savedPoems }) {
  const { user, loading, updateProfile } = useAuth();

  const [activeTab, setActiveTab] = useState("poems");
  const [editing, setEditing] = useState(false);

  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editInstagram, setEditInstagram] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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

  const openEditProfile = () => {
    setEditUsername(user.username);
    setEditBio(user.bio || "");
    setEditInstagram(user.instagram || "");
    setError("");
    setEditing(true);
  };

  const handleSaveProfile = async () => {
    setError("");
    setSaving(true);

    try {
      await updateProfile({
        username: editUsername,
        bio: editBio,
        instagram: editInstagram,
      });

      setEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="profile">
        <p>Loading profile...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="profile">
        <h1>Please log in.</h1>
        <Link to="/login">Go to login</Link>
      </main>
    );
  }

  return (
    <main className="profile">
      <section className="profile-header">
        <div className="profile-identity">
          <div className="profile-mark">
            MR
            <span>14</span>
          </div>

          <div className="profile-info">
            <h1>@{user.username}</h1>

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
  {user.bio || "words have a pulse."}
</p>

{user.instagram && (
  <p className="profile-instagram">
    @{user.instagram.replace("@", "")}
  </p>
)}
          </div>
        </div>

        <button
          className="profile-edit"
          onClick={openEditProfile}
        >
          Edit profile
        </button>
      </section>

      {editing && (
        <div className="profile-edit-panel">
          <h2>Edit profile</h2>

          <input
            type="text"
            value={editUsername}
            onChange={(event) =>
              setEditUsername(event.target.value)
            }
            placeholder="Username"
          />

          <input
            type="text"
            value={editInstagram}
            onChange={(event) =>
              setEditInstagram(event.target.value)
            }
            placeholder="Instagram handle (optional)"
          />

          <textarea
            value={editBio}
            onChange={(event) =>
              setEditBio(event.target.value)
            }
            placeholder="Bio"
          />

          {error && (
            <p className="profile-error">
              {error}
            </p>
          )}

          <button
            onClick={handleSaveProfile}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save profile"}
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