const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { format, initialBlogs, nonExistingId, blogsInDb, usersInDb } = require('./test_helper')

beforeAll(async () => {
  await Blog.remove({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  await User.remove({})
  const user = new User({ username: 'root', password: 'sekret' })
  await user.save()
})
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('POST /api/notes succeeds with valid data', async () => {
  const blogsAtStart = await blogsInDb()
  const newBlog = { 
    title: "Ethics",
    author: "Baruch Spinoza",
    url: "foo.bar/foobar",
    likes: 7
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsAfterOperation = await blogsInDb()
  expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
  const titles = blogsAfterOperation.map(r => r.title)
  expect(titles).toContain('Ethics')
})

test('POST /api/notes succeeds with valid data', async () => {
  const blogsAtStart = await blogsInDb()
  const newBlog = { 
    title: "Ethics",
    author: "Baruch Spinoza",
    url: "foo.bar/foobar"
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsAfterOperation = await blogsInDb()
  expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
  const likes = blogsAfterOperation.map(r => r.likes)
  expect(likes).toContain(0)
})

test('POST /api/blogs fails with proper statuscode if title is missing', async () => {
  const newBlog = {
    url: 'url',
    author: 'nimi'
  }
  const blogsAtStart = await blogsInDb()
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  const blogsAfterOperation = await blogsInDb()
  const titles = blogsAfterOperation.map(r => r.titles)
  expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
})

test('POST /api/blogs fails with proper statuscode if url is missing', async () => {
  const newBlog = {
    title: 'otsikko',
    author: 'nimi'
  }
  const blogsAtStart = await blogsInDb()
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  const blogsAfterOperation = await blogsInDb()
  const urls = blogsAfterOperation.map(r => r.urls)
  expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
})

test('POST /api/users succeeds with a fresh username', async () => {
  const usersBeforeOperation = await usersInDb()
  const newUser = {
    username: 'testi1',
    name: 'testikäyttäjä',
    password: 'salasana',
    ofAge: false
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const usersAfterOperation = await usersInDb()
  expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
  const usernames = usersAfterOperation.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
  const usersBeforeOperation = await usersInDb()
  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'salasana'
  }
  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  expect(result.body).toEqual({ error: 'username must be unique' })
  const usersAfterOperation = await usersInDb()
  expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
})

test('POST /api/users fails with proper statuscode and message if password is too short', async () => {
  const usersBeforeOperation = await usersInDb()
  const newUser = {
    username: 'testi2',
    name: 'testikäyttäjä2',
    password: 's'
  }
  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  expect(result.body).toEqual({ error: 'password must be atleast 3 characters long' })
  const usersAfterOperation = await usersInDb()
  expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
})

test('POST /api/users undef ofAge is set to true', async () => {
  const usersBeforeOperation = await usersInDb()
  const newUser = {
    username: 'arto',
    name: 'Matti Luukkainen',
    password: 'salasana'
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const usersAfterOperation = await usersInDb()
  expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
  const ofAges = usersAfterOperation.map(u => u.ofAge)
  expect(ofAges).toContain(true)
})

afterAll(() => {
  server.close()
})