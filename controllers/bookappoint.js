/* jshint esversion: 8 */
/*eslint no-undef: "error"*/
/*global require, exports*/


const db = require(`../database`);

exports.book = (req, res)=>{
    // console.log(req.body);

    // firstname: ,
    // lastname: 
    // email:
    // phone: 
    // appointment_date: 
    // appointment_time: 

const {firstname, lastname, email, phone, appointment_date, appointment_time} = req.body;
if(!email || !firstname){
    return res.render(`bookappointment`, {error: `Please fill all Required Field`});
}
db.query(`select * from patients where email = ? AND firstname = ?`, [email, firstname], (err, result)=>{
    if(err){console.log(err);}
    else if(!result[0]){
        res.status(404).render(`bookappointment`, { error: `Please Use Your Register Email Address and Surname`});
    }
    else if(result[0]){

        var patientid = result[0].patient_id;
    //    console.log(patientid);
         
    }
    db.query(`insert into appointment set ?`, {firstname:firstname, appointment_date:appointment_date, email:email, appointment_time:appointment_time,patient_id:patientid}, (err, result)=>{
        if(err)console.log(err);
        else{
            res.render(`bookappointment`, {message: `Appointment Booked Successfully for Patient ${firstname}`});
    }
    });
});



    // res.send(`form submitted`)
};