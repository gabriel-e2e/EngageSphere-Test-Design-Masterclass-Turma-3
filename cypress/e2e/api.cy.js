describe('Customers API', () => {
  const API_URL = 'http://localhost:3001'

  it('returns a list of customers with default pagination', () => {
    cy.request(`${API_URL}/customers`).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.have.property('customers')
      expect(body.customers).to.have.length(10)
      expect(body).to.have.property('pageInfo')
      expect(body.pageInfo.currentPage).to.eq(1)
    })
  })

  it('handles custom pagination', () => {
    cy.request(`${API_URL}/customers?page=2&limit=5`).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.customers).to.have.length(5)
      expect(body.pageInfo.currentPage).to.eq('2')
    })
  })

  it('filters customers by size', () => {
    cy.request(`${API_URL}/customers?size=Small`).then(({ status, body }) => {
      expect(status).to.eq(200)
      body.customers.forEach((customer) => {
        expect(customer.size).to.eq('Small')
      })
    })
  })

  it('filters customers by industry', () => {
    cy.request(`${API_URL}/customers?industry=Technology`).then(({ status, body }) => {
      expect(status).to.eq(200)
      body.customers.forEach((customer) => {
        expect(customer.industry).to.eq('Technology')
      })
    })
  })

  it('handles invalid page parameter', () => {
    cy.request({
      url: `${API_URL}/customers?page=invalid`,
      failOnStatusCode: false
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
    })
  })

  it('handles invalid size parameter', () => {
    cy.request({
      url: `${API_URL}/customers?size=Invalid`,
      failOnStatusCode: false
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      expect(body.error).to.eq('Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.')
    })
  })

  it('handles invalid industry parameter', () => {
    cy.request({
      url: `${API_URL}/customers?industry=Invalid`,
      failOnStatusCode: false
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      expect(body.error).to.eq('Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.')
    })
  })

  it('returns correct customer data structure', () => {
    cy.request(`${API_URL}/customers`).then(({ status, body }) => {
      expect(status).to.eq(200)
      const customer = body.customers[0]
      expect(customer).to.have.all.keys('id', 'name', 'employees', 'industry', 'contactInfo', 'address', 'size')
      if (customer.contactInfo) {
        expect(customer.contactInfo).to.have.all.keys('name', 'email')
      }
      if (customer.address) {
        expect(customer.address).to.have.all.keys('street', 'city', 'state', 'zipCode', 'country')
      }
    })
  })
})
