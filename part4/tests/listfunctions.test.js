const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const multipleList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Michael Chan',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]

test('dummy returns one', () => {
	const result = listHelper.dummy([])

	expect(result).toBe(1)
})


describe('total likes', () => {
	
	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})

	test('When having multiple blogs, the sum of those', () => {
		const result = listHelper.totalLikes(multipleList)
		expect(result).toBe(24)
	})

  test('With empty list total likes are zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(null)
  })

  test('Undefined list returns null', () => {
    expect(listHelper.totalLikes()).toBe(null)
  })

})


describe('Fav blog', () => {

  test('Undefined list returns null', () => {
    expect(listHelper.favoriteBlog()).toBe(null)
  })

  test('With empty list should be null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({title: listWithOneBlog[0].title, author: listWithOneBlog[0].author, likes: listWithOneBlog[0].likes})
  })

  test('When having multiple blogs', () => {
    const result = listHelper.favoriteBlog(multipleList)
    expect(result).toEqual({
                    title: 'Canonical string reduction',
                    author: 'Michael Chan',
                    likes: 12
                  })
  })

})

describe('Author with most blogs', () => {

  test('Undefined list returns null', () => {
    expect(listHelper.authorWithMostBlogs()).toBe(null)
  })

  test('With empty list should be null', () => {
    const result = listHelper.authorWithMostBlogs([])
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals that author', () => {
    const result = listHelper.authorWithMostBlogs(listWithOneBlog)
    expect(result).toEqual({author: listWithOneBlog[0].author, blogs: 1})
  })

  test('When having multiple blogs', () => {
    const result = listHelper.authorWithMostBlogs(multipleList)
    expect(result).toEqual({
                    author: 'Michael Chan',
                    blogs: 2
                  })
  })
})

describe('Author with largest amount of  likes', () => {

  test('Undefined list returns null', () => {
    expect(listHelper.authorWithLargestLikes()).toBe(null)
  })

  test('With empty list should be null', () => {
    const result = listHelper.authorWithLargestLikes([])
    expect(result).toBe(null)
  })

  test('when list has only one blog, equals that author and those likes', () => {
    const result = listHelper.authorWithLargestLikes(listWithOneBlog)
    expect(result).toEqual({author: listWithOneBlog[0].author, likes: 5})
  })

  test('When having multiple blogs', () => {
    const result = listHelper.authorWithLargestLikes(multipleList)
    expect(result).toEqual({
                    author: 'Michael Chan',
                    likes: 19
                  })
  })
})





