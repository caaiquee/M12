/// <reference types="cypress"/>
const perfil = require('../fixtures/perfil.json')
const dados = require('../fixtures/dados.json')
import CheckoutPage from '../support/page_objects/nome-funcionliada.page';


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('')
        cy.get('.icon-user-unfollow').click()
        cy.login(perfil.usuario, perfil.senha)
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO 
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]').eq(0).click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type(4)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 4)
        cy.get('.dropdown-toggle > .mini-cart-items').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
        CheckoutPage.preencherCheckoutPage(dados.nome, dados.sobrenome, dados.empresa, dados.pais, dados.endereco, dados.numero, dados.cidade, dados.estado, dados.cep, dados.telefone, dados.email)
        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Seu pedido foi recebido')
    });


})