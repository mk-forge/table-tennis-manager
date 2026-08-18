let express = require("express");
let { PrismaClient } = require("@prisma/client");
let cors = require('cors');

let app = express();
let prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/players", async (req, res) => {
  try {
    let players = await prisma.player.findMany({ include: { matches: true } });
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: "Chyba při načítání hráčů" });
  }
});

app.post("/players", async (req, res) => {
  try {
    let { name, handedness } = req.body;
    
    let player = await prisma.player.create({
      data: {
        name,
        handedness
      }
    });
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: "Chyba při vytváření hráče" });
  }
});

app.get("/players/:id", async (req, res) => {
  try {
    let player = await prisma.player.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { matches: true },
    });
    if (!player) {
      return res.status(404).json({ error: "Hráč nebyl nalezen" });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: "Chyba při načítání detailů hráče" });
  }
});

app.put("/players/:id", async (req, res) => {
  try {
    let { name, handedness } = req.body;
    if (!name || !handedness) {
      return res.status(400).json({ error: "Jméno a držení jsou povinné" });
    }
    let player = await prisma.player.update({
      where: { id: parseInt(req.params.id) },
      data: { name, handedness },
    });
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: "Chyba při úpravě hráče" });
  }
});

app.delete("/players/:id", async (req, res) => {
  try {
    let player = await prisma.player.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Hráč byl odstraněn", player });
  } catch (error) {
    res.status(500).json({ error: "Chyba při mazání hráče" });
  }
});

app.post("/players/:playerId/matches", async (req, res) => {
  try {
    let { date, score, opponentId } = req.body;
    if (!date || !score || !opponentId) {
      return res.status(400).json({ error: "Všechna pole jsou povinná" });
    }
    let match = await prisma.match.create({
      data: {
        date: new Date(date),
        score,
        playerId: parseInt(req.params.playerId),
        opponentId: parseInt(opponentId)
      },
      include: {
        opponent: true
      }
    });
    res.json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chyba při přidávání zápasu" });
  }
});

app.get("/players/:playerId/matches", async (req, res) => {
  try {
    let matches = await prisma.match.findMany({
      where: { playerId: parseInt(req.params.playerId) },
      include: { opponent: true }
    });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: "Chyba při načítání zápasů" });
  }
});

app.put("/matches/:matchId", async (req, res) => {
  try {
    let { date, score, opponentId } = req.body;
    if (!/^\d{1,2}:\d{1,2}$/.test(score)) {
      return res.status(400).json({ error: "Skóre musí být ve formátu číslo:číslo (např. 3:2)" });
    }
    let match = await prisma.match.update({
      where: { id: parseInt(req.params.matchId) },
      data: {
        date: new Date(date),
        score,
        opponentId: parseInt(opponentId)
      },
      include: { opponent: true }
    });
    res.json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chyba při úpravě zápasu" });
  }
});

app.delete("/matches/:matchId", async (req, res) => {
  try {
    let match = await prisma.match.delete({ where: { id: parseInt(req.params.matchId) } });
    res.json({ message: "Zápas byl odstraněn", match });
  } catch (error) {
    res.status(500).json({ error: "Chyba při mazání zápasu" });
  }
});

app.listen(3000, () => console.log("Server běží na http://localhost:3000"));