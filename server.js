const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the root directory

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Serve votes.txt file
app.get("/votes", (req, res) => {
  fs.readFile("votes.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading votes file:", err);
      res.status(500).send("Error reading votes file");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post("/save_votes", (req, res) => {
  const votes = req.body.votes;
  const data = JSON.stringify(votes);

  fs.writeFile("votes.txt", data, (err) => {
    if (err) {
      console.error("Error saving votes:", err);
      res.status(500).send("Error saving votes");
    } else {
      console.log("Votes saved successfully");
      res.send("Votes saved successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
