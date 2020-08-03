context('Catodo', () => {

    it('Title', () => {
        cy.visit(Cypress.config().baseUrl)
        cy.get('.catodo__title').contains('catodo')
        cy.get('.catodo__sub').contains('A mouseless todo list')
    })

    it('Instructions', () => {
        cy.get('.catodo').type('{ctrl}I', {release: false})
        cy.get('.cins').should('be.visible')
        cy.get('.cins').find('.cins__item').its('length').should('be.gt', 0)
        cy.get('.catodo').type('{Esc}')
        cy.get('.cins').should('not.be.visible')
    })  

    it('New task', () => {
        cy.get('.catodo').type('{ctrl}N', {release: false})
        cy.get('.newt').should('be.visible')
        cy.get('.catodo').type('{Esc}')
        cy.get('.newt').should('not.be.visible')
        cy.get('.catodo').type('{ctrl}N', {release: false})
        let taskText = 'Put the bin out'
        cy.get('.newt').should('be.visible').type(`${taskText}{Enter}`)
        cy.get('.task').find('.task__id').should('not.have.text', '')
        cy.get('.task').find('.task__text').should('have.text', taskText)

        taskText = 'Learn AWS'
        cy.get('.catodo').type('{ctrl}N', {release: false})
        cy.get('.newt').should('be.visible').type(`${taskText}{Enter}`)
    })
    
    /*
    it('Mark as done', () => {
        cy.get('.catodo').type('{ctrl}S', {release: false})
        cy.get('.dtask').should('be.visible')
        let taskId = cy.get('.task').find('.task__id').invoke('text').then((text => {
            let taskId = text.trim().replace('id: ', '')
            cy.get('.dtask:visible').find('.dtask__input:visible').type(`${taskId}{enter}`).trigger('input')
            cy.wait(1000)
            cy.get('.task').first().should('have.class', 'task--done')
        }))
    })
    */

    it('Delete all tasks', () => {
        cy.get('.catodo').type('{ctrl}0', {release: false})
        cy.get('.task').should('not.exist')
    })
})
