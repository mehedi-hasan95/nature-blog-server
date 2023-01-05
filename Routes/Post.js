const router = require("express").Router();
// const User = require("../Modal/User");
const Post = require("../Modal/Post");

// Start Post Create
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const createPost = await newPost.save();
        res.status(200).json(createPost);
    } catch (err) {
        res.status(500).json(err);
    }
});
// End Post Create

// Start Post Update
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatePost = await Post.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                res.status(200).json(updatePost);
            } catch (error) {
                res.status(401).json(error);
            }
        } else {
            res.status(401).json("You can't update this post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});
// End Post Update

// Start Post Delete
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("This post have been delete");
            } catch (error) {
                res.status(401).json(error);
            }
        } else {
            res.status(401).json("You can't Delete this post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});
// End Post Delete

// Start Get Post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});
// End Get Post

// Start Get All Post
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({ categories: { $in: [catName] } });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});
// End Get All Post

module.exports = router;
