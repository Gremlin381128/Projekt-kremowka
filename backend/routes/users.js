const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

//model użytkownika
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/add", (req, res, next) => {
    //sprawdzanie czy użytkownik czasem już nie jest w bazie
    User.findOne({username: req.body.username})
    .exec()
    .then(user => {
        if(user) {
            res.status(409).json({wiadomosc: "Taka nazwa użytkownika już istnieje"})
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({error: err})
                }
                else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: hash
                    })
                    user
                    .save()
                    .then(result => {
                        res.status(201).json({wiadomosc: "Stworzono użytkownika"})
                    })
                    .catch(err => { 
                        res.status(500).json({error: err})
                    })
                }
             })
        }
    })
    .catch(err => { 
        res.status(500).json({error: err})
    })
})
//Logowanie do konta
    router.post("/login", (req, res, next)=> {
    User.findOne({ username: req.body.username})
    .exec()
    .then(user => {
        if(!user) {
            res.status(401)
            .json({
                wiadomosc: 'Błąd autentykacji'
            })
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                    return res.status(401)
                    .json({
                        wiadomosc: 'Błąd autentykacji'
                    })
                }
                if(result) {
                    const token = jwt.sign({
                        username: user.username,
                        userId: user._id
                    },
                    process.env.JWT_PASS,
                    {
                        expiresIn: "1h",
                    }
                    )
                    return res.status(200)
                    .json({token: token})
                } else {
                    return res.status(401)
                    .json({
                        wiadomosc: 'Błąd autentykacji'
                    })
                }
            })
        }
    })
    .catch(err => { 
        res.status(500).json({error: err})
    })
})

//Usunięcie konta
router.delete("/:userId", (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
    .exec()
    .then(result => {
        res.status(200).json({ wiadomosc: "Usunięto użytkownika"})
    })
    .catch(err => { 
        res.status(500).json({error: err})
    })
})

module.exports = router;