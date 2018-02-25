const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
test('empty list is 0', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })
test('of a biger list is calculated right', () => {
    const blogs = [
        {
            _id: '5a8200895bd1c86a0af1451c',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a8200895bd1c86a0af1451c',
            title: 'Go To Statement Considered Harmful2',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a8200895bd1c86a0af1451c',
            title: 'Go To Statement Considered Harmful3',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 6,
            __v: 0
        },
      ]
    const result = listHelper.totalLikes(blogs)  
    expect(result).toBe(16)
  })
  test('best blog returned', () => {
    const blogs = [
        {
          _id: '5a8200895bd1c86a0af1451c',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a8200895bd1c86a0af1451c',
            title: 'Go To Statement Considered Harmful2',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a8200895bd1c86a0af1451c',
            title: 'Go To Statement Considered Harmful3',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 6,
            __v: 0
        },
      ]
    const result = listHelper.favoriteBlog(blogs)  
    expect(result).toEqual({
        _id: '5a8200895bd1c86a0af1451c',
        title: 'Go To Statement Considered Harmful3',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6,
        __v: 0
    })
  })