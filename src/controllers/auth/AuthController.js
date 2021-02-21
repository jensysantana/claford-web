'use strict'
const express = require('express');
const app = express();
const { PUBLIC_PATH_SRC } = require('../../config/config');

app.set('view engine', 'ejs');
app.set('views', PUBLIC_PATH_SRC('../views'));

app.get('/sign-in', (req, res) => {
    return res.render('sign-in');
});
app.get('/sign-up', (req, res) => {
    return res.render('sign-up');
});
//not used
app.get('/account-validate', (req, res) => {
    return res.render('account-validate');
});

app.get('/recovery', (req, res) => {
    return res.render('account-recovery');
    // return res.render('forgot-password');
});
app.get('/recovery-feedback', (req, res) => {
    return res.render('account-recovery-feedback');
});
app.get('/recovery-check-email', (req, res) => {
    return res.render('account-recovery-check-email');
});
app.get('/recovery-phone-code', (req, res) => {
    return res.render('account-recovery-phone-code');
});
app.get('/set-password', (req, res) => {
    return res.render('account-set-password');
});
module.exports = app;