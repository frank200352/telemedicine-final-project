/* jshint esversion: 8 */
/*eslint no-undef: "error"*/
/*global require, exports*/


const express = require(`express`);
// const router = express.Router()
const doctorregister = require(`../controllers/doctorregister`);
const register = require(`../controllers/register`);
const login = require(`../controllers/login`);
const doctorlogin = require(`../controllers/doctorlogin`);
const bookappointment = require(`../controllers/bookappoint`);
const viewdoctor = require(`../controllers/viewdoctor`);
const router = require("./pages");
const deleted = require(`../controllers/delete`);
const { isAuthenticated } = require(`../middlewares/auth`);
const { isAuthenticateddoctor } = require(`../middlewares/authdoctor`);


router.post(`/signup`, register.register);
router.post(`/signin`, login.login);

router.post(`/bookappointment`, isAuthenticated, bookappointment.book);

router.get(`/patient/viewdoctor`, isAuthenticated, viewdoctor.doctor);
router.post(`/patient/viewdoctor`, isAuthenticated, viewdoctor.find);
// // // // //
router.get(`/viewpatient`, isAuthenticateddoctor, viewdoctor.viewpatient);
router.post(`/viewpatient`, isAuthenticateddoctor, viewdoctor.findpatient);
router.get(`/editpatient/:id`, isAuthenticateddoctor, viewdoctor.editpatient);
router.post(`/editpatient/:id`, isAuthenticateddoctor, viewdoctor.update);
router.get(`/delete/:id`, isAuthenticateddoctor, deleted.deleted);


router.post(`/doctorregister`, register.doctorregister);
router.post(`/login`, doctorlogin.doctorlogin);



module.exports = router;