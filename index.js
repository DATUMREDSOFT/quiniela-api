
const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
   // origin: "http://localhost:4200/"
    origin: "http://192.168.1.5:4200/"
};

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to quiniela application." });
});


require('./src/app/routes/quiniela')(app);
require('./src/app/routes/participante')(app);
require('./src/app/routes/juego')(app);
require('./src/app/routes/premium')(app);

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
 
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on dev ${port}`));