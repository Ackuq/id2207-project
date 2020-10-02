import express from "express";
import cors from "cors";
import AuthRouter from "./routes/auth";
import ApiRouter from "./routes/api";
import authenticate from "./middleware/authentication";
import { API_ROUTE, AUTH_ROUTE } from "./utils/constants";
import mockUsers from "./mock/createUsers";

const app = express();

app.use(cors());

app.use(express.json());

if (process.env.MOCK_USERS) {
  mockUsers();
}

/**
 * Pretty print json
 */
app.set("json spaces", 2);

/**
 * Use authentication on the API
 */
app.use(`${API_ROUTE}/`, authenticate);

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.send("Welcome to SEP's backend");
});

app.use(AUTH_ROUTE, AuthRouter);

app.use(API_ROUTE, ApiRouter);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
