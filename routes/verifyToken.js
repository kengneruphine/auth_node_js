const jwt = require('jsonwebtoken');
//middleware function to add it to route which we want to protect
module.exports =function (req, res, next) {
    const token = req.header('auth-token');  //check if it has that token
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified; //adding that to our user
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}