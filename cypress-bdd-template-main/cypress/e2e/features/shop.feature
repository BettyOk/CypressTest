Feature: Shopping Page Functionalities

This test aims to confirm that the Shopping Page functionalities are working as expected

Background: users need to be present in the Shopping page to interact with the functionalities

Given A user is at the Browser Stack Shopping page

Scenario: A user finds a product and adds it to cart
    When The user sorts and selects prefered product and adds to cart
    Then The user should see product in the cart

Scenario: A user checks out products from the cart
    When The user sorts and selects prefered product and adds to cart2
    When The user clicks the checkout button in the cart
    Then The user should land on the checkout page

Scenario: A user completes product order or purchase
    When The user sorts and selects prefered product and adds to cart3
    When The user clicks the checkout button in the cart2
    When The user fills in the shipping address and submits
    Then The user should have successfully placed the order





