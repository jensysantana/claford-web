'use strict'
const express = require('express');
const app = express();
const { PUBLIC_PATH_SRC } = require('../../config/config');

app.set('view engine', 'ejs');
app.set('views', PUBLIC_PATH_SRC('../views'));

app.get('/', (req, res) => {
    return res.render('become-a-vendor');
});
module.exports = app;