import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import { loginPage } from "@pages/loginPage"
import { shopPage } from "@pages/shopPage"


Given ('A user is at the Browser Stack Shopping page', () => {
    cy.visit('/signin')
    loginPage.userInputsValidEmailAndPassword()
})

//Scenario: A user finds a product and adds it to cart
When ('The user sorts and selects prefered product and adds to cart', () => {
    shopPage.userSortsSelectsCartsProducts()
})
Then ('The user should see product in the cart', () => {
    shopPage.verifyProductInCart()
})

//Scenario: A user checks out products from the cart
When ('The user sorts and selects prefered product and adds to cart2', () => {
    shopPage.userSortsSelectsCartsProducts()
})
When ('The user clicks the checkout button in the cart', () => {
    shopPage.userClicksCheckoutBtn()
})
Then ('The user should land on the checkout page', () => {
    shopPage.verifyCheckoutPageLanding()
})

//Scenario: A user completes product order or purchase
When ('The user sorts and selects prefered product and adds to cart3', () => {
    shopPage.userSortsSelectsCartsProducts()
})
When ('The user clicks the checkout button in the cart2', () => {
    shopPage.userClicksCheckoutBtn()
})
When ('The user fills in the shipping address and submits', () => {
    shopPage.userFillShipDetails()
})
Then ('The user should have successfully placed the order', () => {
    shopPage.verifySuccessfulOrderPlacement()
})
