describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'jacky',
      password: 'pass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown by default', function() {
    cy.contains('login')

    cy.get('#loginUsername')
    cy.get('#loginPwd')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#loginUsername').type('jacky')
      cy.get('#loginPwd').type('pass')
      cy.get('#loginFormButton').click()

      cy.contains('Login successfull')
      cy.contains('blogs')
      cy.contains('Add new blog')
      cy.contains('Logout')
    })

    it('fails with wrong credentials', function() {
      cy.get('#loginUsername').type('jacky')
      cy.get('#loginPwd').type('wrong')
      cy.get('#loginFormButton').click()

      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // LOG USER IN
      cy.get('#loginUsername').type('jacky')
      cy.get('#loginPwd').type('pass')
      cy.get('#loginFormButton').click()
    })

    it('A blog can be created', function() {
      cy.contains('Add new blog').click()

      cy.get('#addBlogTitle').type('a blog created by cypress')
      cy.get('#addBlogAuthor').type('cypress')
      cy.get('#addBlogUrl').type('cypressurl.com')
      cy.contains('create').click()

      cy.contains('a blog created by cypress')
    })

    it('A blog can be liked', function() {
      cy.contains('Add new blog').click()

      cy.get('#addBlogTitle').type('a blog created by cypress')
      cy.get('#addBlogAuthor').type('cypress')
      cy.get('#addBlogUrl').type('cypressurl.com')
      cy.contains('create').click()

      cy.contains('view').click()
      cy.contains('likes 0')
      cy.get('.likeButton').click()
      cy.contains('Blog liked')
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('Add new blog').click()

      cy.get('#addBlogTitle').type('a blog created by cypress')
      cy.get('#addBlogAuthor').type('cypress')
      cy.get('#addBlogUrl').type('cypressurl.com')
      cy.contains('create').click()

      cy.contains('a blog created by cypress')
      cy.contains('view').click()
      cy.contains('cypress')
      cy.contains('cypressurl.com')

      cy.contains('Delete blog').click()
      cy.get('html').should('not.contain', 'a blog created by cypress')
    })
  })
})