import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage"
import PlayerList from "./PlayerList";
import PlayerDetail from "./PlayerDetail";
import CreatePlayer from "./CreatePlayer";
import PlayerMatches from "./PlayerMatches";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Domů</Link>
        &nbsp;
        <Link to="/players">Hráči</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/players" element={<PlayerList />} />
        <Route path="/players/:id" element={<PlayerDetail />} />
        <Route path="/players/create" element={<CreatePlayer />} />
        <Route path="/players/:id/matches" element={<PlayerMatches />} />
      </Routes>
    </Router>
  );
}

export default App;