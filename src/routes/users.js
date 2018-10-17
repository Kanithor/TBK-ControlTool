const User = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt'); 
const router = express.Router();

router.post('/register', async(req, res,next) => {

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('Usuario ya registrado.');

    
    user = new User({
        //_id: new mongoose.Types.ObjectId(),
        name: req.body.nombre,
        username: req.body.usuario,
        email: req.body.email,
        // phone: req.body.phone,
        cargo: req.body.cargo,
        password: bcrypt.hashSync(req.body.password, 12)
    });
    user
        .save((err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                user: userDB
            })
        })
        
});


module.exports = router; 