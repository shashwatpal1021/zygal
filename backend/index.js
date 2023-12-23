const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Serve static files (like your JSON file)
app.use(express.static(path.join(__dirname, "public")));

const users = [{ email: "sample1@gmail.com", password: "9876" }];


app.get("/", (req, res) => {
  res.send("hello")
})

// Your login route
app.post("/login", (req, res) => {
  // Read the JSON file

  // Validate credentials
  const { email, password } = req.body;

  const isValidUser = users.some((user) =>
    user.email === email &&
    user.password === password
  );

  if (!isValidUser) {
    // Set user information in a cookie
    res.send("invalid criedentials").status(401);
  } else { 
  res.cookie("user", JSON.stringify({ email }));
    res.send("Login Successfully");
    res.redirect("/page2.html")
}
});

// Your Page-2 route
app.get("/page2", (req, res) => {
  // Check if the user is authenticated
  const userCookie = req.cookies.user;

  if (userCookie) {
    // Render Page-2
    res.sendFile(path.join(__dirname, "public", "page2.html"));
  } else {
    // Redirect to Page-1 if not authenticated
    res.redirect("/login");
  }
});

// Your submitData route
app.post("/submitData", (req, res) => {
  const userCookie = req.cookies.user;

  if (userCookie) {
    // Implement logic to store data on the server
    const dataInput = req.body.dataInput;
    // Store or process the data as needed
    console.log(`Data submitted by ${userCookie.email}: ${dataInput}`);
    res.sendStatus(200);
  } else {
    // Unauthorized access, redirect to login
    res.sendStatus(401);
  }
});

// Your searchData route
app.get("/searchData", (req, res) => {
  const userCookie = req.cookies.user;

  if (userCookie) {
    // Implement logic to search data on the server
    const query = req.query.query;
    // Perform search logic and send results
    const searchResults = serverData.filter((item) =>
      item.name.toLowerCase().includes(query)
    );

    res.json(searchResults);
  } else {
    // Unauthorized access, redirect to login
    res.sendStatus(401);
  }
});

// Your clearCookies route
app.get("/clearCookies", (req, res) => {
  // Implement logic to clear cookies on the server
  res.clearCookie("user");
  res.sendStatus(200);
});

// Your logout route
app.get("/logout", (req, res) => {
  // Implement logic to logout on the server
  res.clearCookie("user");
  res.sendStatus(200);
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
