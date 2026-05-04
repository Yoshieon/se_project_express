const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require('celebrate');
const mainRouter = require("./routes/index");
const { login, createUser } = require("./controllers/users");
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require("dotenv").config();

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch(console.error);

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.post("/signin", login); // For existing users to log in
app.post("/signup", createUser); // For new users to create accounts

app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
