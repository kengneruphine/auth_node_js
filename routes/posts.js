const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.send(req.user);
    // res.json({
    //     posts: {
    //         title: "My first post",
    //         description: "random data you should not access"
    //     }
    // })
})

module.exports = router;