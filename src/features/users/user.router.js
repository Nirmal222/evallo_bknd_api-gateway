const express = require('express');
const User = require('./user.schema.js');
const jwt = require('jsonwebtoken');
const app = express.Router();

app.post('/signup', async (req, res) => {
    let { email } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(404).send('Cannot create a user with existing email address.')
        }
        let newUser = await User.create(req.body);
        
        return res.send({
            token: `${newUser.id}:${newUser.email}:${newUser.password}`,
            message: "success"
        })
    }
    catch (e) {
        res.status(401).send(e.message)
    }
})

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).send('Authentication failed')
        }

        const token = jwt.sign({ email: email, password: password }, "JWT_SECRET")

        return res.send({
            token: token
        })
    }
    catch (e) {
        res.status(401).send('Incorrect credentials')
    }
})

module.exports = app;
