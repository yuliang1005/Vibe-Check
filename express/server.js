const express = require("express");
const cors = require("cors");
const path = require('path')
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(express.static('public'))

// Add CORS suport.
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Simple Hello World route.
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

// Add user routes.
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/post.routes.js")(express, app);
require("./src/routes/follow.routes.js")(express, app);
require("./src/routes/like.routes.js")(express, app);

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
