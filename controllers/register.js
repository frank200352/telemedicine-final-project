/* jshint esversion: 8 */
/*eslint no-undef: "error"*/
/*global require, exports*/


const express = require(`express`);     //jsonwebtoken this for later in login
const db = require(`../database`);      //importing database connection
const bcrypt = require(`bcryptjs`);     // hashing password

// exporting the authentication function
exports.register = (req, res)=>{
    // creating a variable to hold post request data from the Registration form
    const {patient_id, firstname, lastname, phone, email, address, gender, date_of_birth, password, passwordconfirm, status} = req.body;
// console.log(req.body);
  
    db.query(`select email from patients where email = ?`, [email], async (err, result)=>{
        if(err){
            console.log(err);
            
        }else if(result.length > 0){
            return res.render(`register`, {
                error: `Email Already Exist`
            });
            //Validation of email and password to avoid bypass
        }else if(password !== passwordconfirm){
            return res.render(`register`, {
                error: `Password Do Not Match`
            });
        }
        else if(!password || password.length < 8 ){
            return res.render(`register`, {
                error: `Password weak or are empty`
            });
        }else if(!email){
            return res.render(`register`, {
                error: `Email field is empty`
            });
        }else if(!date_of_birth){
            return res.render(`register`, {
                error: `Date_of_Birth field is empty`
            });
        }
        //Hashing of password that will be store in the database
        const hashedpassword = await bcrypt.hash(password, 8);
        db.query(`insert into patients set ?`, {first_name:first_name, last_name:last_name, email:email, phone:phone, address:address,gender:gender,date_of_birth:date_of_birth, password:password_hash, role:status},(err, result)=>{
            if(err){
                console.log(err);
                
            }else{
                res.render(`register`, {
                    message: `Registration Completed ✅`
                });
            }
        });
    });
    // res.send(`from submitted`)
};


