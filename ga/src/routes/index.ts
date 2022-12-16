import express from "express";
import cors from "cors";
const router= express.Router();
router.use(cors());
const bcrypt = require("bcrypt");
/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express', message: 'test' });
    res.send(":)")
});

module.exports = router;
