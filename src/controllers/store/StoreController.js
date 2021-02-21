'use strict'
const express = require('express');
const app = express();
const { PUBLIC_PATH_SRC } = require('../../config/config');

app.set('view engine', 'ejs');
app.set('views', PUBLIC_PATH_SRC('../views'));

app.get('/new-store', (req, res) => {
    return res.render('new-store');
});

module.exports = app;