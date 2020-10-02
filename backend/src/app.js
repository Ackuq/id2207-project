import express from "express";
import AuthRouter from "./routes/auth";
import ApiRouter from "./routes/api";
import authenticate from "./middleware/authentication";
import { API_ROUTE, AUTH_ROUTE } from "./utils/constants";
import mockUsers from "./mock/createUsers";

const app = express();

app.use(express.json());

if (process.env.MOCK_USERS) {
  mockUsers();
}

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

app.use(AUTH_ROUTE, AuthRouter);

app.use(API_ROUTE, ApiRouter);

/**
 * Use authentication on the API
 */
app.use(API_ROUTE, authenticate);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
