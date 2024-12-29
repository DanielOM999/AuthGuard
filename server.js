const express = require("express");
const exphbs = require('express-handlebars');
const path = require("path");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require("passport");
const flash = require("express-flash");
const methodOverride = require("method-override");
const app = express();

const hbs = exphbs.create({
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        toLowerCase: function(str) {
            return str.toLowerCase();
        }
    }
});

app.use(session({
    secret: 'gudgskuig3843g4',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 60000
      }
}));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));


app.get("/", cheackAuthenticated, (req, res) => res.render("Index", { layout: "index" }));
app.get("/Etemplate", (req, res) => res.render("emailTemplate"));
app.get("/vm", (req, res) => res.render("mustVerify", { layout: "mv" }));


const loginRoute = require("./routes/auth");
const resendRoute = require("./routes/resend");

app.use("/auth", loginRoute);
app.use("/resend", resendRoute);

function cheackAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/auth");
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));