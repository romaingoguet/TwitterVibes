require('dotenv').config();
const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require ('cors');
const morgan = require ('morgan');
const tweet = require ('./routes/tweet');
const port = 3131;


// Middelwares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use('/api/v1/', tweet)
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(port);

module.exports = app;