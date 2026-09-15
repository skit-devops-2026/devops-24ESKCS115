import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Write from "./pages/Write";
import Login from "./pages/Login";
import poemsData from "./data/poem";
import Poem from "./pages/Poem";
import Profile from "./pages/Profile";

function App() {
  const [poems, setPoems] = useState(poemsData);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
  path="/profile"
  element={<Profile poems={poems} />}
/>
        <Route
  path="/poem/:id"
  element={<Poem poems={poems} />}
/>
        <Route path="/" element={<Home poems={poems} />} />

        <Route
          path="/discover"
          element={<Discover poems={poems} />}
        />

        <Route
          path="/write"
          element={<Write poems={poems} setPoems={setPoems} />}
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;