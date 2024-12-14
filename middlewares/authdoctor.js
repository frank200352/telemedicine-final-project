/* jshint esversion: 8 */
/*eslint no-undef: "error"*/
/*global require, exports*/


const jwt = require(`jsonwebtoken`);
const cookieParser = require(`cookie-parser`);



exports.isAuthenticateddoctor = (req, res, next)=>{
    const token = req.cookies.userRegister;
    if(!token){
        return res.render(`logindoctor`, {error: `Session Expires, Please Re-Login`});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.doctors = decoded;
        next();
    } catch (error) {
        console.log(err);
        return redirect(`/login`);
    }
};