describe('EngageSphere E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays the header with correct elements', () => {
    cy.get('h1').should('contain', 'EngageSphere')
    cy.get('[data-testid="name"]').should('be.visible')
    cy.get('button[aria-label^="theme"]').should('be.visible')
  })

  it('allows theme toggle', () => {
    cy.get('body').should('have.attr', 'data-theme', 'light')
    cy.get('button[aria-label^="theme"]').click()
    cy.get('body').should('have.attr', 'data-theme', 'dark')
  })

  it('displays the customer table with correct columns', () => {
    cy.get('table').should('be.visible')
    cy.get('th').should('have.length', 6)
    cy.get('th').eq(0).should('contain', 'ID')
    cy.get('th').eq(1).should('contain', 'Company name')
    cy.get('th').eq(2).should('contain', 'Industry')
    cy.get('th').eq(3).should('contain', 'Number of employees')
    cy.get('th').eq(4).should('contain', 'Size')
    cy.get('th').eq(5).should('contain', 'Action')
  })

  it('allows sorting of customers by number of employees and size', () => {
    cy.get('th').contains('Number of employees').click()
    cy.get('th').contains('Number of employees').should('contain', '↓')
    cy.get('th').contains('Number of employees').click()
    cy.get('th').contains('Number of employees').should('contain', '↑')

    cy.get('th').contains('Size').click()
    cy.get('th').contains('Size').should('contain', '↓')
    cy.get('th').contains('Size').click()
    cy.get('th').contains('Size').should('contain', '↑')
  })

  it('allows filtering customers by size and industry', () => {
    cy.get('[data-testid="size-filter"]').select('Small')
    cy.get('tbody tr').should('have.length.gt', 0)
    cy.get('tbody tr').each($row => {
      cy.wrap($row).find('td').eq(4).should('contain', 'Small')
    })

    cy.get('[data-testid="industry-filter"]').select('Technology')
    cy.get('tbody tr').should('have.length.gt', 0)
    cy.get('tbody tr').each($row => {
      cy.wrap($row).find('td').eq(2).should('contain', 'Technology')
    })
  })

  it('displays customer details when "View" is clicked', () => {
    cy.get('tbody tr').first().find('button').click()
    cy.get('h2').should('contain', 'Customer Details')
    cy.get('button').contains('Back').should('be.visible')
  })

  it('allows pagination of customers', () => {
    cy.get('[data-testid="pagination"]').should('be.visible')
    cy.get('button').contains('Next').click()
    cy.get('span').should('contain', 'Page 2')
    cy.get('button').contains('Prev').click()
    cy.get('span').should('contain', 'Page 1')
  })

  it('allows changing the number of customers per page', () => {
    cy.get('[data-testid="pagination"] select').select('5')
    cy.get('tbody tr').should('have.length', 5)
    cy.get('[data-testid="pagination"] select').select('20')
    cy.get('tbody tr').should('have.length', 20)
  })

  it('displays the messenger when clicked and allows sending a message', () => {
    cy.get('button[aria-label="Open messenger"]').click()
    cy.get('h2').should('contain', 'How can we help you?')
    cy.get('#messenger-name').type('John Doe')
    cy.get('#email').type('john@example.com')
    cy.get('#message').type('This is a test message')
    cy.get('button').contains('Send').click()
    cy.get('.success').should('contain', 'Your message has been sent.')
  })

  it('allows downloading CSV of customers', () => {
    cy.get('button').contains('Download CSV').should('be.visible')
    // Note: Actually testing the download might require additional setup
  })

  it('displays the footer with correct links', () => {
    cy.get('[data-testid="footer"]').should('be.visible')
    cy.get('[data-testid="footer"] a').should('have.length', 4)
    cy.get('[data-testid="footer"] a').eq(0).should('have.attr', 'href', 'https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem')
    cy.get('[data-testid="footer"] a').eq(1).should('have.attr', 'href', 'https://udemy.com/user/walmyr')
    cy.get('[data-testid="footer"] a').eq(2).should('have.attr', 'href', 'https://talkingabouttesting.com')
    cy.get('[data-testid="footer"] a').eq(3).should('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
  })

  it('displays a greeting message with the current date', () => {
    const today = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const dateString = today.toLocaleDateString("en-US", options)
    cy.get('h2').should('contain', dateString)
  })

  it('allows entering a name and updates the greeting', () => {
    cy.get('[data-testid="name"]').type('Alice')
    cy.get('h2').should('contain', 'Hi Alice!')
  })

  it('displays an empty state when no customers are available', () => {
    // This test assumes you have a way to clear customers or set an empty state
    // You might need to intercept the API call and return an empty array
    cy.intercept('GET', '/customers*', { customers: [], pageInfo: { currentPage: 1, totalPages: 1 } })
    cy.reload()
    cy.get('.featherInbox').should('be.visible')
    cy.contains('No customers available.').should('be.visible')
  })

  it('handles cookie consent', () => {
    // This test assumes the cookie consent banner is shown by default
    cy.get('.banner').should('be.visible')
    cy.contains('Accept').click()
    cy.get('.banner').should('not.exist')
  })
})
