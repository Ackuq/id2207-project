import express from "express";

const app = express();

/**
 * Pretty print json
 */
app.set("json spaces", 2);

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.send("Welcome to SEP's backend");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
