import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PlayerMatches() {
  let { id } = useParams();
  let navigate = useNavigate();
  let [player, setPlayer] = useState(null);
  let [matches, setMatches] = useState([]);
  let [allPlayers, setAllPlayers] = useState([]);
  let [newMatch, setNewMatch] = useState({ date: "", score: "", opponentId: "" });
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [editingMatch, setEditingMatch] = useState(null);
  let [validationError, setValidationError] = useState("");

  useEffect(() => {
    document.title = "Zápasy hráče";
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

  let handleAddMatch = async (e) => {
    e.preventDefault();
    setValidationError("");
    if (!newMatch.date || !newMatch.opponentId || !newMatch.score) {
      setValidationError("Vyplňte všechna pole");
      return;
    }
    if (!/^\d{1,2}:\d{1,2}$/.test(newMatch.score)) {
      setValidationError("Skóre musí být ve formátu číslo:číslo (např. 3:2)");
      return;
    }
    try {
      let response = await axios.post(`http://localhost:3000/players/${id}/matches`, {
        ...newMatch,
        opponentId: parseInt(newMatch.opponentId),
        date: new Date(newMatch.date).toISOString()
      });
      setMatches([...matches, response.data]);
      setNewMatch({ date: "", score: "", opponentId: "" });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Nepodařilo se přidat zápas");
    }
  };

  let handleDeleteMatch = async (matchId) => {
    try {
      await axios.delete(`http://localhost:3000/matches/${matchId}`);
      setMatches(matches.filter(match => match.id != matchId));
    } catch (err) {
      setError("Nepodařilo se smazat zápas");
    }
  };

  let handleUpdateMatch = async (e) => {
    e.preventDefault();
    if (!/^\d{1,2}:\d{1,2}$/.test(editingMatch.score)) {
      setError("Skóre musí být ve formátu číslo:číslo (např. 3:2)");
      return;
    }
    try {
      let response = await axios.put(`http://localhost:3000/matches/${editingMatch.id}`, {
        ...editingMatch,
        date: new Date(editingMatch.date).toISOString()
      });
      setMatches(matches.map(match => match.id == editingMatch.id ? response.data : match));
      setEditingMatch(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Nepodařilo se upravit zápas");
    }
  };

  let formatDateTime = (date) => {
    let d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="spinner"></div>;
  if (error) return <p className="error-message">{error}</p>;
  if (!player) return <p className="error-message">Hráč nebyl nalezen</p>;

  return (
    <div className="content-wrapper">
      <h1>Zápasy hráče: {player.name}</h1>
      <button onClick={() => navigate(`/players/${id}`)} className="back-link">
        Zpět na profil hráče
      </button>

      <h2>Přidat zápas</h2>
      {validationError && <p className="error-message">{validationError}</p>}
      <form onSubmit={handleAddMatch} style={{ margin: 0 }}>
        <div>
          <label>Datum a čas:</label>
          <input
            type="datetime-local"
            value={newMatch.date}
            onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Protihráč:</label>
          <select
            value={newMatch.opponentId}
            onChange={(e) => setNewMatch({...newMatch, opponentId: e.target.value})}
            required
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #d0d7de' }}
          >
            <option value="">Vyberte...</option>
            {allPlayers.filter(p => p.id != player.id).map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Skóre (tvoje : protihráč):</label>
          <input
            type="text"
            value={newMatch.score}
            onChange={(e) => setNewMatch({...newMatch, score: e.target.value})}
            required
          />
        </div>
        <button type="submit">Přidat zápas</button>
      </form>

      <h2>Seznam zápasů</h2>
      {matches.length == 0 ? (
        <p className="info-message">Žádné zápasy</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Datum</th>
              <th>Protihráč</th>
              <th>Skóre</th>
              <th>Akce</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id}>
                {editingMatch?.id == match.id ? (
                  <>
                    <td>
                      <input
                        type="datetime-local"
                        value={editingMatch.date}
                        onChange={(e) => setEditingMatch({ ...editingMatch, date: e.target.value })}
                      />
                    </td>
                    <td>
                      <select
                        value={editingMatch.opponentId || ""}
                        onChange={(e) => setEditingMatch({ ...editingMatch, opponentId: parseInt(e.target.value) })}
                        style={{ width: '100%', padding: '8px' }}
                      >
                        <option value="">Vyberte...</option>
                        {allPlayers.filter(p => p.id != player.id).map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editingMatch.score}
                        onChange={(e) => setEditingMatch({ ...editingMatch, score: e.target.value })}
                        placeholder="3:2"
                      />
                    </td>
                    <td>
                      <button onClick={handleUpdateMatch}>Uložit</button>
                      <button onClick={() => setEditingMatch(null)}>Zrušit</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{formatDateTime(match.date)}</td>
                    <td>{match.opponent?.name || "-"}</td>
                    <td>{match.score}</td>
                    <td>
                      <button onClick={() => setEditingMatch({...match, date: match.date.slice(0, 16)})} className="btn-secondary">
                        Upravit
                      </button>
                      <button onClick={() => handleDeleteMatch(match.id)} className="btn-danger">
                        Smazat
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PlayerMatches;