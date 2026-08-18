import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function PlayerList() {
  let navigate = useNavigate();
  let [players, setPlayers] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Seznam hráčů";
    let fetchPlayers = async () => {
      try {
        let response = await axios.get("http://localhost:3000/players");
        setPlayers(response.data);
      } catch (err) {
        setError("Nepodařilo se načíst hráče");
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  if (loading) return <div className="spinner"></div>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="content-wrapper">
      <h1>Seznam hráčů</h1>
      <button onClick={() => navigate("/players/create")} className="btn-primary">
        Přidat hráče
      </button>
      {players.length == 0 ? (
        <p className="info-message">Žádní hráči</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Jméno</th>
              <th>Držení</th>
              <th>Počet zápasů</th>
              <th>Zápasy</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>
                  <Link to={`/players/${player.id}`}>{player.name}</Link>
                </td>
                <td>{player.handedness}</td>
                <td>{player.matches?.length || 0}</td>
                <td>
                  <Link to={`/players/${player.id}/matches`}>Zobrazit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PlayerList;