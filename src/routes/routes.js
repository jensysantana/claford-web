'use strict'
const routes = require('express').Router();
const homePage = require('../controllers/home/home');
const storePage = require('../controllers/store/StoreController');
const vendorPage = require('../controllers/vendor/VendorController');
const authPage = require('../controllers/auth/AuthController');
// const aboutPage = require('../viewControllers/aboutViewController/aboutViewController');

// routes.use('/about', aboutPage);
routes.use('/auth', authPage);
routes.use('/become-a-vendor', vendorPage);
routes.use('/store', storePage);
routes.use('/', homePage);
module.exports = routes;