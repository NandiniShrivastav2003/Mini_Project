const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
//database connection
const db = require('./db/conn');
const Register = require("./models/register");
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//for port 
const port = process.env.PORT || 3000;

//for using static html file in public folder

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/register", (req, res) => {
    res.render("register");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.post("/login",function(req,res){
   Register.find({email:req.body.email},function(err,user){
        if(err){
            console.log('error in getting login details');
            return ;
        }
        console.log('users details is ', user);
        if(user){
               if(user[0].password == req.body.password){
                console.log("successfully signed in...");
                //res.cookie('user_id',user[0].id);
               return res.redirect('/');
}
               else{
                console.log('username/password did not match..');
                return res.redirect('/login');
               }
}
        else{
            return res.redirect('back');
        }
        });
})
//create a new user in database
app.post("/register", function (req, res) {
    // res.send(JSON.stringify(req.body));
    Register.findOne({
        email: req.body.email

    }, function (err, user) {
        if (err) {
            console.log('error in finding user:', err);
            return
        }
        if (!user) {
            Register.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in creating database', err);
                    return;
                }
                console.log('database created:', user);
                return res.redirect('/');
            })
        }
        else {
            return res.redirect('back');
        }
    }
    )
})
//   try {
//         if (pass == cpass) {

//             const pass = req.body.password;
//             const cpass = req.body.confirmpassword;

//      const userSchema = new Register({
//                 username: req.body.username,
//                 gender: req.body.gender,
//                 phone: req.body.phone,
//                 email: req.body.email,
//                 password: pass,
//                 confirmpassword: cpass
//             })
//             console.log(username+gender+phone+email+pass+cpass);
//             const registered = await userSchema.save();
//             res.status(201).render(registered);
//         }

//         else {
//             res.send('Passwords are not matching');
//         }
//     }
//     catch (error) {
//         res.status(400).send(error);
//     }

app.listen(port, () => {
    console.log(`server is running at port no ${port} http://localhost:3000`);
})