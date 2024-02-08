const express = require('express');
const app = express();
const { sequelize } = require('./models/index');
const errorHandler = require("./middlewares/errorHandler");
const passport = require('passport');
const cors = require('cors');

// Settings
const PORT = process.env.PORT || 5002;

app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(require('./routes'));
app.use(errorHandler);
app.use(passport.initialize());
const cookieParser = require('cookie-parser')

const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cookieParser())
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors(corsOpts));

app.listen(PORT, function () {
  console.log(`Example app listening on http://localhost:${PORT}!`);

  sequelize.authenticate().then(() => {
      console.log('Database konnek');
  })
});