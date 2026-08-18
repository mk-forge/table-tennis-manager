import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  useEffect(() => {
      document.title = "Ping Pong Manager";
  }, []);

  return (
    <div className="homepage">
      <h1>Ping Pong Manager</h1>
      <p className="subtitle">Spravuj hráče, sleduj zápasy a výsledky.</p>
      <Link to="/players" className="btn-primary">Zobrazit seznam hráčů</Link>
    </div>
  );
}

export default HomePage;