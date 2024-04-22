import express from "express";
import cors from "cors";
import { readEntry, writeEntry } from "./filesystem.js";
import { body, validationResult } from "express-validator";

const app = express();

app.use(cors());

app.use((req, _, next) => {
  console.log("new request:", req.method, req.url);
  next();
});

app.use(express.json());

app.get("/api/v1/gaestebuch", (req, res) => {
  readEntry()
    .then((entry) => res.status(200).json(entry))
    .catch((err) => res.status(500).json({ err, message: "Could not read all Entries" }));
});

const validateEntry = [
  body("vorname").trim().notEmpty().withMessage("Vorname darf nicht leer sein"),
  body("nachname").trim().notEmpty().withMessage("Nachname darf nicht leer sein"),
  body("email").isEmail().withMessage("Ungültige E-Mail-Adresse"),
  body("nachricht").trim().notEmpty().withMessage("Nachricht darf nicht leer sein"),
];

app.post("/api/v1/gaestebuch", validateEntry, (req, res) => {
  const valiErrors = validationResult(req);
  if (!valiErrors.isEmpty()) {
    return res.status(400).json({ valiErrors: valiErrors.array() });
  }

  readEntry()
    .then((entry) => {
      let lastEntry;
      if (entry.length === 0) {
        lastEntry = 0;
      } else {
        lastEntry = entry[entry.length - 1].id;
      }
      const newID = lastEntry + 1;

      const newEntry = {
        id: newID,
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        email: req.body.email,
        nachricht: req.body.nachricht,
      };
      return [...entry, newEntry];
    })
    .then((entryWithNewID) => writeEntry(entryWithNewID))
    .then((entryWithNewID) => res.status(200).json(entryWithNewID))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not read new Entry" });
    });
});

const PORT = 2233;
app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}`));
