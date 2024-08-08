import path from "path";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const links = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
];

const users = ["Thomas", "Percy", "Edward", "Henry"];

const aboutContent =
  "Aliquam nec ligula ut odio ullamcorper hendrerit vel non elit. Praesent pellentesque massa at dolor sagittis, eget vulputate metus venenatis. Integer vulputate vehicula dolor. Vivamus egestas, eros eu fringilla fermentum, odio urna efficitur ante, suscipit laoreet erat massa ac risus. Nullam eget lacinia urna, eget pharetra turpis. Maecenas consequat, justo ac dictum pulvinar, tortor justo dignissim lacus, sit amet tempor lorem lacus ultrices massa. Morbi non ex volutpat, lobortis lorem sit amet, tristique nisl. Pellentesque cursus quis lorem quis laoreet. Aenean porta dolor consectetur, pretium nibh eu, congue nulla. Vestibulum quam mi, sollicitudin aliquam efficitur vel, viverra sodales justo.";

const port = process.env.PORT || 3000;
const { dirname } = import.meta;
const stylesPath = path.join(dirname, "public/styles");
const imagesPath = path.join(dirname, "public/assets/images");
const app = express();

app.use(express.static(stylesPath));
app.use(express.static(imagesPath));

app.set("views", path.join(dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { links, users });
});

app.get("/about", (req, res) => {
  res.render("about", { links, content: aboutContent });
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
