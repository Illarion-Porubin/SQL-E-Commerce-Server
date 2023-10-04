require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require("./models/index");
const fileUpload = require('express-fileupload');
const MainRouters = require("./routers/mainRouters");

const PORT = 5000;
const app = express();
app.use(fileUpload({}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('static'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

app.use('/api', MainRouters);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})
 
  