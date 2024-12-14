/* jshint esversion: 8 */
/*eslint no-undef: "error"*/
/*global require, exports*/
/*global require, module*/

const express = require(`express`);
const router = express.Router();
const cookieParser = require(`cookie-parser`);
const {isAuthenticated} = require(`../middlewares/auth`);
const { isAuthenticateddoctor } = require("../middlewares/authdoctor");

router.get(``, (req, res)=>{
    res.render(`index`);
}),
router.get(`/`, (req, res)=>{
    res.render(`index`);
}),

router.get(`/home`, (req, res)=>{
    res.render(`index`);
}),

router.get(`/signup`, (req, res)=>{
    res.render(`register`);
}),
router.get(`/registerdoctor`, (req, res)=>{
    res.render(`registerdoctor`);
}),
router.get(`/login`, (req, res)=>{
    res.render(`logindoctor`);
}),
router.get(`/doctor`, (req, res)=>{
    res.render(`doctorpage`);
}),

router.get(`/dashboard`, isAuthenticated, (req, res)=>{
    // console.log(req.patients);
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('expires', '0');
    res.render(`dashboard`, { patient: req.patients });
}),

router.get(`/doctordash`, isAuthenticateddoctor, (req, res)=>{
    res.render(`doctordashboard`, {doctor: req.doctors});
}),

router.get(`/bookappointment`, isAuthenticated, (req, res)=>{
    res.render(`bookappointment`);
}),

router.get(`/signin`, (req, res)=>{
    res.render(`login`);
}),

router.get(`/logout`, (req, res)=>{
    res.clearCookie(`userRegister`);
    res.redirect(`/signin`);
}),
router.get(`/doctorlogout`, (req, res)=>{
    res.clearCookie(`userRegister`);
    res.redirect(`/login`);
}),

router.get(`/patient`, (req, res)=>{
    res.render(`patient`);
}),

module.exports = router