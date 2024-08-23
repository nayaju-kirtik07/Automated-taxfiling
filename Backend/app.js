require("dotenv/config");
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const app = express();
const server = http.createServer(app);

const { connectToDatabase } = require("./database/tax-filing-db");

const userRouter = require("./allRoutes/UserRouter.js");
const companyDetailsRouter = require("./allRoutes/CompanyDetailsRouter.js");
const panRouter = require("./allRoutes/PanRouter.js");
const individualRouter = require("./allRoutes/IndividualDetailsRouter.js");
const companyTransactionRouters = require("./allRoutes/TransactionRouter.js");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.options("*", cors());

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    },
  })
);

app.use("/", userRouter);
app.use("/", companyDetailsRouter);
app.use("/", panRouter);
app.use("/", individualRouter);
app.use("/", companyTransactionRouters);

connectToDatabase(() => {
  console.log("Successfully connected to database");

  server.listen(3001, () => {
    console.log(`Server is running in 3001`);
  });
});
