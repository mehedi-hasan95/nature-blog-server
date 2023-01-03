const router = require("express").Router();
const User = require("../Modal/User");
const bcrypt = require("bcrypt");

// Start Register

router.post("/register", async (req, res) => {
    try {
        const saltRounds = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// End Register

// Start Login
router.post("/login", async (req, res) => {
    try {
        const loginUser = await User.findOne({ username: req.body.username });
        if (!loginUser) {
            res.status(400).json("Wrong Username");
            return;
        }

        const loginPass = await bcrypt.compare(
            req.body.password,
            loginUser.password
        );
        if (!loginPass) {
            res.status(400).json("Wrong Password");
            return;
        }

        if (!loginUser && !loginPass) {
            res.status(400).json("Username is wrong");
            return;
        }

        const { password, ...others } = loginUser._doc;

        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});
// End Login

module.exports = router;
