describe('Se realiza la ejecución para generar una nueva cita', function(){
    before(() => {
        cy.visit('https://li41-183.members.linode.com/')
    })
    it('Realizar login',function(){
        cy.get('#log-in-link').click({ force: true });
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

    it('Agregar servicio a carrito y programar cita',function(){
        cy.get('#add-service').click().wait(2000);
        cy.get('.btn').contains('Programa tu cita').click({ force: true });
        cy.get('.name-price > :nth-child(1)').should('contain','Masaje Ayurveda');
    })

    it('Programar cita',function(){
        cy.get('#create-appointment').contains('Programa tu cita').click();
        cy.get("body").then($body => {
            if ($body.find('.title','Acceder').length > 0) {
                cy.get('#email').type('mail17764@irondev.com.mx');
                cy.get('#password').type('123456');
                cy.get('.login > .btn-primary').click().wait(2000);
                cy.log('Se realiza login nuevamente')
            }else{
                cy.log('no se mostro login')
            }
        });
        cy.get("body").then($body => {
            if ($body.find('[class="modal fade modal-profile-coach modal-scroll in modal-top-help show"]').length > 0) {
                cy.get('[class="btn btn-primary"]').contains('ENTENDÍ').click();
                cy.log('se mostro modal de ayuda');
            }else{
                cy.log('no se mostro ayuda');
            }
        });
        cy.get('#pac-input').type('Paseo de la reforma 100').wait(2000);
        cy.get('#pac-input').type('{downarrow}');
        cy.get('#pac-input').type('{enter}').wait(2000);
        cy.get('[name="type_residence_btn"]').contains('Casa').click().wait(1000);
        cy.get('#between_street_form').type('Calle 1 y calle 2');
        cy.get('#extra_information_form').type('Casa en forma de castillo');
        cy.get('#next').click().wait(2000);
        cy.get('.card-title').should('contain','Fecha y hora');
        cy.log('Termina paso 1: captura de direccion');
        cy.get('.icon-arrow-right').click().wait(2000);
        cy.get(':nth-child(1) > .pignose-calendar-unit-sat > a').click().wait(3000 );
        cy.get('#li-night-tab-pane > .nav-link').click().wait(3000);
        cy.get('#time-2 > .col-12 > .btn').click().wait(1000);
        cy.get('#next').click();
    })

    it('Confirmacion de montos de pago',function(){
        cy.get('.row > .d-block').should('contain','$1,190.00').log('Monto en pantalla de servicio');
        cy.get('#next').click().wait(2000);
        cy.get('#resume-total').should('contain','$1,190.00').log('Monto en pantalla revision de datos y pago');
        cy.get('#next').click().wait(2000);
        cy.get('#resume-total-payment').should('contain','$1,190.00').log('Monto en pantalla metodo de pago');
    })

    it('Eliminar servicio de carrito',function(){
        cy.visit('https://li41-183.members.linode.com/tu-bolsa');
        cy.get("body").then($body => {
            if ($body.find('.container-empty-bag','Tu bolsa está vacía').length > 0) {
                cy.get('#log-in-link').click().wait(2000);
                cy.get('#email').type('mail17764@irondev.com.mx');
                cy.get('#password').type('123456');
                cy.get('.login > .btn-primary').click().wait(2000);
                cy.log('Se realiza login nuevamente')
            }else{
                cy.log('no se mostro login')
            }   
        })
        cy.get(':nth-child(5) > .nav-link').click().wait(2000);
        cy.get('.col-md-6 > .title').should('contain','Tu bolsa');
        cy.get('.delete-service > .btn').click().log('Se elimina elemento de carrito');
        cy.get(':nth-child(5) > .nav-link').click().wait(2000);
        cy.get('.container-empty-bag > span').should('contain','Tu bolsa está vacía');
    })
})