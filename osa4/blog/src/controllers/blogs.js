const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const formatBlog = (blog) => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    }
  }

  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    response.json((blogs.map(formatBlog)))

  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body
    try {
      console.log('1')
      const token = getTokenFrom(request)
      console.log('2')
      console.log(token)
      const decodedToken = jwt.verify(token, process.env.SECRET)
      console.log('3')
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }   
      if (body.title === undefined) {
        return response.status(400).json({ error: 'title missing' })
      }
      if (body.url === undefined) {
        return response.status(400).json({ error: 'url missing' })
      }
      const user = await User.findById(decodedToken.id)
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id 
      })
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(Blog.format(blog))
    } catch (exception) {
      console.log('awa')
        if (exception.name === 'JsonWebTokenError') {
           response.status(401).json({ error: exception.message })          
      } else {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
  }
})
  blogsRouter.delete('/:id', async (request, response) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'malformatted id' })
    }
  })
  blogsRouter.put('/:id', (request, response) => {
    const body = request.body 
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes:  body.likes,
    }
      Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(formatBlog(updatedBlog))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })

  module.exports = blogsRouter