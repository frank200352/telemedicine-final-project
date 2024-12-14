/* jshint esversion: 8 */
/*eslint no-undef: "error"*/
/*global require, exports*/



const db = require(`../database`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);



exports.login = (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render(`login`, {
            error: `Please input Email/Password`
        });
    } else {
        db.query(`select * from patients where email = ?`, [email], async (err, result) => {
            if (err) {
                console.log(err);

            } else if (!result[0] || !await bcrypt.compare(password, result[0].password)) {
                return res.render(`login`, {
                    error: `Invalid Email or password`
                });
            }
            const token = jwt.sign({ patient_id: result[0].patient_id, firstname: result[0].firstname, email: result[0].email }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            });

            const cookieoptions = {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',
            };

            // console.log(cookieoptions);

            res.cookie(`userRegister`, token, cookieoptions);
            res.redirect(`/dashboard`);
        });
    }

    // res.send(`form submitted`)
};


