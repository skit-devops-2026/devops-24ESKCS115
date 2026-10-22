import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login, user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [typedText, setTypedText] = useState("");

  const letter = `Dear ${user?.username || "reader"},

You came back.

Some words are written to be read,
and some places are made to be returned to.

This little corner of MR14 remembers
that you belong here.

— a note for you, from MR14`;

  useEffect(() => {
    if (authLoading || !user) return;

    setTypedText("");
    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(letter.slice(0, index));

      if (index >= letter.length) {
        window.clearInterval(timer);
      }
    }, 35);

    return () => window.clearInterval(timer);
  }, [authLoading, user?.username]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsLoggingIn(true);

    try {
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (authLoading) {
    return (
      <main className="login">
        <section className="login-container">
          <p className="login-mark">MR14</p>
          <p className="login-subtitle">Finding your words...</p>
        </section>
      </main>
    );
  }

  if (user) {
    return (
      <main className="login">
        <section className="login-container login-letter">
          <p className="login-mark">MR14</p>

          <p className="login-subtitle">
            A LETTER TO THE READER
          </p>

          <h1>Dear {user.username},</h1>

          <p className="login-letter-text">
            {typedText}
            <span className="login-letter-cursor">|</span>
          </p>

          <Link className="login-letter-link" to="/profile">
            Return to your profile →
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="login">
      <section className="login-container">
        <p className="login-mark">MR14</p>

        <h1>Welcome back.</h1>

        <p className="login-subtitle">
          Return to the words.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <p className="login-signup">
            New to MR14? <Link to="/signup">Create an account</Link>
          </p>

          {error && (
            <p className="login-error">{error}</p>
          )}

          <button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;