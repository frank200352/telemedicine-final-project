/* jshint esversion: 8 */
/*eslint no-undef: "error"*/
/*global require, exports*/


const express = require(`express`);     //jsonwebtoken this for later in login
const db = require(`../database`);      //importing database connection
const bcrypt = require(`bcryptjs`);     // hashing password

exports.doctorregister = (req, res)=>{
    // firstname
    // lastname:                            
    // email: 
    // phone: 
    // address: 
    // date_of_birth: 
    // gender: 
    // password: 
    // passwordconfirm:

    // {{!-- firstname, lastname, specialty, date_of_birth, email, phone, gender, password, date_joined, address, status --}}
    // console.log(req.body);
    const {first_name, last_name, email, phone, date_of_birth, address, password, gender, passwordconfirm, date_joined, status, specialty,} = req.body;

    if (!email || !phone || !firstname){
        return res.render(`registerdoctor`, {
            error: `Email, Phone Number Field must not be Empty`
        });
    }
    else{
        db.query(`select email from doctors where email = ?`, [email], async(err, result)=>{
            if (err){
                console.log(err);
                
            }else if(result[0]){
                return res.status(404).render(`registerdoctor`, {
                    error: `Email Already Exist`
                });
            }else if(password !== passwordconfirm){
                return res.status(404).render(`registerdoctor`, {
                    error: `Password do not match`
                });
            }                                                     
            const hashedpassword = await bcrypt.hash(password, 8);
            db.query(`insert into doctors set ?`, {firstname:first_name, lastname:last_name, email:email, address:address, date_of_birth:date_of_birth,gender:gender, phone:phone, password:password_hash,date_joined:date_joined, status:status, specialty:specialty}, 
                (err, result)=>{
                if(err){
                    console.log(err);
                    
                }else{
                    res.render(`registerdoctor`, {message: `Dear ${lastname}, 
                        Details Registered Successfully, 
                        Meet Your Head of Admin for the Next Step`});
                }
            });
        });
    }


    // res.send(`form submitted`)
    
};