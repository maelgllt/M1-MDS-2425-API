const express = require('express')
const axios = require('axios');
const passwordGenerator = require('password-generator');
const app = express()
const port = 3000
const {User} = require('./models');
const { hash, compare } = require('bcrypt');
const morgan = require('morgan')
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('HackR API - Maël GUILLOTEAU');
});

app.get('/tools/email-check', async (req, res) => {
    const { email } = req.query; 
    if (!email) {
        return res.status(400).send('email requis');
    }

    try {
        const response = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=4c03cad5c7458f943080c7d3f04c999716023dfa`);
        const result = response.data.data;
        if (result.status === 'valid'){
            res.send('l\'email existe')
        } else {
            res.send('l\'email n\'existe pas')
        }
    } catch (error) {
        res.status(500).send('erreur lors de la vérification de l\'email');
    }
});

app.get('/tools/password-check', async (req, res) => {
    const { password } = req.query;
    if (!password) {
        return res.status(400).send('mot de passe requis');
    }

    try {
        const response = await axios.get('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt');
        const commonPasswords = response.data.split('\n');
        const isCommon = commonPasswords.includes(password);

        if (isCommon) {
            res.send('le mot de passe est courant.');
        } else {
            res.send('le mot de passe n\'est pas courant.');
        }
    } catch (error) {
        console.error('erreur lors de la récupération de la liste des mots de passe :', error.message);
        res.status(500).send('erreur lors de la vérification du mot de passe.');
    }
});

app.get('/tools/generate-password', (req, res) => {
    const { length } = req.query;
    const passwordLength = length ? parseInt(length, 10) : 12; // longueur par défaut 12 caractères

    if (isNaN(passwordLength) || passwordLength < 8) {
        return res.status(400).send('longueur de mot de passe invalide minimum 8 caractères.');
    }

    const securePassword = passwordGenerator(passwordLength, true);
    res.send({ password: securePassword });
});



// app.get('/protected-route', authentication, (req, res) => {
//     res.status(200).json({ message: "You have access to this route", user: req.user });
// });

app.post('/register', async (req, res, next) => {
    try {
        let {email, password} = req.body
        let user = await User.create({
            email, 
            password : password
        })
        res.status(201).json({id : user.id, email : user.email})
    } catch (error) {
        next(error)
    }
})

app.post('/login', async (req, res, next) => {
    try {
        let {email, password} = req.body
        if(!email) throw {name : "Email is required"}
        if(!password) throw {name : "Password is required"}
        let user = await User.findOne({
            where : {
                email
            }
        })
        if(!user) throw {name : "Invalid email/password"}
        let valid = compare(password, user.password)
        if(!valid) throw {name : "Invalid email/password"}
        let access_token = jwt.sign({id : user.id}, "secret")
        res.status(200).json({access_token})
    } catch (error) {
        next(error)
    }
})


app.listen(port, () => {
    console.clear()
    console.log(`The app is running on port ${port}`)
})

app.use(errorHandler)

function errorHandler(err, req, res, next){
    let status = err.status || 500
    let message = err.message || "Internal server error"

    switch(err.name){
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400;
            message = err.errors[0].message
            break;
        case "Invalid Input":
        case "Email is required":
        case "Password is required":
            status = 400;
            message = err.name
            break;
        case "Invalid email/password":
            status = 401;
            message = err.name
            break
        case "Invalid token":
        case "JsonWebTokenError":
            status = 401;
            message = "Invalid token"
            break
        case "Forbidden" :
            status = 403;
            message = "You are not authorized"
            break;
        case "Data not found":
        case "Hero not found":
            status = 404;
            message = err.name
            break;
    }
    res.status(status).json({message})
}

async function authentication(req, res, next){
    try {
        if(!req.headers.authorization) throw {name : "Invalid token"}
        let [type, token] = req.headers.authorization.split(" ")
        if(type !== "Bearer") throw {name : "Invalid token"}
        let payload =  jwt.verify(token, "secret")
        if(!payload) throw {name : "Invalid token"}
        let user = await User.findByPk(payload.id)
        if(!user) throw {name : "Invalid token"}
        req.user = {
            id : user.id
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = app