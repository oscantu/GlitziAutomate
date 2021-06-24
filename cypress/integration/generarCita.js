describe('Se realiza la ejecución para generar una nueva cita', function(){
    before(() => {
        cy.visit('https://li41-183.members.linode.com/')
    })
    it('Realizar login',function(){
        cy.get('#log-in-link').click();
        cy.get('.title').should('contain','Acceder');
        cy.get('#email').type('mail17764@irondev.com.mx');
        cy.get('#password').type('123456');
        cy.get('.login > .btn-primary').click();
        cy.get('.title').should('contain','Perfil de usuario');
    })

    it('Buscar y seleccionar masaje',function(){
        cy.get(':nth-child(1) > .dropdown-toggle').click();
        cy.get('[href="https://li41-183.members.linode.com/servicios/spa/masajes"]').click();
        cy.get('#service-84 > .service > .card-body > .title').should('contain','Masaje Ayurveda');
        cy.get('#service-84 > .service > .card-footer > .btn').click();
        cy.get('.col-md-8 > .title').should('contain','Masaje Ayurveda');
    })

    it('Agregar servicio a carrito',function(){
        cy.get('#add-service').click();
        cy.get('.badge').should('contain','1');
        cy.get('a').should('have.attr', 'href').and('include','click to go to bag').then((href) => {
            cy.visit(href)
        })
    })
    
})