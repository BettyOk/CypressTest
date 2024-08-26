class ShopPage {
//ELEMENTS SEcTION
    pageElements = {
        shopPageTitle: () => cy.contains('BrowserStack'),
        shopCartBtn: () => cy.get('.bag--float-cart-closed'),
        userName: () => cy.get('.username'),
        logOutBtn: () => cy.get('#logout'),

        orderSelect: () => cy.get('select'),
        specificProduct: () => cy.get('div.shelf-item[data-sku="oneplus7device-info.png"] .shelf-item__buy-btn'),
        checkOutBtn: () => cy.get('.buy-btn'),
        firstName: () => cy.get('#firstNameInput'),
        lastName: () => cy.get('#lastNameInput'),
        addressLine: () => cy.get('#addressLine1Input'),
        stateProvince: () => cy.get('#provinceInput'),
        postCode: () => cy.get('#postCodeInput'),
        submitCheckOut: () => cy.get ('#checkout-shipping-continue'),

        cartTitle: () => cy.contains('Bag'),
        cartItem: () => cy.get('.float-cart__shelf-container > .shelf-item'),
        subTotal: () => cy.contains('SUBTOTAL'),
        cartLogo: () => cy.get('.bag'),


        shippingTitle: () => cy.get('[data-test="shipping-address-heading"]').should('be.visible'),
        orderSummary: () => cy.contains('Order Summary'),
        totalAmt: () => cy.contains('Total (USD)'),

        successfulMsg: () => cy.contains('Your Order has been successfully placed.'),
        orderNo: () => cy.contains('Your order number is'),
        downloadReceipt: () => cy.contains('Download order receipt')
    }

//ACTION SECTION
    userSortsSelectsCartsProducts() {
        this.pageElements.orderSelect().should('be.visible')
        this.pageElements.orderSelect().select('Lowest to highest')
        this.pageElements.specificProduct().click()
    }

    userClicksCheckoutBtn() {
        this.pageElements.checkOutBtn().click({ force: true })
    }

    userFillShipDetails() {
        this.pageElements.firstName().type('Beauty')
        this.pageElements.lastName().type('Beast')
        this.pageElements.addressLine().type('No. 2 Disney Street')
        this.pageElements.stateProvince().type('Walt State')
        this.pageElements.postCode().type('54321')
        this.pageElements.submitCheckOut().click()
    }



//VERIFICATION SECTION

//Scenario: A user finds a product and adds it to cart
//Acceptance criteria: confirmation that when a user finds a product and clicks on add to cart, it fuctions as expected
    verifyProductInCart() {
        cy.url().should('contain', '/?signin=true'),
        this.pageElements.cartItem().should('exist')
        this.pageElements.cartTitle().should('be.visible'),
        this.pageElements.subTotal().should('be.visible'),
        this.pageElements.cartLogo().should('be.visible'),
        this.pageElements.checkOutBtn().should('be.visible').click({ force: true })
    }

//Scenario: A user checks out products from the cart
//Acceptance criteria: confirmation that when A user clicks on the checkout button in the cart, the user is taken to to the checkout page
    verifyCheckoutPageLanding() {
        this.pageElements.shippingTitle().should('be.visible'),
        this.pageElements.orderSummary().should('be.visible'),
        this.pageElements.totalAmt().should('be.visible')
    }

//Scenario: A user completes product order or purchase
//Acceptance criteria: confirmation that when user fills in shipping details and clicks submit, a user successfully completes the product ordering or purchase
    verifySuccessfulOrderPlacement() {
        cy.url().should('contain', '/confirmation'),
        this.pageElements.successfulMsg().should('be.visible'),
        this.pageElements.orderNo().should('be.visible'),
        this.pageElements.downloadReceipt().should('be.visible')
    }


//LOGIN FUNcTIONALITY VERIFIcATION
//Scenario: A user logs in with valid credentials
//Acceptance criteria: confirmation that when user logs in with valid credentials, user should be redirected to the landing page
    verifySuccessfulLogin() {
        cy.url().should('contain', '/?signin=true'),
        this.pageElements.shopCartBtn().should('be.visible'),
        this.pageElements.shopPageTitle().should('be.visible'),
        this.pageElements.userName().should('be.visible'),
        this.pageElements.logOutBtn().should('be.visible')
    }

}

export const shopPage =  new ShopPage()