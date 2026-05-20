const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/save-answer", (req, res) => {
  const data = req.body;

  let responses = [];
  if (fs.existsSync("responses.json")) {
    responses = JSON.parse(fs.readFileSync("responses.json"));
  }

  responses.push({
    ...data,
    time: new Date().toLocaleString()
  });

  fs.writeFileSync("responses.json", JSON.stringify(responses, null, 2));

  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Love app running on port ${PORT}`);
});
