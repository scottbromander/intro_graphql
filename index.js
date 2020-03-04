import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("GraphQL is amazeballs!");
});

app.listen(8080, () => {
  console.log("Running on Port 8080!");
});
