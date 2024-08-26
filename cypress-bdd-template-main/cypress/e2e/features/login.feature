Feature: Login functionality

This test aims to confirm that the login functionality is working as expected.

Background: users need to be present on the browserstack app to login

#The Given syntax is a pre-requisite for the test
#The When syntax is the action that the user takes
#The Then syntax is the expected outcome of the action

Given A user is at the browserstack Login page

Scenario: A user logs in with invalid credentials
        When The user enters invalid email, password and clicks the login button
        Then The user should see an error message

Scenario: A user logs in with valid credentials
        When The user enters valid email, password and clicks the login button
        Then The user should be redirected to the landing page
