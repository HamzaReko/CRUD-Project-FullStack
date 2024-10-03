// =============================================================================
// Freq Const
// =============================================================================
const express = require("express");
const app = express();
const port = process.env.PORT || 3200;
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
const mongoose = require("mongoose");
const Article = require("./models/schema");
var moment = require("moment");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
var country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre & Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts & Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
// =============================================================================
// Routing
// =============================================================================

app.get("/user/add.html", (req, res) => {
  res.render("./user/add", { cList: country_list });
});
app.get("/edit/:id", (req, res) => {
  Article.findById(req.params.id)
    .then((result) => {
      res.render("./user/edit", {
        obj: result,
        moment: moment,
        cList: country_list,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// app.get("/user/search.html", (req, res) => {
//   res.render("./user/search", {});
// });

// =============================================================================
// Link DB
// =============================================================================
mongoose
  .connect(
    "mongodb+srv://devhamza:3JMTa2lOyU2wD9MM@devhamza.hhj8p.mongodb.net/alldata?retryWrites=true&w=majority&appName=devhamza"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log("ERROR");
  });

// =============================================================================
// Requests (Post,Get)
// =============================================================================

// From Add Page To DB

app.post("/", (req, res) => {
  const article = new Article(req.body);
  article
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("err");
    });
});

app.post("/search", (req, res) => {
  const searchText = req.body.searchText.trim()
  Article.find({ $or: [{firstname:searchText},{lastname:searchText}]})
    .then((result) => {
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log("err");
    });
});

// From DB to Home Page
app.get("/", (req, res) => {
  Article.find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

// View Object Details
app.get("/view/:id", (req, res) => {
  Article.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
// delete

app.delete("/edit/:id", (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((done) => {
      console.log(done);
    });
});
app.put("/edit/:id", (req, res) => {
  Article.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((done) => {
      console.log(done);
    });
});
