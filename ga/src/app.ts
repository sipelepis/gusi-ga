import express from "express";
import config from "config";
import path from "path";
const bcrypt = require("bcrypt");
import cors from "cors";
const port = config.get("port") as number;
const host = config.get("host") as string;
const sitestatsRouter = require('./routes/site-statistics');
const indexRouter = require('./routes/index')
const app = express();
app.use(cors());
app.set('view engine', 'pug')
app.use(express.json());
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });

    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/stats', sitestatsRouter);

app.listen(port, host, () => {
    console.log(`Server listing at http://${host}:${port}`);
});