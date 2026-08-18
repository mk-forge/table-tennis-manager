import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function PlayerDetail() {
  let { id } = useParams();
  let [player, setPlayer] = useState(null);
  let [matches, setMatches] = useState([]);
  let [allPlayers, setAllPlayers] = useState([]);
  let [newMatch, setNewMatch] = useState({ date: "", score: "", opponentId: "" });
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [matchError, setMatchError] = useState("");

  useEffect(() => {
    document.title = "Detail hráče";
    let fetchData = async () => {
      try {
        let [playerRes, matchesRes, playersRes] = await Promise.all([
          axios.get(`http://localhost:3000/players/${id}`),
          axios.get(`http://localhost:3000/players/${id}/matches`),
          axios.get("http://localhost:3000/players")
        ]);
        setPlayer(playerRes.data);
        setMatches(matchesRes.data);
        setAllPlayers(playersRes.data);
      } catch (err) {
        setError("Nepodařilo se načíst data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  let handleAddMatch = async () => {
    if (!newMatch.date || !newMatch.score || !newMatch.opponentId) {
      setMatchError("Vyplňte všechna pole");
      return;
    }
    if (!/^\d{1,2}:\d{1,2}$/.test(newMatch.score)) {
      setMatchError("Skóre musí být ve formátu číslo:číslo (např. 3:2)");
      return;
    }
    setMatchError("");
    try {
      let response = await axios.post(`http://localhost:3000/players/${id}/matches`, {
        date: newMatch.date,
        score: newMatch.score,
        opponentId: parseInt(newMatch.opponentId)
      });
      setMatches([...matches, response.data]);
      setNewMatch({ date: "", score: "", opponentId: "" });
    } catch (err) {
      setError("Nepodařilo se přidat zápas");
    }
  };

  let formatDateTime = (date) => {
    let d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="spinner"></div>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    player && (
      <div className="content-wrapper">
        <div className="detail-container">
          <Link to="/players" className="back-link">Zpět na seznam hráčů</Link>
          <h1>{player.name}</h1>
          <p><strong>Držení:</strong> {player.handedness}</p>
          <h2>Přidat zápas</h2>
          <div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Datum a čas:</label>
              <input
                value={newMatch.date}
                onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
                type="datetime-local"
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Protihráč:</label>
              <select
                value={newMatch.opponentId}
                onChange={(e) => setNewMatch({ ...newMatch, opponentId: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d0d7de' }}
              >
                <option value="">Vyberte...</option>
                {allPlayers.filter(p => p.id != player.id).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Skóre (tvoje : protihráč):</label>
              <input
                value={newMatch.score}
                onChange={(e) => setNewMatch({ ...newMatch, score: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>
            {matchError && <p style={{ color: '#cc0000', margin: '8px 0' }}>{matchError}</p>}
            <button onClick={handleAddMatch} style={{ marginTop: '8px' }}>Přidat zápas</button>
          </div>
          <h2>Seznam zápasů</h2>
          <ul>
            {matches.map((match) => (
              <li key={match.id}>
                <div><strong>Datum:</strong> {formatDateTime(match.date)}</div>
                <div><strong>Protihráč:</strong> {match.opponent?.name || "-"}</div>
                <div><strong>Skóre:</strong> {match.score}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}

export default PlayerDetail;