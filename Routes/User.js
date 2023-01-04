const router = require("express").Router();
const User = require("../Modal/User");
const bcrypt = require("bcrypt");

// Start update
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const saltRounds = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(
                req.body.password,
                saltRounds
            );
        }
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updateUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can't update this account");
    }
});
// End update

// Start User Delete
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Delete this user");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found");
        }
    } else {
        res.status(401).json("You can't Delete this User");
    }
});
// End User Delete

module.exports = router;
