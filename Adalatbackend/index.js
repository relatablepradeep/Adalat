const express = require('express');
const app = express();
const port = 4000;
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html from public folder
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.use('/scaler/translate', require("./routes/route.js"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
