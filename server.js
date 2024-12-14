/* jshint esversion: 8 */
/*eslint no-undef: "error"*/
/*global require, exports*/


const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());



// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maryadebayo08',
    database: 'hospital2_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// exporting tht database out to several files 
module.exports = {db};