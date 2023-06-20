/**
 * all required variables whether it be an import or a library
 */

const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const router = require("./controllers/index");
const session = require("express-session");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const hbs = exphbs.create({ extname: ".hbs" });

const port = process.env.PORT || 3001; //the port for it to listen too

/**
 * applying parameters to the cookie session
 */
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

/**
 * defining what to use in the program
 */
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", router);

/**
 * creating connection for handlebars
 */
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

/**
 * the sequlize sync for the local host
 */
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => console.log("Now listening"));
});
