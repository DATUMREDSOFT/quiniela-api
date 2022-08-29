
const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to quiniela application." });
});


require('./src/app/routes/quiniela')(app);

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on dev http://localhost:${port}`));