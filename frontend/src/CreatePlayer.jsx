import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePlayer() {
  let [name, setName] = useState("");
  let [handedness, setHandedness] = useState("");
  let [error, setError] = useState(null);
  let [success, setSuccess] = useState(false);
  let [validationError, setValidationError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
      document.title = "Vytvoření hráče";
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    setError(null);

    if (!name.trim()) {
      setValidationError("Jméno a příjmení je povinné");
      return;
    }
    if (!handedness) {
      setValidationError("Vyberte držení");
      return;
    }

    try {
      setSuccess(false);
      await axios.post("http://localhost:3000/players", {
        name: name.trim(),
        handedness: handedness
      });
      setSuccess(true);
      setName("");
      setHandedness("");
      setTimeout(() => navigate("/players"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Nepodařilo se vytvořit hráče");
    }
  };

  return (
    <div className="content-wrapper">
      <h1>Vytvoření nového hráče</h1>
      {validationError && <p className="error-message">{validationError}</p>}
      {error && <p className="error-message">Chyba: {error}</p>}
      {success && <p className="success-message">Hráč byl úspěšně vytvořen!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Jméno a příjmení:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>Držení:</label>
          <select
            value={handedness}
            onChange={(e) => setHandedness(e.target.value)}
            required
            style={{ width: '100%', padding: '10px 12px', fontSize: '15px', border: '1px solid #d0d7de' }}
          >
            <option value="">Vyberte...</option>
            <option value="Levák">Levák</option>
            <option value="Pravák">Pravák</option>
          </select>
        </div>
        <button type="submit">Vytvořit hráče</button>
      </form>
    </div>
  );
}

export default CreatePlayer;