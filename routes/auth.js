const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation') 

router.post('/register', async (req, res) => {

    //validating the data received before creating a new user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create  a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id}); //returning only the user id
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;