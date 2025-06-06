const express = require('express');
const app = express();
const path = require("path");
const port = 4000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/scaler/translate', require('./routes/route'));

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
