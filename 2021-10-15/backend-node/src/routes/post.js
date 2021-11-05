const router = require("express").Router();
const postController = require("../controllers/post");

router.post("/userposts", postController.getSpecificUserPosts)
router.get("/", postController.getPosts)
router.post("/create", postController.createPost)
router.put("/update/:id", postController.updatePost)
router.delete("/delete/:id", postController.deletePost)

module.exports = router