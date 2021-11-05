const Post = require("../models/Post")

exports.getSpecificUserPosts = async (req, res) => {
  const { email } = req.body;
  const posts = await Post.find({email: email})

  res.status(200).send(posts)
}

exports.getPosts = async (req, res) => {
  const posts = await Post.find({})
  
  res.status(200).send(posts)
}

exports.createPost = async (req, res) => {
  const { firstName, lastName, title, email, id } = req.body

  const newPost = {
    firstName,
    lastName,
    title,
    email,
    id
  }

  const createdPost = new Post(newPost)

  const savedPost = await createdPost.save()

  res.status(404).send("404 Error!")
  res.status(200).send(`Post saved! ${savedPost.id}`)
}

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const post = await Post.findOne({id: id})
  post.title = title;

  const updatedPost = post.save()

  res.status(404).send("404 Error!")
  res.status(200).send("Post updated!")
}

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findOneAndDelete({ id: id })

  if (!post) res.status(404).send("No post with that id found!")

  res.status(200).send(`Successfully deleted the following post: \n ${post}`)
}